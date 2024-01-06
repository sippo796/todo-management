export enum StatusDef {
  notStarted,
  inProgress,
  completed,
}

export type TodoInfo = {
  id: number;
  title: string;
  detail: string;
  endDate: number;
  status: StatusDef;
};

export enum SortType {
  status,
  title,
  date,
}

export enum PageType {
  create,
  edit,
}
