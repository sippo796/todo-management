import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RoutePath } from "@/util/defines";
import Top from "@/pages/Top";
import NotFound from "@/pages/NotFound";
import Create from "@/pages/Create";
import { PageType } from "@/util/types";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Top */}
        <Route path={RoutePath.Top} element={<Top />} />
        {/* 新規登録 */}
        <Route
          path={RoutePath.Create}
          element={<Create type={PageType.create} />}
        />
        {/* 編集 */}
        <Route
          path={RoutePath.Edit}
          element={<Create type={PageType.edit} />}
        />
        {/* NotFound */}
        <Route path={RoutePath.NotFound} element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
