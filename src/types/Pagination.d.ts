declare module "@alerta-ciudadana/entity" {
  interface Pagination {
    perPage: number;
    take: number;
    skip: number;
    total: number;
  }
  interface PaginatioContext<T> {}
}
