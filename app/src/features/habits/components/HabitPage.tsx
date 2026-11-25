import { Route, Routes } from "react-router";
import { HabitCreate } from "./HabitCreate";
import { HabitDetail } from "./HabitDetail";
import HabitListPage from "./HabitListPage";

function HabitPage() {
  return (
    <Routes>
      <Route index element={<HabitListPage />} />
      <Route path="new" element={<HabitCreate />} />
      <Route path=":id" element={<HabitDetail />} />
      <Route path="*" element={<p>Seite nicht gefunden</p>} />
    </Routes>
  );
}

export default HabitPage;
