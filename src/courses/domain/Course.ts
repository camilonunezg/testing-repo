import { LimitOptions } from "@/core/domain/types";
import { CourseId } from "./CourseId";
import { CourseImageUrl } from "./CourseImageUrl";
import { CourseTitle } from "./CourseTitle";

export class Course {
	constructor(
		readonly id: CourseId | null,
		readonly title: CourseTitle,
		readonly imageUrl: CourseImageUrl,
	) {}
}

export interface CourseFilterCriteria {
  search?: string;
  limit: LimitOptions;
  page: number;
}
