interface ValueObjectProps {
    [index: string]: any;
}

export class ValueObject<T extends ValueObjectProps> {
    public readonly value: T;

    constructor(value: T) {
        this.value = {...value};
    }

    public equals(vo?: ValueObject<T>): boolean {
        if (vo === null || vo === undefined) {
            return false;
        }
        if (vo.value === null || vo.value === undefined) {
            return false;
        }
        return JSON.stringify(this.value) === JSON.stringify(vo.value);
    }
}
