import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/authentification/Login";
import Register from "./pages/authentification/Register";
import Dashboard from "./pages/authentification/Dashboard";
import DashboardInvest from "./pages/authentification/DashboardInvest";
import PublicRoute from "./auth/PublicRoute";
import ProtectedRoute from "./auth/ProtectRoute";

function App() {
  return (
    <>
    <Routes>


     <Route path="/" element={
    <PublicRoute>  
      <Login />
      </PublicRoute>
      }></Route>

     <Route path="/register" element={
     <PublicRoute> 
      <Register />
      </PublicRoute>
      }></Route>



          <Route
  path="/company"
  element={
    <ProtectedRoute allowedRoles={["company"]}>
      <Dashboard />
    </ProtectedRoute>
  }
/>

<Route
  path="/investor"
  element={
    <ProtectedRoute allowedRoles={["investor"]}>
      <DashboardInvest />
    </ProtectedRoute>
  }
/>


    </Routes>
    </>
  );
}

export default App;
