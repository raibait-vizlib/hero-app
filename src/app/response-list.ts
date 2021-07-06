export interface ResponseList<T>{
    results: T[];
    count: number;
    next: string;
    previous: string;
}