import { GetAllCourses } from "@/courses/domain/GetAllCourses.usecase";
import { FakeCourseRepository } from "@/courses/infrastructure/FakeCourseRepository";

const getAllCoursesUseCase = new GetAllCourses(new FakeCourseRepository());

export { getAllCoursesUseCase };
