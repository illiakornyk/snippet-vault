export interface PaginatedResult<T> {
  readonly data: T[];
  readonly meta: {
    readonly total: number;
    readonly page: number;
    readonly limit: number;
    readonly totalPages: number;
    readonly hasNextPage: boolean;
    readonly hasPreviousPage: boolean;
  };
}
