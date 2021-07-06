export interface Response<T>{
    results: T[];
    count: number;
    next: string;
    previous: string;
}