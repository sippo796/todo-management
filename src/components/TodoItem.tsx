import { TodoInfo } from "@/util/types";
import Dropdown from "./Dropdown";
import { timestampConvertToFormatDate } from "@/util/tools";

interface Props {
  todoInfo: TodoInfo;
  index: number;
}

const TodoItem = ({ todoInfo, index }: Props) => {
  return (
    <div className="flex my-2 items-center w-full bg-slate-400">
      {/* ステータス */}
      <Dropdown
        index={index}
        initialStatus={todoInfo.status}
        onSelect={(status) => (todoInfo.status = status)}
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
