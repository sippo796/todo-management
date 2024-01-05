/** @jest-environment node */
import {
  sortTodoItems,
  statusConvertToString,
  stringConvertToStatus,
  timestampConvertToFormatDate,
} from "../../util/tools";
import { SortType, StatusDef, TodoInfo } from "../../util/types";

describe("stringConvertToStatusテスト", () => {
  it.each`
    status | expected
    ${0}   | ${StatusDef.notStarted}
    ${1}   | ${StatusDef.inProgress}
    ${2}   | ${StatusDef.completed}
    ${3}   | ${StatusDef.notStarted}
  `(`文字列$statusを変換すると$expectedになる確認`, ({ status, expected }) => {
    expect(stringConvertToStatus(status)).toBe(expected);
  });
});

describe("statusConvertToStringテスト", () => {
  it.each`
    status                  | expected
    ${StatusDef.notStarted} | ${"未着手"}
    ${StatusDef.inProgress} | ${"進行中"}
    ${StatusDef.completed}  | ${"完了"}
    ${3}                    | ${""}
  `(
    `$statusを文字列に変換すると$expectedになる確認`,
    ({ status, expected }) => {
      expect(statusConvertToString(status)).toBe(expected);
    }
  );
});

describe("timestampConvertToFormatDateテスト", () => {
  it.each`
    timestamp                          | delimiter    | expected
    ${new Date(2024, 1, 2).getTime()}  | ${undefined} | ${"2024/02/02"}
    ${new Date(2024, 1, 2).getTime()}  | ${"/"}       | ${"2024/02/02"}
    ${new Date(2024, 11, 2).getTime()} | ${"-"}       | ${"2024-12-02"}
    ${undefined}                       | ${"-"}       | ${timestampConvertToFormatDate(new Date().getTime(), "-")}
  `(
    `$timestampを文字列に変換すると$expectedになる確認`,
    ({ timestamp, delimiter, expected }) => {
      expect(timestampConvertToFormatDate(timestamp, delimiter)).toBe(expected);
    }
  );
});

describe("sortTodoItemsテスト", () => {
  const defaultItems: TodoInfo[] = [
    {
      id: 1,
      title: "さしすせそ",
      detail: "詳細１",
      endDate: new Date(2024, 0, 1).getTime(),
      status: StatusDef.notStarted,
    },
    {
      id: 2,
      title: "あいうえお",
      detail: "詳細２",
      endDate: new Date(2023, 0, 1).getTime(),
      status: StatusDef.inProgress,
    },
    {
      id: 3,
      title: "かきくけこ",
      detail: "詳細３",
      endDate: new Date(2022, 0, 1).getTime(),
      status: StatusDef.completed,
    },
  ];
  let items: TodoInfo[] = [];

  beforeEach(() => {
    items = [...defaultItems];
  });

  it("ステータスで昇順ソート", () => {
    const result = sortTodoItems(items, SortType.status, true);
    expect(result).toStrictEqual([
      {
        id: 1,
        title: "さしすせそ",
        detail: "詳細１",
        endDate: new Date(2024, 0, 1).getTime(),
        status: StatusDef.notStarted,
      },
      {
        id: 2,
        title: "あいうえお",
        detail: "詳細２",
        endDate: new Date(2023, 0, 1).getTime(),
        status: StatusDef.inProgress,
      },
      {
        id: 3,
        title: "かきくけこ",
        detail: "詳細３",
        endDate: new Date(2022, 0, 1).getTime(),
        status: StatusDef.completed,
      },
    ]);
  });

  it("ステータスで降順ソート", () => {
    const result = sortTodoItems(items, SortType.status, false);
    expect(result).toStrictEqual([
      {
        id: 3,
        title: "かきくけこ",
        detail: "詳細３",
        endDate: new Date(2022, 0, 1).getTime(),
        status: StatusDef.completed,
      },
      {
        id: 2,
        title: "あいうえお",
        detail: "詳細２",
        endDate: new Date(2023, 0, 1).getTime(),
        status: StatusDef.inProgress,
      },
      {
        id: 1,
        title: "さしすせそ",
        detail: "詳細１",
        endDate: new Date(2024, 0, 1).getTime(),
        status: StatusDef.notStarted,
      },
    ]);
  });

  it("タイトルで昇順ソート", () => {
    const result = sortTodoItems(items, SortType.title, true);
    expect(result).toStrictEqual([
      {
        id: 2,
        title: "あいうえお",
        detail: "詳細２",
        endDate: new Date(2023, 0, 1).getTime(),
        status: StatusDef.inProgress,
      },
      {
        id: 3,
        title: "かきくけこ",
        detail: "詳細３",
        endDate: new Date(2022, 0, 1).getTime(),
        status: StatusDef.completed,
      },
      {
        id: 1,
        title: "さしすせそ",
        detail: "詳細１",
        endDate: new Date(2024, 0, 1).getTime(),
        status: StatusDef.notStarted,
      },
    ]);
  });

  it("タイトルで降順ソート", () => {
    const result = sortTodoItems(items, SortType.title, false);
    expect(result).toStrictEqual([
      {
        id: 1,
        title: "さしすせそ",
        detail: "詳細１",
        endDate: new Date(2024, 0, 1).getTime(),
        status: StatusDef.notStarted,
      },
      {
        id: 3,
        title: "かきくけこ",
        detail: "詳細３",
        endDate: new Date(2022, 0, 1).getTime(),
        status: StatusDef.completed,
      },
      {
        id: 2,
        title: "あいうえお",
        detail: "詳細２",
        endDate: new Date(2023, 0, 1).getTime(),
        status: StatusDef.inProgress,
      },
    ]);
  });

  it("完了予定日で昇順ソート", () => {
    const result = sortTodoItems(items, SortType.date, true);
    expect(result).toStrictEqual([
      {
        id: 3,
        title: "かきくけこ",
        detail: "詳細３",
        endDate: new Date(2022, 0, 1).getTime(),
        status: StatusDef.completed,
      },
      {
        id: 2,
        title: "あいうえお",
        detail: "詳細２",
        endDate: new Date(2023, 0, 1).getTime(),
        status: StatusDef.inProgress,
      },
      {
        id: 1,
        title: "さしすせそ",
        detail: "詳細１",
        endDate: new Date(2024, 0, 1).getTime(),
        status: StatusDef.notStarted,
      },
    ]);
  });

  it("完了予定日で降順ソート", () => {
    const result = sortTodoItems(items, SortType.date, false);
    expect(result).toStrictEqual([
      {
        id: 1,
        title: "さしすせそ",
        detail: "詳細１",
        endDate: new Date(2024, 0, 1).getTime(),
        status: StatusDef.notStarted,
      },
      {
        id: 2,
        title: "あいうえお",
        detail: "詳細２",
        endDate: new Date(2023, 0, 1).getTime(),
        status: StatusDef.inProgress,
      },
      {
        id: 3,
        title: "かきくけこ",
        detail: "詳細３",
        endDate: new Date(2022, 0, 1).getTime(),
        status: StatusDef.completed,
      },
    ]);
  });
});
