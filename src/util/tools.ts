import { API_URL } from "./defines";
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

export const timestampConvertToFormatDate = (
  timestamp: number,
  delimiter = "/"
): string => {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const formattedMonth = month < 10 ? `0${month}` : `${month}`;
  const formattedDay = day < 10 ? `0${day}` : `${day}`;

  return `${year}${delimiter}${formattedMonth}${delimiter}${formattedDay}`;
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

export const addData = async (todoInfo: TodoInfo) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todoInfo),
  });
  return response.json();
};

export const updateData = async (todoInfo: TodoInfo): Promise<TodoInfo> => {
  const response = await fetch(`${API_URL}/${todoInfo.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todoInfo),
  });
  return response.json();
};

export const deleteData = async (id: number): Promise<void> => {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
};

export const readData = async (id: number): Promise<TodoInfo> => {
  const response = await fetch(`${API_URL}/${id}`);
  return response.json();
};

export const readAll = async (): Promise<TodoInfo[]> => {
  const response = await fetch(API_URL);
  return response.json();
};
