import {
  ApiError,
  addData,
  deleteData,
  readAll,
  readData,
  updateData,
} from "../util/tools";

describe("モックサーバー異常系テスト", () => {
  beforeAll(() => {
    // fetchが失敗するようにモックを設定
    global.fetch = jest.fn();
    (global.fetch as jest.Mock).mockRejectedValue(new Error("Network error"));
  });

  it("全データの取得", async () => {
    await expect(readAll()).rejects.toThrow(ApiError);
  });

  it("データの追加", async () => {
    await expect(
      addData({
        id: 1,
        title: "test1",
        detail: "test1の詳細",
        status: 0,
        endDate: 12345,
      })
    ).rejects.toThrow(ApiError);
  });

  it("データの取得", async () => {
    await expect(readData(1)).rejects.toThrow(ApiError);
  });

  it("データの更新", async () => {
    await expect(
      updateData({
        id: 1,
        title: "test1-update",
        detail: "test1の詳細を更新",
        status: 0,
        endDate: 12345,
      })
    ).rejects.toThrow(ApiError);
  });

  it("データの削除", async () => {
    await expect(deleteData(1)).rejects.toThrow(ApiError);
  });

  afterAll(() => {
    // fetchのモックをクリア
    (global.fetch as jest.Mock).mockClear();
  });
});
