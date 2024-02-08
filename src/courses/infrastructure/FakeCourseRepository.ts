import { faker } from '@faker-js/faker';
import { Paginated } from "@/core/domain/types";
import { Course, CourseFilterCriteria } from "../domain/Course";
import { ICoursesRepository } from "../domain/course.repository";
import { CourseAdapter, CourseDTO, PaginatedCoursesDTO } from "./adapters/Course.adapter";
import { CourseFilter } from './__mocks__/CouseFilter';
import { delayPromise } from '@/core/infrastructure/utils';

const createRandomCourse = (): CourseDTO => ({
  id: faker.string.uuid(),
  title: faker.lorem.words(3),
  image_url: faker.internet.url(),
})

const paginatedCoursesDTO: PaginatedCoursesDTO = {
  current_page: 1,
  total_pages: 5,
  results: faker.helpers.multiple(createRandomCourse, {count: 50}),
}

export class FakeCourseRepository implements ICoursesRepository {
  async save(course: Course): Promise<Course | Error> {
    return Promise.resolve(course)
  }

  async getAll(filter: CourseFilterCriteria): Promise<Paginated<Course> | Error> {
    const paginatedCourses = CourseAdapter.PaginatedDomainFromDTO(paginatedCoursesDTO)
    const courseFilter = new CourseFilter(paginatedCourses.results)

    if (filter.search) courseFilter.searchByTitle(filter.search)
    let filteredCourses = courseFilter.getResult()

    const totalPages = Math.ceil(filteredCourses.length / filter.limit);
    const start = (filter.page - 1) * filter.limit;
    const end = start + filter.limit;
    filteredCourses = filteredCourses.slice(start, end);
    
    return delayPromise({
      totalPages,
      currentPage: filter.page,
      results: filteredCourses
    })
  }
}
