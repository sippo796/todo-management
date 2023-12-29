export enum StatusDef {
  notStarted,
  inProgress,
  completed,
}

export type TodoInfo = {
  title: string;
  detail: string;
  endDate: number;
  status: StatusDef;
};
