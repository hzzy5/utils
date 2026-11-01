import { Route, Routes } from "react-router/internal/react-server-client";
import ShoppingListPage from "./ShoppingListPage";
import { ShoppingHub } from "./ShoppingHub";
import { ItemDetail } from "./ItemDetail";
import { ItemCreate } from "./ItemCreate";

function ShoppingPage() {
  return (
    <Routes>
      <Route index element={<ShoppingHub />} />
      <Route path="list/:category" element={<ShoppingListPage />} />
      <Route path="new" element={<ItemCreate />} />
      <Route path=":id" element={<ItemDetail />} />
      <Route path="*" element={<p>Seite nicht gefunden</p>} />
    </Routes>
  );
}

export default ShoppingPage;
