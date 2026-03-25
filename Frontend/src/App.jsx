import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Reviews from "./pages/Reviews";
import Explore from "./pages/Explore";
import ForgotPassword from "./pages/ForgotPassword";
import Navbar from "./components/Navbar";
import Profile from "./pages/Profile";

import OwnerDashboard from "./pages/OwnerDashboard";
import AddTurf from "./pages/AddTurf";
import MyTurfs from "./pages/MyTurfs";
import TurfBookings from "./pages/TurfBookings";
import OwnerBookings from "./pages/OwnerBookings";

import OwnerLayout from "./layouts/OwnerLayout";
import OwnerRoute from "./components/OwnerRoute";
import TurfDetails from "./pages/TurfDetails";

function LayoutWrapper() {
  const location = useLocation();

  // 👉 Navbar hide for owner routes
  const hideNavbar = location.pathname.startsWith("/owner");

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        {/* USER ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/turf/:id" element={<TurfDetails />} />
        <Route path="/my-bookings" element={<TurfBookings />} />
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
        </Route>
      </Routes>
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