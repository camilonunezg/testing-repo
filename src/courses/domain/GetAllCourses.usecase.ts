import { CourseFilterCriteria } from "./Course";
import { ICoursesRepository } from "./course.repository";

export class GetAllCourses {
  constructor(
    private readonly courseRepository: ICoursesRepository
  ) {}

  async execute(filter: CourseFilterCriteria) {
    return await this.courseRepository.getAll(filter)
  }
}
