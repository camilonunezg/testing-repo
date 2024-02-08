import { Paginated } from "@/core/domain/types";
import { Course } from "@/courses/domain/Course";
import { CourseId } from "@/courses/domain/CourseId";
import { CourseImageUrl } from "@/courses/domain/CourseImageUrl";
import { CourseTitle } from "@/courses/domain/CourseTitle";

export interface CourseDTO {
  id: string | null;
  title: string;
  image_url: string;
}

export interface PaginatedCoursesDTO {
  total_pages: number;
  current_page: number;
  results: CourseDTO[];
}

export class CourseAdapter {

  static DomainFromDTO(courseDTO: CourseDTO): Course {
    return new Course(
      courseDTO.id ? new CourseId(courseDTO.id) : null,
      new CourseTitle(courseDTO.title),
      new CourseImageUrl(courseDTO.image_url)
    )
  }

  static DTOFromDomain(course: Course): CourseDTO {
    return {
      id: course.id?.value ?? null,
      title:  course.title.value,
      image_url: course.imageUrl.value
    }
  }

  static PaginatedDomainFromDTO(paginatedDTO: PaginatedCoursesDTO): Paginated<Course> {
    return {
      totalPages: paginatedDTO.total_pages,
      currentPage: paginatedDTO.total_pages,
      results: paginatedDTO.results.map(courseDTO => CourseAdapter.DomainFromDTO(courseDTO))
    }
  }
}
