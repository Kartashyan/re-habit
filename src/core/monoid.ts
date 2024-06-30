export interface Monoid<T> {
    combine: (a: T, b: T) => T;
    identity: T;
}