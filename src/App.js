import "./App.css";
import CreateUser from "./components/User/CreateUser";
import { Route, Routes } from "react-router-dom";
import CommonNavBar, { NavBar } from "./components/Common/CommonNavBar";
import MainTable from "./components/User/MainTable";
import Game from "./components/Sandbox/Game";
import Product from "./components/Sandbox/Product";
import Caravaggio from "./components/Sandbox/Caravaggio";
import Profile from "./components/Profile/Profile";

function App() {
  return (
    <div className="App">
      <CommonNavBar />
      <Routes>
        <Route path="/" element={<Profile />} />
        <Route path="/employees" element={<MainTable />} />
        <Route path="/create-user" element={<CreateUser />} />
        <Route path="/game" element={<Game />} />
        <Route path="/product" element={<Product />} />
        <Route path="/caravaggio" element={<Caravaggio />} />
      </Routes>
    </div>
  );
}

export default App;
