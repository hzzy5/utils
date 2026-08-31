import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
// weitere Tabs importieren

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/vrr">VRR</Link>
        {/* weitere Links */}
      </nav>
      <Routes>
         /* <Route path="/vrr" element={<VrrBoard />} /> */
        {/* weitere Routes */}
      </Routes>
    </BrowserRouter>
  );
}