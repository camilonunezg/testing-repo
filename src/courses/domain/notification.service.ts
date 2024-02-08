import { Course } from './Course';

export interface notificationService {
    sendNotification: (course: Course) => Promise<void>;
}
