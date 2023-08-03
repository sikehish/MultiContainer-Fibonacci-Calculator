import logo from "./logo.svg";
import "./App.css";
import { Route, BrowserRouter, Link } from "react-router-dom";

import Fib from "./Fib";
import OtherPage from "./OtherPage";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <Link to="/">Home</Link>
          <Link to="/otherpage">Other Page</Link>
        </header>
        <div>
          <Route path="/" element={<Fib />} />
          <Route path="otherpage" element={<OtherPage />} />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
