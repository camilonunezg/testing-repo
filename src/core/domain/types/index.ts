export interface Paginated<T> {
  totalPages: number;
  currentPage: number;
  results: T[];
}

export const isPaginated = <T>(obj: any): obj is Paginated<T> => {
  return (
    obj &&
    typeof obj === 'object' &&
    'totalPages' in obj &&
    'currentPage' in obj &&
    'results' in obj
  );
}

export type LimitOptions = 10 | 25 | 50 | 100 | 200;
