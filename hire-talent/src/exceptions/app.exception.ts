
export class UserAlreadyExistException extends Error {
    constructor(message: string) {
        super(message)

        this.name = this.constructor.name;

        Error.captureStackTrace(this, this.constructor);
    }
}

export class ObjectDoNotExist extends Error {
    constructor(message: string) {
        super(message)

        this.name = this.constructor.name;

        Error.captureStackTrace(this, this.constructor);
    }
}

export class InvalidType extends Error {
    constructor(message: string) {
        super(message)

        this.name = this.constructor.name;

        Error.captureStackTrace(this, this.constructor);
    }
}