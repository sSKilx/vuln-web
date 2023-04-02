import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import VulnListing from "./VulnListing";
import VulnCreate from "./VulnCreate";
import VulnDetail from "./VulnDetail";
import VulnEdit from "./VulnEdit";

// Uses BrowserRouter to create routes [/create  /details/:vuln_cve  /edit/:vuln_cve]
function App() {
  return (
    <div className="App">
      <h1>VulnWeb</h1>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<VulnListing />}></Route>
          <Route path="/create" element={<VulnCreate />}></Route>
          <Route path="/details/:vuln_cve" element={<VulnDetail />}></Route>
          <Route path="/edit/:vuln_cve" element={<VulnEdit />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
