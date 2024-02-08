import { Course } from "@/courses/domain/Course";

export class CourseFilter {
  private list: Course[]

  constructor(list: Course[]) {
      this.list = list
  }

  searchByTitle(value: string) {
    this.list = this.list.filter(course =>
      course.title.value.toLocaleLowerCase().includes(value.toLocaleLowerCase())
    )
  }

  getResult() {
    return this.list
  }
}
