export class Result<T = void, D = string> {
    constructor(
        public readonly isSuccess: boolean,
        public readonly data?: T | null,
        public readonly error?: D | null,
    ) {}

    public static ok<U>(value?: U): Result<U> {
        return new Result<U>(true, value);
    }

    public static fail<U>(error: string): Result<U> {
        return new Result<U>(false, null, error);
    }
}