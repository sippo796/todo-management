import { RoutePath } from "@/util/defines";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const BackButton = () => {
  const navigate = useNavigate();
  return (
    <section>
      <button
        className="mx-5 my-20 rounded border-2 border-black px-2 py-1 flex"
        onClick={() => navigate(RoutePath.Top)}
      >
        <ArrowBackIcon />
        Top画面へ
      </button>
    </section>
  );
};

export default BackButton;
