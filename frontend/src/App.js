import logo from "./logo.svg";
import "./App.css";
import { Route, BrowserRouter, Routes, Link } from "react-router-dom";

import Fib from "./Fib";
import OtherPage from "./OtherPage";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Fib Calculator</h2>
        </header>
        <div>
          <Routes>
            <Route path="/" element={<Fib />} />
            <Route path="otherpage" element={<OtherPage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
