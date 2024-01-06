import PageBase from "@/components/PageBase";
import Sort from "@/components/Sort";
import TodoItem from "@/components/TodoItem";
import { API_URL, RoutePath } from "@/util/defines";
import { sortTodoItems } from "@/util/tools";
import { TodoInfo } from "@/util/types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Top = () => {
  const [todoList, setTodoList] = useState<TodoInfo[]>([]);
  const navigate = useNavigate();

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

      {/* 新規登録ボタン */}
      <section className="items-center flex w-full">
        <button
          type="button"
          onClick={() => navigate(RoutePath.Create)}
          className="m-auto w-24 h-10 rounded-sm bg-orange-400 hover:bg-orange-300"
        >
          新規登録
        </button>
      </section>
    </PageBase>
  );
};

export default Top;
