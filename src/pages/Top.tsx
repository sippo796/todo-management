import PageBase from "@/components/PageBase";
import Sort from "@/components/Sort";
import TodoItem from "@/components/TodoItem";
import { API_URL } from "@/util/defines";
import { sortTodoItems } from "@/util/tools";
import { TodoInfo } from "@/util/types";
import { useEffect, useState } from "react";

const Top = () => {
  const [todoList, setTodoList] = useState<TodoInfo[]>([]);

  useEffect(() => {
    const readData = async () => {
      const response = await fetch(API_URL);
      const todos = await response.json();

      setTodoList(todos);
    };

    readData();
  }, []);
  return (
    <PageBase>
      {/* ソート */}
      <section className="w-full">
        <Sort
          onSort={(type, ascending) => {
            const temp = [...sortTodoItems(todoList, type, ascending)];
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
    </PageBase>
  );
};

export default Top;
