import BackButton from "@/components/BackButton";
import TodoInput from "@/components/TodoInput";
import { PageType } from "@/util/types";
import { useLocation } from "react-router-dom";

const Edit = () => {
  const location = useLocation();
  const data = location.state;

  return (
    <>
      <TodoInput type={PageType.edit} initialData={data.initialData} />
      <BackButton />
    </>
  );
};

export default Edit;
