export class Result<T = void, D = string> {
    constructor(
        public readonly isSuccess: boolean,
        public readonly data?: T | null,
        public readonly error?: D | null,
    ) {}

    public static ok<U>(value?: U): Result<U> {
        if (typeof value === 'undefined') {
            return new Result<U>(true, null, null);
        }
        return new Result<U>(true, value, null);
    }

    public static fail<U>(error?: string): Result<U> {
        if (typeof error === 'undefined') {
            return new Result<U>(false, null, null);
        }
        return new Result<U>(false, null, error);
    }
}