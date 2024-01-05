import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const PageBase = ({ children }: Props) => {
  return (
    <main>
      {/* アプリ名 */}
      <section className="bg-black text-white p-2 rounded-t-lg">
        <h1>タスク管理アプリ</h1>
      </section>

      {children}
    </main>
  );
};

export default PageBase;
