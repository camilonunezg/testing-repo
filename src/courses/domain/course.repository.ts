import { Course, CourseFilterCriteria } from './Course';
import { Paginated } from '@/core/domain/types';

export interface ICoursesRepository {
    save(course: Course): Promise<Course | Error>;
    getAll(filter: CourseFilterCriteria): Promise<Paginated<Course> | Error>;
}
