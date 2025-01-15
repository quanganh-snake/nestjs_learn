export type TQueryFindAll = {
  q?: string;
  _sort?: string;
  _order?: "ASC" | "DESC";
  _page?: number;
  _limit?: number;
}