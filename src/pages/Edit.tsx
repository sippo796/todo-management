import BackButton from "@/components/BackButton";
import TodoInput from "@/components/TodoInput";
import { RoutePath } from "@/util/defines";
import { PageType } from "@/util/types";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Edit = () => {
  const location = useLocation();
  const data = location.state;
  const navigate = useNavigate();

  useEffect(() => {
    if (!data) {
      navigate(RoutePath.Top);
    }
  }, [data]);

  return (
    <>
      <TodoInput type={PageType.edit} initialData={data?.initialData} />
      <BackButton />
    </>
  );
};

export default Edit;
