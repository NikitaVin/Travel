
import { MainPage } from "./pages/mainPage/MainPage";
import { NotFound } from "./pages/notFound";
import { Routes, Route } from "react-router-dom";
import "./scss/app.scss";
import { Cart } from "./pages/cart";

import { FullTown } from "./pages/FullTown";
import { MainLayout } from "./layouts/MainLayout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<MainPage />} />
        <Route path="town/:id" element={<FullTown />} />
        <Route path="cart" element={<Cart />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
