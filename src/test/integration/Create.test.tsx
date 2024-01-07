/** @jest-environment jest-environment-jsdom */
import { StatusDef, TodoInfo } from "@/util/types";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import Create from "@/pages/Create";
import { API_URL } from "@/util/defines";
import { BrowserRouter } from "react-router-dom";
// import Top from "@/pages/Top";

const user = userEvent.setup();

describe("Createコンポーネントテスト", () => {
  const fixedTimestamp = new Date("2024-01-05").getTime();

  const inputData: TodoInfo = {
    id: fixedTimestamp,
    title: "テスト：タイトル",
    detail: "テスト：詳細",
    endDate: fixedTimestamp,
    status: StatusDef.notStarted,
  };

  beforeAll(() => {
    const mockData = () =>
      Promise.resolve({
        ok: true,
        status: 200,
        json: () => {
          return { inputData };
        },
      });
    global.fetch = jest.fn().mockImplementation(mockData);

    jest.spyOn(global, "Date").mockImplementation(() => {
      return {
        getTime: () => fixedTimestamp,
        getFullYear: () => 2024,
        getMonth: () => 0,
        getDate: () => 5,
      } as unknown as Date;
    });
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it("初期状態を表示できること", async () => {
    render(
      <BrowserRouter>
        <Create />
      </BrowserRouter>
    );

    // ページタイトル
    const pageTitle = screen.getByTestId("page-title");
    expect(pageTitle).toHaveTextContent("タスク新規作成");

    //   タイトル入力
    const title = screen.getByPlaceholderText("タイトル");
    expect(title).toHaveValue("");

    //   完了予定日入力
    const endDate = screen.getByTestId("endDate");
    expect(endDate).toHaveValue("");

    //   詳細
    const detail = screen.getByPlaceholderText("タスク詳細");
    expect(detail).toHaveValue("");

    // 新規作成ボタン
    const editButton = screen.getByRole("button", { name: "create-button" });
    expect(editButton).toBeInTheDocument();
  });

  it("入力データで登録APIをコールする", async () => {
    render(
      <BrowserRouter>
        <Create />
      </BrowserRouter>
    );
    // タイトル入力
    const title = screen.getByPlaceholderText("タイトル");
    await user.type(title, inputData.title);

    // 完了予定日入力
    const endDate = screen.getByTestId("endDate");
    await user.type(endDate, "2024-01-05");

    // 詳細
    const detail = screen.getByPlaceholderText("タスク詳細");
    await user.type(detail, inputData.detail);

    // 新規作成ボタン
    const editButton = screen.getByRole("button", { name: "create-button" });
    await user.click(editButton);

    // fetchの確認
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(`${API_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputData),
    });
  });
});
