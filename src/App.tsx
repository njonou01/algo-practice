import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import ErrorBoundary from "./components/ErrorBoundary";
import Layout from "./components/Layout";
import { SettingsProvider } from "./contexts/SettingsContext";
import Cours from "./pages/Cours";
import Examples from "./pages/Examples";
import Guide from "./pages/Guide";
import CodeEditor from "./pages/CodeEditor";
import Settings from "./pages/Settings";

function App() {
  return (
    <ErrorBoundary>
      <SettingsProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<CodeEditor />} />
              <Route path="examples" element={<Examples />} />
              <Route path="cours" element={<Cours />} />
              <Route path="guide" element={<Guide />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </SettingsProvider>
    </ErrorBoundary>
  );
}

export default App;
