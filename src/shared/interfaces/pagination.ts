export interface PaginationResponse<TData> {
  totalPages: number;
  totalItems: number;
  currentPage: number;
  data: TData[];
}
