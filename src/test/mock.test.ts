import { TodoInfo } from "@/util/types";
import {
  deleteData,
  addData,
  updateData,
  readAll,
  readData,
} from "../util/tools";

export const resetDatabase = async () => {
  // db.jsonのリセット
  const response = await fetch(`http://localhost:3000/todos`);
  const todos = await response.json();

  // 各todoを削除
  await Promise.all(
    todos.map((todo: TodoInfo) =>
      fetch(`http://localhost:3000/todos/${todo.id}`, { method: "DELETE" })
    )
  );
};

describe("モックサーバー正常系テスト", () => {
  beforeAll(async () => {
    await resetDatabase();
  });

  it("全データの取得:0件であること", async () => {
    const allData = await readAll();
    expect(allData.length).toBe(0);
  });

  it("データの追加", async () => {
    await addData({
      id: 1,
      title: "test1",
      detail: "test1の詳細",
      status: 0,
      endDate: 12345,
    });

    const allData = await readAll();
    expect(allData.length).toBe(1);
  });

  it("データの取得", async () => {
    const todoInfo = await readData(1);

    expect(todoInfo).toEqual({
      id: 1,
      title: "test1",
      detail: "test1の詳細",
      status: 0,
      endDate: 12345,
    });
  });

  it("データの更新", async () => {
    const update: TodoInfo = {
      id: 1,
      title: "test1-update",
      detail: "test1の詳細を更新",
      status: 0,
      endDate: 12345,
    };
    await updateData(update);

    const result = await readData(1);
    expect(result).toEqual(update);
  });
});

describe("モックサーバー正常系テスト（対象なし）", () => {
  beforeAll(async () => {
    await resetDatabase();

    await addData({
      id: 1,
      title: "test1",
      detail: "test1の詳細",
      status: 0,
      endDate: 12345,
    });
  });

  it("データの取得（対象なし）", async () => {
    const todoInfo = await readData(10);

    expect(todoInfo).toEqual({});
  });

  it("データの更新（対象なし）", async () => {
    const update: TodoInfo = {
      id: 10,
      title: "test1-update",
      detail: "test1の詳細を更新",
      status: 0,
      endDate: 12345,
    };
    await updateData(update);

    const result = await readData(10);
    expect(result).toEqual({});
  });

  it("データの削除（対象なし）", async () => {
    await deleteData(10);

    const allData = await readAll();
    expect(allData.length).toBe(1);
  });
});
