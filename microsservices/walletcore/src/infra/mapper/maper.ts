export interface Mapper<T> {
    toDomain(target: any): T; 
    toEntityOrm(target: T): any; 
    toPersister(target: T): any;
}