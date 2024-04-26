import "./App.css";
import CreateUser from "./components/User/CreateUser";
import { Route, Routes } from "react-router-dom";
import CommonNavBar from "./components/Common/CommonNavBar";
import MainTable from "./components/User/MainTable";

function App() {
  return (
    <div className="App">
      <header className="container">
        <CommonNavBar />
      </header>
      <Routes>
        <Route path="/" element={<MainTable />} />
        <Route path="/create-user" element={<CreateUser />} />
      </Routes>
    </div>
  );
}

export default App;
