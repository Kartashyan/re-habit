import { Either, left, right } from './either';

export class Result {
    
    public static ok<U>(value: U): Either<null, U> {
        return right(value);
    }

    public static fail<U>(error: U): Either<U, null> {
        return left(error);
    }

    public static combine(results: Either<any, any>[]): Either<any, null> {
        for (let result of results) {
            if (result.isLeft()) {
                return result;
            }
        }
        return Result.ok(null);
    }
}
