import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RoutePath } from "@/util/defines";
import Top from "@/pages/Top";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Top */}
        <Route path={RoutePath.Top} element={<Top />} />
        {/* 新規登録 */}
        {/* 編集 */}
        {/* NotFound */}
        <Route path={RoutePath.NotFound} element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
