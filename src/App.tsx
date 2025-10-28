import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Interpreter from "./pages/Interpreter";
import Guide from "./pages/Guide";
import Examples from "./pages/Examples";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Interpreter />} />
          <Route path="examples" element={<Examples />} />
          <Route path="guide" element={<Guide />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
