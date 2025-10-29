import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Interpreter from "./pages/Interpreter";
import Guide from "./pages/Guide";
import Examples from "./pages/Examples";
import Cours from "./pages/Cours";
import Settings from "./pages/Settings";
import { SettingsProvider } from "./contexts/SettingsContext";
import "./App.css";

function App() {
  return (
    <SettingsProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Interpreter />} />
            <Route path="examples" element={<Examples />} />
            <Route path="cours" element={<Cours />} />
            <Route path="guide" element={<Guide />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </SettingsProvider>
  );
}

export default App;
