/** @jest-environment jest-environment-jsdom */
import { StatusDef } from "@/util/types";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import Top from "@/pages/Top";
import { BrowserRouter, MemoryRouter, Route, Routes } from "react-router-dom";
import { RoutePath } from "@/util/defines";
import Create from "@/pages/Create";

describe("Top画面テスト", () => {
  const user = userEvent.setup();

  beforeAll(() => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: () => {
        return Promise.resolve([
          {
            id: 1,
            title: "あいうえお",
            detail: "詳細１",
            endDate: new Date(2022, 0, 1).getTime(),
            status: StatusDef.notStarted,
          },
          {
            id: 2,
            title: "かきくけこ",
            detail: "詳細２",
            endDate: new Date(2023, 0, 1).getTime(),
            status: StatusDef.inProgress,
          },
          {
            id: 3,
            title: "さしすせそ",
            detail: "詳細３",
            endDate: new Date(2024, 0, 1).getTime(),
            status: StatusDef.completed,
          },
        ]);
      },
    });
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it("タスク一覧が表示されること", async () => {
    render(
      <BrowserRouter>
        <Top />
      </BrowserRouter>
    );

    const todoItems = await screen.findAllByTestId("todoinfo");
    expect(todoItems).toHaveLength(3);
  });

  it("ステータスソートでタスク一覧の順番が変わること", async () => {
    render(
      <BrowserRouter>
        <Top />
      </BrowserRouter>
    );

    // ステータスソートボタン
    const status = await screen.findByTestId("status-sort");
    await user.click(status);

    // Todo
    const todoItems = await screen.findAllByTestId("todoinfo");
    const title1 = within(todoItems[0]).getByText("さしすせそ");
    expect(title1).toBeInTheDocument();

    const title2 = within(todoItems[1]).getByText("かきくけこ");
    expect(title2).toBeInTheDocument();

    const title3 = within(todoItems[2]).getByText("あいうえお");
    expect(title3).toBeInTheDocument();
  });

  it("タイトルソートでタスク一覧の順番が変わること", async () => {
    render(
      <BrowserRouter>
        <Top />
      </BrowserRouter>
    );

    // タイトルソートボタン
    const title = await screen.findByTestId("title-sort");
    await user.click(title);

    // Todo
    const todoItems = await screen.findAllByTestId("todoinfo");
    const title1 = within(todoItems[0]).getByText("さしすせそ");
    expect(title1).toBeInTheDocument();

    const title2 = within(todoItems[1]).getByText("かきくけこ");
    expect(title2).toBeInTheDocument();

    const title3 = within(todoItems[2]).getByText("あいうえお");
    expect(title3).toBeInTheDocument();
  });

  it("完了予定日ソートでタスク一覧の順番が変わること", async () => {
    render(
      <BrowserRouter>
        <Top />
      </BrowserRouter>
    );

    // タイトルソートボタン
    const endDate = await screen.findByTestId("enddate-sort");
    await user.click(endDate);

    // Todo
    const todoItems = await screen.findAllByTestId("todoinfo");
    const title1 = within(todoItems[0]).getByText("さしすせそ");
    expect(title1).toBeInTheDocument();

    const title2 = within(todoItems[1]).getByText("かきくけこ");
    expect(title2).toBeInTheDocument();

    const title3 = within(todoItems[2]).getByText("あいうえお");
    expect(title3).toBeInTheDocument();
  });

  it("新規登録ボタン押下で新規登録画面に遷移する", async () => {
    render(
      <MemoryRouter initialEntries={[RoutePath.Top]}>
        <Routes>
          <Route path={RoutePath.Top} element={<Top />} />
          <Route path={RoutePath.Create} element={<Create />} />
        </Routes>
      </MemoryRouter>
    );

    // 新規登録ボタン
    const createButton = screen.getByTestId("create-button");
    await user.click(createButton);

    const createPageTitle = await screen.findByText("タスク新規作成");
    expect(createPageTitle).toBeInTheDocument();
  });
});
