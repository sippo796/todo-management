/** @jest-environment jest-environment-jsdom */
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Message from "@/components/Message";

describe("Messageコンポーネントテスト", () => {
  it("メッセージを表示できること", () => {
    render(<Message message="Messageコンポーネントのテスト" />);

    expect(
      screen.getByText("Messageコンポーネントのテスト")
    ).toBeInTheDocument();
  });
});
