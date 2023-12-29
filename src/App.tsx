import { useEffect, useState } from "react";
import { StatusDef, TodoInfo } from "./util/types";
import TodoItem from "./components/TodoItem";

function App() {
  const [todoList, setTodoList] = useState<TodoInfo[]>([]);

  useEffect(() => {
    const readData = async () => {
      // todo: test data
      setTodoList([
        {
          title: "タスク１",
          detail: "タスク１の詳細です",
          status: StatusDef.notStarted,
          endDate: new Date(2023, 11, 26).getTime(),
        },
        {
          title: "タスク２",
          detail: "タスク２の詳細です",
          status: StatusDef.inProgress,
          endDate: new Date(2024, 0, 5).getTime(),
        },
        {
          title: "タスク３",
          detail: "タスク３の詳細です",
          status: StatusDef.completed,
          endDate: new Date(2024, 0, 31).getTime(),
        },
      ]);
    };

    readData();
  }, []);

  return (
    <main>
      {/* アプリ名 */}
      <section className="bg-black text-white p-2 rounded-t-lg">
        <h1>タスク管理アプリ</h1>
      </section>

      {/* ソート */}
      <section className="w-full">
        <Sort
          onSort={(type) => {
            const temp = sortTodoItems(todoList, type);
            console.log(JSON.stringify(temp));
            setTodoList(temp);
          }}
        />
      </section>

      {/* タスク一覧 */}
      <section className="p-2">
        {todoList.map((info, index) => (
          <div key={index} className="flex">
            <TodoItem todoInfo={info} index={index} />
          </div>
        ))}
      </section>
    </main>
  );
}

export default App;
