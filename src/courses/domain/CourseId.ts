export class CourseId {
    
    constructor(readonly value: string) {
        CourseId.isCourseIdValid(value)
    }

    static isCourseIdValid(id: string): boolean {
        const regexExp =
            /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi; //TODO: this should be placed in core
    
        return regexExp.test(id);
    }

}

export class CourseIdNotValidError extends Error {
    constructor(value: string) {
        super(`CourseId ${value} is not valid`)
    }
}
