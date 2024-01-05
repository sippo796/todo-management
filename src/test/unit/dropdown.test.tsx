/** @jest-environment jest-environment-jsdom */
import { StatusDef } from "@/util/types";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import Dropdown from "@/components/Dropdown";

const user = userEvent.setup();

describe("ドロップダウンのテスト", () => {
  it("ステータスの変更ができること", async () => {
    render(
      <Dropdown
        index={0}
        initialStatus={StatusDef.notStarted}
        onSelect={() => console.log}
      />
    );

    // Select要素を取得
    const dropdown = screen.getByTestId("test-label-0");

    // Select要素内のcomboboxロールを取得
    const combobox = within(dropdown).getByRole("combobox");

    // コンボボックスをクリック
    await user.click(combobox);

    // listboxロールを持つ要素を取得
    const listbox = within(screen.getByRole("presentation")).getByRole(
      "listbox"
    );

    // listboxロールを親に持つoptionロールを持つ要素を取得し、optionsに代入
    const options = within(listbox).getAllByRole("option");

    // オプション数（＝選択要素の数）が3であること
    expect(options.length).toBe(3);

    // option内の2つ目の要素（＝「進行中」）をクリック
    await user.click(options[1]);

    // ドロップダウンの値が「進行中」になっていることを確認
    expect(combobox).toHaveTextContent("進行中");
  });
});
