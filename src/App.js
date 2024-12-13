import "./App.css";
import CreateUser from "./components/User/CreateUser";
import { Route, Routes } from "react-router-dom";
import CommonNavBar from "./components/Common/CommonNavBar";
import MainTable from "./components/User/MainTable";
import Game from "./components/Sandbox/Game";
import Product from "./components/Sandbox/Product";

function App() {
  return (
    <div className="App">
      <header className="container">
        <CommonNavBar />
      </header>
      <Routes>
        <Route path="/" element={<MainTable />} />
        <Route path="/create-user" element={<CreateUser />} />
        <Route path="/game" element={<Game />} />
        <Route path="/product" element={<Product />} />
      </Routes>
    </div>
  );
}

export default App;
