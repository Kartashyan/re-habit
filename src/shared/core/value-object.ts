export class ValueObject<T> {
    protected readonly props: T;

    constructor(props: T) {
        this.props = props;
    }

    public equals(vo?: ValueObject<T>): boolean {
        if (vo === null || vo === undefined) {
            return false;
        }
        if (vo.props === null || vo.props === undefined) {
            return false;
        }
        return JSON.stringify(this.props) === JSON.stringify(vo.props);
    }

    getProps(): T {
        return Object.freeze(this.props);
    }
}
