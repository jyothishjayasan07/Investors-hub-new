import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/authentification/Login";
import Register from "./pages/authentification/Register";
import DashboardInvest from "./pages/authentification/DashboardInvest";
import PublicRoute from "./auth/PublicRoute";
import ProtectedRoute from "./auth/ProtectRoute";
<<<<<<< HEAD
import HomeMain from "./pages/Home/HomeMain";
import Company from "./pages/Company _Dashboard/Company";
import Admindash from "./pages/authentification/Admindash";
import InvestorDashboard from "./pages/Investor/Investordashboard";
import AdminDashboard from "./pages/Admin/AdminDashboard";
=======
import AdminDashboard from "./pages/Admin/AdminDashboard";
import InvestorDashboard from "./pages/Investor/InvestorDashboard";
>>>>>>> e38c8eb0e7fe41b4ab15f58bc521f474c7d2d5fa

function App() {
  return (
    <>
    <Routes>


     <Route path="/login" element={
    <PublicRoute>  
      <Login />
      </PublicRoute>
      }></Route>

        <Route path="/" element={
    <PublicRoute>  
<HomeMain/>
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
      <Company/>
    </ProtectedRoute>
  }
/>

<Route
  path="/superadmin"
  element={
    <ProtectedRoute allowedRoles={["superadmin"]}>
   <AdminDashboard/>
    </ProtectedRoute>
  }
/>

<Route
  path="/investor"
  element={
    <ProtectedRoute allowedRoles={["investor"]}>
      <InvestorDashboard/>
    </ProtectedRoute>
  }
/>


    </Routes>
    
    </>
  );
}

export default App;
