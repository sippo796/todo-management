import { TodoInfo } from "@/util/types";
import {
  deleteData,
  addData,
  updateData,
  readAll,
  readData,
} from "../util/tools";

describe("モックサーバー", () => {
  beforeAll(async () => {
    // db.jsonのリセット
    const response = await fetch(`http://localhost:3000/todos`);
    const todos = await response.json();

    // 各todoを削除
    await Promise.all(
      todos.map((todo: TodoInfo) =>
        fetch(`http://localhost:3000/todos/${todo.id}`, { method: "DELETE" })
      )
    );
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

  it("データの削除", async () => {
    await deleteData(1);

    const allData = await readAll();
    expect(allData.length).toBe(0);
  });
});
