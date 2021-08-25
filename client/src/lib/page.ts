export enum PageMode {
  VIEW = 'VIEW',
  EDIT = 'EDIT',
  DELETE = 'DELETE',
};

export type SortDirectionType = 'asc' | 'desc';

export type ColumnSortState = {
  [key: string]: SortDirectionType,
};
