import { TodoInfo } from "@/util/types";
import Dropdown from "./Dropdown";
import { timestampConvertToFormatDate } from "@/util/tools";
import { useNavigate } from "react-router-dom";
import { RoutePath } from "@/util/defines";

interface Props {
  todoInfo: TodoInfo;
  index: number;
}

const TodoItem = ({ todoInfo, index }: Props) => {
  const navigate = useNavigate();

  return (
    <div
      className="flex my-2 items-center w-full bg-slate-400"
      data-testid={`todoinfo`}
      onDoubleClick={() => {
        navigate(RoutePath.Edit, {
          state: { initialData: todoInfo },
        });
      }}
    >
      {/* ステータス */}
      <Dropdown
        index={index}
        initialStatus={todoInfo.status}
        onSelect={async (status) => {
          todoInfo.status = status;
          setColor(getColor(status));
          try {
            await updateData({
              ...todoInfo,
              status: status,
            });
          } catch (error) {
            onError("ステータスの保存に失敗しました");
          }
        }}
      />

      {/* タイトル */}
      <div className="mx-2 flex-grow">{todoInfo.title}</div>

      {/* 完了予定日 */}
      <div className="mx-2">
        {timestampConvertToFormatDate(todoInfo.endDate)}
      </div>
    </div>
  );
};

export default TodoItem;
