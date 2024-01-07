/** @jest-environment jest-environment-jsdom */
import { StatusDef, TodoInfo } from "@/util/types";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { API_URL, RoutePath } from "@/util/defines";
import { MemoryRouter } from "react-router-dom";
// import Top from "@/pages/Top";
import Edit from "@/pages/Edit";

const user = userEvent.setup();

describe("Editコンポーネントテスト", () => {
  const fixedTimestamp = new Date("2024-01-05").getTime();

  const inputData: TodoInfo = {
    id: fixedTimestamp,
    title: "テスト：タイトル",
    detail: "テスト：詳細",
    endDate: fixedTimestamp,
    status: StatusDef.notStarted,
  };

  beforeEach(() => {
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

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("初期データを表示できること", async () => {
    render(
      <div>
        <MemoryRouter
          initialEntries={[
            {
              pathname: RoutePath.Edit,
              state: {
                initialData: {
                  ...inputData,
                },
              },
            },
          ]}
        >
          <Edit />
        </MemoryRouter>
      </div>
    );

    // ページタイトル
    const pageTitle = screen.getByTestId("page-title");
    expect(pageTitle).toHaveTextContent("タスク編集・削除");

    //   タイトル入力
    const title = screen.getByPlaceholderText("タイトル");
    expect(title).toHaveValue(inputData.title);

    //   完了予定日入力
    const endDate = screen.getByTestId("endDate");
    expect(endDate).toHaveValue("2024-01-05");

    //   詳細
    const detail = screen.getByPlaceholderText("タスク詳細");
    expect(detail).toHaveValue(inputData.detail);

    // 編集ボタン
    const editButton = screen.getByRole("button", { name: "edit-button" });
    expect(editButton).toBeInTheDocument();

    // 削除ボタン
    const deleteButton = screen.getByRole("button", {
      name: "delete-button",
    });
    expect(deleteButton).toBeInTheDocument();
  });

  it("入力データで更新APIをコールする", async () => {
    render(
      <div>
        <MemoryRouter
          initialEntries={[
            {
              pathname: RoutePath.Edit,
              state: {
                initialData: {
                  ...inputData,
                },
              },
            },
          ]}
        >
          <Edit />
        </MemoryRouter>
      </div>
    );

    const editData: TodoInfo = {
      ...inputData,
      title: "編集後のタイトル",
      endDate: new Date("2024-01-31").getTime(),
      detail: "編集後の詳細",
    };

    // タイトル入力
    const title = screen.getByPlaceholderText("タイトル");
    await user.clear(title);
    await user.type(title, editData.title);

    // 完了予定日入力
    const endDate = screen.getByTestId("endDate");
    await user.clear(endDate);
    await user.type(endDate, "2024-01-31");

    // 詳細
    const detail = screen.getByPlaceholderText("タスク詳細");
    await user.clear(detail);
    await user.type(detail, editData.detail);

    // 編集ボタン
    const editButton = screen.getByRole("button", { name: "edit-button" });
    await user.click(editButton);

    // fetchの確認
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(`${API_URL}/${inputData.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editData),
    });
  });

  it("削除APIをコールする", async () => {
    render(
      <div>
        <MemoryRouter
          initialEntries={[
            {
              pathname: RoutePath.Edit,
              state: {
                initialData: {
                  ...inputData,
                },
              },
            },
          ]}
        >
          <Edit />
        </MemoryRouter>
      </div>
    );

    // 削除ボタン
    const deleteButton = screen.getByRole("button", {
      name: "delete-button",
    });
    await user.click(deleteButton);

    // fetchの確認
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(`${API_URL}/${inputData.id}`, {
      method: "DELETE",
    });
  });
});
