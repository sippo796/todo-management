import { StatusDef } from "./types";

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
