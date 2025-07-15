import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"
import { useContext } from "react";







const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div className="text-center py-10 text-gray-500">Loading...</div>; // or a spinner
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
