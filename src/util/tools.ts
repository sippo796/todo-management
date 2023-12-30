import { SortType, StatusDef, TodoInfo } from "./types";

export const stringConvertToStatus = (status: string): StatusDef => {
  return parseInt(status, 10) as StatusDef;
};

export const statusConvertToString = (status: StatusDef): string => {
  switch (status) {
    case StatusDef.notStarted:
      return "未着手";
    case StatusDef.inProgress:
      return "進行中";
    case StatusDef.completed:
      return "完了";
    default:
      return "";
  }
};

export const timestampConvertToFormatDate = (timestamp: number): string => {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const formattedMonth = month < 10 ? `0${month}` : `${month}`;
  const formattedDay = day < 10 ? `0${day}` : `${day}`;

  return `${year}/${formattedMonth}/${formattedDay}`;
};

export const sortTodoItems = (
  items: TodoInfo[],
  type: SortType,
  ascending: boolean
): TodoInfo[] => {
  switch (type) {
    case SortType.status:
      if (ascending) {
        return items.sort((a, b) => a.status - b.status);
      } else {
        return items.sort((a, b) => b.status - a.status);
      }
    case SortType.title:
      if (ascending) {
        return items.sort((a, b) => a.title.localeCompare(b.title));
      } else {
        return items.sort((a, b) => b.title.localeCompare(a.title));
      }
    case SortType.date:
      if (ascending) {
        return items.sort((a, b) => a.endDate - b.endDate);
      } else {
        return items.sort((a, b) => b.endDate - a.endDate);
      }
  }
};
