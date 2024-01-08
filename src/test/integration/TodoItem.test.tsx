/** @jest-environment jest-environment-jsdom */
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import TodoItem from "@/components/TodoItem";
import { StatusDef } from "@/util/types";
import { MemoryRouter } from "react-router-dom";
import Edit from "@/pages/Edit";
import { RoutePath } from "@/util/defines";

const user = userEvent.setup();

describe("TodoItemコンポーネントテスト", () => {
  const fixedTimestamp = new Date("2024-01-05").getTime();
  const onErrorMock = jest.fn();
  beforeAll(() => {});

  it("初期表示", () => {
    render(
      <div>
        <MemoryRouter
          initialEntries={[
            {
              pathname: RoutePath.Edit,
              state: {
                initialData: {
                  id: fixedTimestamp,
                  title: "テスト：タイトル",
                  detail: "テスト：詳細",
                  endDate: fixedTimestamp,
                  status: StatusDef.notStarted,
                },
              },
            },
          ]}
        >
          <TodoItem
            index={1}
            todoInfo={{
              id: fixedTimestamp,
              title: "テスト：タイトル",
              detail: "テスト：詳細",
              endDate: fixedTimestamp,
              status: StatusDef.notStarted,
            }}
            onError={onErrorMock}
          />
          <Edit />
        </MemoryRouter>
      </div>
    );

    // ステータス表示
    const status = screen.getByText("未着手");
    expect(status).toBeInTheDocument();

    // タイトル表示
    const title = screen.getByText("テスト：タイトル");
    expect(title).toBeInTheDocument();

    // 完了予定日
    const endDate = screen.getByText("2024/01/05");
    expect(endDate).toBeInTheDocument();
  });

  it("ダブルクリックしたら編集・削除画面を表示する", async () => {
    render(
      <MemoryRouter
        initialEntries={[
          {
            pathname: RoutePath.Edit,
            state: {
              initialData: {
                id: 1,
                title: "テスト：タイトル",
                detail: "テスト：詳細",
                endDate: fixedTimestamp,
                status: StatusDef.notStarted,
              },
            },
          },
        ]}
      >
        <TodoItem
          index={1}
          todoInfo={{
            id: 1,
            title: "テスト：タイトル",
            detail: "テスト：詳細",
            endDate: fixedTimestamp,
            status: StatusDef.notStarted,
          }}
          onError={onErrorMock}
        />
        <Edit />
      </MemoryRouter>
    );

    const todoInfo = screen.getByTestId("todoinfo");
    await user.dblClick(todoInfo);

    const pageTitle = screen.getByText("タスク編集・削除");
    expect(pageTitle).toBeInTheDocument();
  });
});
