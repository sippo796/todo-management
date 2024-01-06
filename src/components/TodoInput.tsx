import { InputData, PageType, StatusDef, TodoInfo } from "@/util/types";
import { ChangeEvent, useEffect, useState } from "react";
import { Modal } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  addData,
  deleteData,
  timestampConvertToFormatDate,
  updateData,
} from "@/util/tools";
import { RoutePath } from "@/util/defines";
import PageBase from "./PageBase";
import Message from "./Message";

interface Props {
  type: PageType;
  initialData?: TodoInfo;
}

const TodoInput = ({ type, initialData }: Props) => {
  const [formData, setFormData] = useState<InputData>({
    title: "",
    details: "",
    endDate: "",
  });
  const [pageTitle, setPageTitle] = useState("");
  const [isMessageShow, setIsMessageShow] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (type === PageType.edit) {
      setPageTitle("タスク編集・削除");
      if (initialData !== undefined) {
        setFormData({
          title: initialData.title,
          details: initialData.detail,
          endDate: timestampConvertToFormatDate(initialData.endDate, "-"),
        });
      }
    } else {
      setPageTitle("タスク新規作成");
    }
  }, []);

  const inputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const detailChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      details: e.target.value,
    });
  };

  const showDialog = async (message: string, routePath?: string) => {
    setDialogMessage(message);
    setIsMessageShow(true);

    setTimeout(() => {
      setIsMessageShow(false);
      if (routePath) {
        navigate(RoutePath.Top);
      }
    }, 2000);
  };

  const onSubmit = async () => {
    try {
      await addData({
        id: new Date().getTime(),
        title: formData.title,
        detail: formData.details,
        endDate: new Date(formData.endDate).getTime(),
        status: StatusDef.notStarted,
      });

      // フォームのリセット
      //   setFormData({
      //     title: "",
      //     details: "",
      //     endDate: "",
      //   });

      showDialog("タスクを新規作成しました", RoutePath.Top);
    } catch (error) {
      setDialogMessage("タスクの作成に失敗しました");
    }
  };

  const onEdit = async () => {
    try {
      if (initialData) {
        await updateData({
          ...initialData,
          title: formData.title,
          detail: formData.details,
          endDate: new Date(formData.endDate).getTime(),
        });
        showDialog("タスクを更新しました", RoutePath.Top);
      } else {
        throw new Error();
      }
    } catch (error) {
      setDialogMessage("タスクの更新に失敗しました");
    }
  };

  const onDelete = async () => {
    setDialogMessage("タスクを削除しました");

    try {
      if (initialData) {
        await deleteData(initialData.id);
        showDialog("タスクを削除しました", RoutePath.Top);
      } else {
        throw new Error();
      }
    } catch (error) {
      setDialogMessage("タスクの削除に失敗しました");
    }
  };

  return (
    <PageBase>
      <h1 data-testid="page-title">{pageTitle}</h1>

      <form>
        {/* タイトル */}
        <input
          className="w-full p-2 rounded-sm bg-gray-200 my-2"
          type="text"
          name="title"
          aria-label="title"
          value={formData.title}
          onChange={inputChange}
          placeholder="タイトル"
        />
        {/* 完了予定日 */}
        <input
          className="w-full p-2 rounded-sm bg-gray-200"
          type="date"
          name="endDate"
          data-testid="endDate"
          value={formData.endDate}
          onChange={inputChange}
          placeholder="完了予定日"
        />
        {/* 詳細 */}
        <textarea
          className="w-full p-2 rounded-sm bg-gray-200 my-2 h-60 align-top"
          name="details"
          value={formData.details}
          onChange={detailChange}
          placeholder="タスク詳細"
        />
        {/* 操作ボタン */}
        <section className="items-center flex w-full">
          {type === PageType.create ? (
            <button
              type="button"
              aria-label="create-button"
              className="m-auto w-24 h-10 rounded-sm bg-orange-400 hover:bg-orange-300"
              onClick={onSubmit}
            >
              登録
            </button>
          ) : (
            <>
              <button
                type="button"
                aria-label="edit-button"
                className="m-auto w-24 h-10 rounded-sm bg-orange-400 hover:bg-orange-300"
                onClick={onEdit}
              >
                更新
              </button>
              <button
                type="button"
                aria-label="delete-button"
                className="m-auto w-24 h-10 rounded-sm bg-red-500 text-white hover:bg-red-400"
                onClick={onDelete}
              >
                削除
              </button>
            </>
          )}
        </section>
      </form>

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

export default TodoInput;
