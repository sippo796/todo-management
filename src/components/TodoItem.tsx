import { StatusDef, TodoInfo } from "@/util/types";
import Dropdown from "./Dropdown";
import { timestampConvertToFormatDate, updateData } from "@/util/tools";
import { useNavigate } from "react-router-dom";
import { RoutePath } from "@/util/defines";
import { useEffect, useState } from "react";

interface Props {
  todoInfo: TodoInfo;
  index: number;
  onError: (message: string) => void;
}

const TodoItem = ({ todoInfo, index, onError }: Props) => {
  const getColor = (status: StatusDef) => {
    if (status === StatusDef.completed) {
      return "bg-gray-500";
    } else if (status === StatusDef.inProgress) {
      return "bg-green-200";
    } else {
      return "bg-red-100";
    }
  };
  const navigate = useNavigate();
  const [color, setColor] = useState(getColor(todoInfo.status));

  useEffect(() => {
    setColor(getColor(todoInfo.status));
  }, [todoInfo.status]);

  return (
    <div
      className={`flex my-2 items-center w-full ${color}`}
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
