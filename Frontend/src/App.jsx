import { BrowserRouter, Routes, Route, useLocation, useNavigate } from "react-router-dom";

import { useContext, useEffect, Suspense, lazy } from "react";


import Navbar from "./components/Navbar";
import OwnerLayout from "./layouts/OwnerLayout";
import OwnerRoute from "./components/OwnerRoute";

const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Home = lazy(() => import("./pages/Home"));
const Reviews = lazy(() => import("./pages/Reviews"));
const Explore = lazy(() => import("./pages/Explore"));
const ContactUs = lazy(() => import("./pages/ContactUs"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const Profile = lazy(() => import("./pages/Profile"));
const TurfDetails = lazy(() => import("./pages/TurfDetails"));

const OwnerDashboard = lazy(() => import("./pages/OwnerDashboard"));
const AddTurf = lazy(() => import("./pages/AddTurf"));
const MyTurfs = lazy(() => import("./pages/MyTurfs"));
const TurfBookings = lazy(() => import("./pages/TurfBookings"));
const OwnerBookings = lazy(() => import("./pages/OwnerBookings"));
import { AuthContext } from "./context/AuthContext";
const AdminLayout = lazy(() => import("./admin/AdminLayout"));
const AdminLogin = lazy(() => import("./admin/AdminLogin"));
const AdminDashboard = lazy(() => import("./admin/AdminDashboard"));
const AdminUsers = lazy(() => import("./admin/AdminUsers"));
const AdminTurfs = lazy(() => import("./admin/AdminTurfs"));
const AdminBookings = lazy(() => import("./admin/AdminBookings"));
const AdminContacts = lazy(() => import("./admin/AdminContacts"));
const AdminRoute = lazy(() => import("./admin/AdminRoute"));

function LayoutWrapper() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  // Redirect owner to /owner if they try to access home
  useEffect(() => {
    if (user && user.role === "owner" && location.pathname === "/") {
      navigate("/owner");
    }
  }, [user, location.pathname, navigate]);

  // 👉 Navbar hide for owner & admin routes
  const hideNavbar = location.pathname.startsWith("/owner") || location.pathname.startsWith("/admin");

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Suspense fallback={<div className="h-screen w-full flex items-center justify-center bg-[#020617] text-white font-black uppercase tracking-widest text-sm">LOADING...</div>}>
        <Routes>
          {/* USER ROUTES */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/turf/:id" element={<TurfDetails />} />
          <Route path="/my-bookings" element={<TurfBookings />} />
          <Route path="/admin-login-turf" element={<AdminLogin />} />
          <Route element={<AdminRoute><AdminLayout /></AdminRoute>}>
            <Route path="/admin-dashboard-turf" element={<AdminDashboard />} />
            <Route path="/admin-users-turf" element={<AdminUsers />} />
            <Route path="/admin-turfs-turf" element={<AdminTurfs />} />
            <Route path="/admin-bookings-turf" element={<AdminBookings />} />
            <Route path="/admin-contacts-turf" element={<AdminContacts />} />
          </Route>
          <Route path="*" element={<h1 className="text-white">404 Not Found</h1>} />

          {/* OWNER ROUTES */}
          <Route
            path="/owner"
            element={
              <OwnerRoute>
                <OwnerLayout />
              </OwnerRoute>
            }
          >
            <Route index element={<OwnerDashboard />} />
            <Route path="add" element={<AddTurf />} />
            <Route path="turfs" element={<MyTurfs />} />
            <Route path="bookings" element={<TurfBookings />} />
            <Route path="all-bookings" element={<OwnerBookings />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <LayoutWrapper />
    </BrowserRouter>
  );
}

export default App;