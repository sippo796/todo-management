/** @jest-environment jest-environment-jsdom */
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import Sort from "@/components/Sort";
import { SortType } from "@/util/types";

const user = userEvent.setup();
const onSortMock = jest.fn();

describe("Sortコンポーネントテスト", () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  it("初期表示", () => {
    render(<Sort onSort={onSortMock} />);

    // ステータスソートボタン
    const status = screen.getByTestId("status-sort");
    expect(status).toHaveTextContent("ステータス");
    const statusIcon = within(status).getByTestId("status-asc");
    expect(statusIcon).toBeInTheDocument();

    // タイトルソートボタン
    const title = screen.getByTestId("title-sort");
    expect(title).toHaveTextContent("タイトル");
    const titleIcon = within(title).getByTestId("title-asc");
    expect(titleIcon).toBeInTheDocument();

    // 完了予定日ソートボタン
    const endDate = screen.getByTestId("enddate-sort");
    expect(endDate).toHaveTextContent("完了予定日");
    const endDateIcon = within(endDate).getByTestId("enddate-asc");
    expect(endDateIcon).toBeInTheDocument();
  });

  it("ステータスソートボタン押下", async () => {
    render(<Sort onSort={onSortMock} />);

    // ステータスソートボタン押下
    const status = screen.getByTestId("status-sort");
    await user.click(status);

    // ソート関数が降順で呼ばれ、アイコンが降順に変わること
    expect(onSortMock).toHaveBeenCalled();
    expect(onSortMock).toHaveBeenCalledWith(SortType.status, false);
    const statusIconDsc = within(status).getByTestId("status-dsc");
    expect(statusIconDsc).toBeInTheDocument();

    // 再度ソートボタン押下
    await user.click(status);

    // ソート関数が昇順で呼ばれ、アイコンが昇順に変わること
    expect(onSortMock).toHaveBeenCalled();
    expect(onSortMock).toHaveBeenCalledWith(SortType.status, true);
    const statusIconAsc = within(status).getByTestId("status-asc");
    expect(statusIconAsc).toBeInTheDocument();
  });

  it("タイトルソートボタン押下", async () => {
    render(<Sort onSort={onSortMock} />);

    // タイトルソートボタン押下
    const title = screen.getByTestId("title-sort");
    await user.click(title);

    // ソート関数が降順で呼ばれ、アイコンが降順に変わること
    expect(onSortMock).toHaveBeenCalled();
    expect(onSortMock).toHaveBeenCalledWith(SortType.title, false);
    const titleIconDsc = within(title).getByTestId("title-dsc");
    expect(titleIconDsc).toBeInTheDocument();

    // 再度ソートボタン押下
    await user.click(title);

    // ソート関数が昇順で呼ばれ、アイコンが昇順に変わること
    expect(onSortMock).toHaveBeenCalled();
    expect(onSortMock).toHaveBeenCalledWith(SortType.title, true);
    const titleIconAsc = within(title).getByTestId("title-asc");
    expect(titleIconAsc).toBeInTheDocument();
  });

  it("完了予定日ソートボタン押下", async () => {
    render(<Sort onSort={onSortMock} />);

    // 完了予定日ソートボタン押下
    const endDate = screen.getByTestId("enddate-sort");
    await user.click(endDate);

    // ソート関数が降順で呼ばれ、アイコンが降順に変わること
    expect(onSortMock).toHaveBeenCalled();
    expect(onSortMock).toHaveBeenCalledWith(SortType.date, false);
    const endDateIconDsc = within(endDate).getByTestId("enddate-dsc");
    expect(endDateIconDsc).toBeInTheDocument();

    // 再度ソートボタン押下
    await user.click(endDate);

    // ソート関数が昇順で呼ばれ、アイコンが昇順に変わること
    expect(onSortMock).toHaveBeenCalled();
    expect(onSortMock).toHaveBeenCalledWith(SortType.date, true);
    const endDateIconAsc = within(endDate).getByTestId("enddate-asc");
    expect(endDateIconAsc).toBeInTheDocument();
  });
});
