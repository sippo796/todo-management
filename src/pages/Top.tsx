import PageBase from "@/components/PageBase";
import Sort from "@/components/Sort";
import TodoItem from "@/components/TodoItem";
import { RoutePath } from "@/util/defines";
import { readAll, sortTodoItems } from "@/util/tools";
import { TodoInfo } from "@/util/types";
import Message from "@/components/Message";
import { Modal } from "@mui/material";
import { useEffect, useState } from "react";
import { useErrorBoundary } from "react-error-boundary";
import { useNavigate } from "react-router-dom";

const Top = () => {
  const [isLoad, setIsLoad] = useState(false);
  const [todoList, setTodoList] = useState<TodoInfo[]>([]);
  const navigate = useNavigate();
  const { showBoundary } = useErrorBoundary();
  const [isMessageShow, setIsMessageShow] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");

  useEffect(() => {
    const readData = async () => {
      try {
        const todos = await readAll();
        setTodoList(todos);
        setIsLoad(true);
      } catch (error) {
        showBoundary("タスクの読み込みに失敗しました");
      }
    };

    readData();
  }, []);

  const showDialog = async (message: string) => {
    setDialogMessage(message);
    setIsMessageShow(true);

    setTimeout(() => {
      setIsMessageShow(false);
    }, 2000);
  };

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
      {isLoad ? (
        <section className="p-2">
          {todoList?.map((info, index) => (
            <div key={index} className="flex">
              <TodoItem
                todoInfo={info}
                index={index}
                onError={(message) => {
                  showDialog(message);
                }}
              />
            </div>
          ))}
        </section>
      ) : (
        <div className="w-full h-full">
          <h1>Loading...</h1>
        </div>
      )}

      {/* 新規登録ボタン */}
      <section className="items-center flex w-full">
        <button
          type="button"
          onClick={() => navigate(RoutePath.Create)}
          data-testid="create-button"
          className="m-auto w-24 h-10 rounded-sm bg-orange-400 hover:bg-orange-300"
        >
          新規登録
        </button>
      </section>

      <Modal
        open={isMessageShow}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        className="flex items-center justify-center"
      >
        <div>
          <Message message={dialogMessage}></Message>
        </div>
      </Modal>
    </PageBase>
  );
};

export default Top;
