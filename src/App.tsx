import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainScreen from "./tabs/MainScreen/mainScreen";
import TrainScreen from "./tabs/trains/trainScreen";
// weitere Tabs importieren

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainScreen />} />
        <Route path="/trains" element={<TrainScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
