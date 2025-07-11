import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/authentification/Login";
import Register from "./pages/authentification/Register";
import Dashboard from "./pages/authentification/Dashboard";
import DashboardInvest from "./pages/authentification/DashboardInvest";

function App() {
  return (
    <>
    <Routes>
     <Route path="login" element={<Login />}></Route>
     <Route path="/" element={<Register />}></Route>
          <Route path="/company" element={<Dashboard />}></Route>
             <Route path="/invest" element={<DashboardInvest />}></Route>

    </Routes>
    </>
  );
}

export default App;
