import type { ComputedRef } from 'vue'
import { useQuery, keepPreviousData } from '@tanstack/vue-query'
import { CourseFilterCriteria } from '@/courses/domain/Course'
import { getAllCoursesUseCase } from '../../injections'

export const useGetAllCoursesPaginated = (filters: ComputedRef<CourseFilterCriteria>) => {
  const query = useQuery({
    queryKey: ['courses', 'all', filters],
    queryFn: async () => await getAllCoursesUseCase.execute(filters.value),
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
  })

  return {
    areLoadingCourses: query.isLoading,
    isFetchingCourses: query.isFetching,
    areCoursesErrors: query.isError,
    courses: query.data
  }
}
