import { Course } from "@/courses/domain/Course";
import { CourseTitle } from "@/courses/domain/CourseTitle";
import { ICoursesRepository } from "@/courses/domain/course.repository";
import { notificationService } from "@/courses/domain/notification.service";
import { Primitives } from '@/core/domain/Primitives'
import { CourseImageUrl } from "./CourseImageUrl";

export class CreateCourse {
    constructor(
        private readonly courseRepository: ICoursesRepository,
        private readonly notificationService: notificationService
    ) {}

    execute(coursePrimitives: Primitives<Course>) {
        const courseTitle = new CourseTitle(coursePrimitives.title)
        const couseImageUrl = new CourseImageUrl(coursePrimitives.imageUrl)
        const course = new Course(null, courseTitle, couseImageUrl)
        this.courseRepository.save(course)
        if (course instanceof Course) this.notificationService.sendNotification(course)
    }
}
