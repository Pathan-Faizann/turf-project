import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function UserRoute({ children }) {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    // If user is owner, redirect to owner dashboard
    if (user && user.role === "owner") {
      toast.error("🚫 Owners can only access the Owner Dashboard");
      navigate("/owner", { replace: true });
    }
  }, [user, navigate]);

  // If user is not authenticated, still allow (they'll see the page, but won't have full access)
  // This is useful for public pages like Login, Register, Home
  // User route will check role after login
  
  return children;
}

export default UserRoute;
