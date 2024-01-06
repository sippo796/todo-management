import BackButton from "@/components/BackButton";
import TodoInput from "@/components/TodoInput";
import { PageType } from "@/util/types";

const Create = () => {
  return (
    <>
      <TodoInput type={PageType.create} />
      <BackButton />
    </>
  );
};

export default Create;
