export interface CustomError {
  status: number;
  data: { detail: { msg: string } | { msg: string }[] };
  error: string;
}
