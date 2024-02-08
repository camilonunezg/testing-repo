export class CourseTitle {

    static MIN_LENGTH = 5;
    static MAX_LENGTH = 100;
    
    constructor(readonly value: string) {
        this.validator(value)
    }

    static isCourseTitleValid(title: string): boolean {
        return title.length >= CourseTitle.MIN_LENGTH && title.length <= CourseTitle.MAX_LENGTH;
    }

    private validator(value: string) {
        if (!CourseTitle.isCourseTitleValid(value)) throw new CourseTitleNotValidError(value)
    }

}

export class CourseTitleNotValidError extends Error {
    constructor(value: string) {
        super(`CourseTitle ${value} is not valid`)
    }
}
