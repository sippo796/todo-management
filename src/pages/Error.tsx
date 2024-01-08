import PageBase from "@/components/PageBase";
import { FallbackProps } from "react-error-boundary";

const Error = ({ error }: FallbackProps) => {
  console.log(`error = ${error}`);
  return (
    <PageBase>
      <div>
        <h2>Error</h2>
        <p>{error}</p>
      </div>
    </PageBase>
  );
};

export default Error;
