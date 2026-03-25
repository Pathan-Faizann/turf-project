import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

function OwnerRoute({ children }) {
  const { user } = useContext(AuthContext);

  // If no user data, redirect to login
  if (!user) {
    return <Navigate to="/login" />;
  }

  // If user exists but is not an owner, redirect to home with error message
  if (user.role !== "owner") {
    toast.error("🚫 Access Denied! Only turf owners can access this page.");
    return <Navigate to="/" />;
  }

  // User is authenticated and is an owner, allow access
  return children;
}

export default OwnerRoute;