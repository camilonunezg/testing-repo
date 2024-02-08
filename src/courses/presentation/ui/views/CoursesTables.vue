<script setup lang="ts">
import { computed } from "vue";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Pagination,
  PaginationEllipsis,
  PaginationFirst,
  PaginationLast,
  PaginationList,
  PaginationListItem,
  PaginationNext,
  PaginationPrev,
} from '@/components/ui/pagination'
import {
  Button,
} from '@/components/ui/button'
import { AlertCircle } from 'lucide-vue-next'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { useGetAllCoursesPaginated } from "../../state/composables"
import { useTableActions } from "../../state/composables/useTableActions"
import { Course, CourseFilterCriteria } from "@/courses/domain/Course"
import {  Paginated, isPaginated } from '@/core/domain/types';

const headerItems = [
  {key: 'id', label: 'Course ID'},
  {key: 'title', label: 'Title'},
  {key: 'imageUrl', label: 'Image url'}
]

const { tableFilterCriteria, changePage } = useTableActions();
const courseFilter = computed<CourseFilterCriteria>(() => ({
  search: tableFilterCriteria.search,
  page: tableFilterCriteria.page,
  limit: tableFilterCriteria.limit,
}))

const { areLoadingCourses, areCoursesErrors, isFetchingCourses, courses } = useGetAllCoursesPaginated(courseFilter)
const areCoursesPaginatedResults = computed(() => courses.value && isPaginated(courses.value))
const totalPages = computed(() => (courses.value as Paginated<Course>).totalPages)
const totalItemsAmount = computed(() => totalPages.value * courseFilter.value.limit)
</script>

<template>

  <div v-if="areCoursesPaginatedResults" class="w-full flex justify-end my-3">
    <Pagination
      v-slot="{ page }"
      :total="totalItemsAmount"
      :items-per-page="courseFilter.limit"
      :sibling-count="2"
      show-edges
      :default-page="1"
    >
      <PaginationList v-slot="{ items }" class="flex items-center gap-1">
        <PaginationFirst @click="changePage(1)" />
        <PaginationPrev @click="changePage(courseFilter.page - 1)" />
        <template v-for="(item, index) in items">
          <PaginationListItem v-if="item.type === 'page'" :key="index" :value="item.value" as-child>
            <Button
              class="w-10 h-10 p-0"
              :variant="item.value === page ? 'default' : 'outline'"
              @click="changePage(item.value)"
            >
              {{ item.value }}
            </Button>
          </PaginationListItem>
          <PaginationEllipsis v-else :key="item.type" :index="index" />
        </template>
        <PaginationNext @click="changePage(courseFilter.page + 1)" />
        <PaginationLast @click="changePage(totalPages)" />
      </PaginationList>
    </Pagination>
  </div>

  <p v-if="areLoadingCourses || isFetchingCourses">Loading...</p>
  <Table v-else-if="areCoursesPaginatedResults">
    <TableCaption>A list of your recent courses.</TableCaption>
    <TableHeader>
      <TableRow>
        <TableHead
          v-for="header in headerItems"
          :key="header.key"
          :class="{ 'text-center': ['id'].includes(header.key) }"
        >
          {{ header.label }}
        </TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow v-for="course in (courses as Paginated<Course>).results">
        <TableCell class="text-center">
          {{ course.id?.value }}
        </TableCell>
        <TableCell class="font-medium">
          {{ course.title.value }}
        </TableCell>
        <TableCell>
          {{ course.imageUrl.value }}
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>

  <Alert v-else-if="areCoursesErrors" class="my-4" variant="destructive">
    <AlertCircle class="w-4 h-4" />
    <AlertTitle>{{ (courses as Error).message }}</AlertTitle>
    <AlertDescription>
      An error occurred when retrieving courses.
    </AlertDescription>
  </Alert>

</template>
