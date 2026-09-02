import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainScreen from "./tabs/MainScreen/mainScreen";
import TrainScreen from "./tabs/trains/trainScreen";
import TopBar from "./components/TopBar";
import HSDScreen from "./tabs/trains/destinations/hsd/hsdScreen";
// weitere Tabs importieren

function App() {
  return (
    <BrowserRouter>
      <TopBar />
      <Routes>
        <Route path="/" element={<MainScreen />} />
        <Route path="/trains" element={<TrainScreen />} />
        <Route path="/trains/hbf" element={<TrainScreen />} />
        <Route path="/trains/hsd" element={<HSDScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
