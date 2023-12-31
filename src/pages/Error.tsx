import PageBase from "@/components/PageBase";
import { FallbackProps } from "react-error-boundary";

const Error = ({ error }: FallbackProps) => {
  return (
    <PageBase>
      <div>
        <h1>Error</h1>
        <p>{error.message}</p>
      </div>
    </PageBase>
  );
};

export default Error;
