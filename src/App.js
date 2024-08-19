import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Landing from "./Components/landing";
import Login from "./Components/login";
import Register from "./Components/Register";
import Profile from "./Components/Profile";
import ContactUs from "./Components/contactus";
import AboutUs from "./Components/AboutUs";
import Topbikes from "./Components/Topbikes";
import Topmechanic from "./Components/Topmechanic";
import Booking from "./Components/Booking";
import Appointment from "./Components/Appointment";
import Appointment1 from "./Components/Appointment1";
import Appointment2 from "./Components/Appointment2";
import Appointment3 from "./Components/Appointment3";
import ServicesPage from "./Components/ServicesPage";
import MechanicService from "./Components/MechanicService";
import UserService from "./Components/UserService";
import FAQS from "./Components/FAQS";
import DashboardUser from "./userdashboard/dashMain/dashmainPage";
import { ToastContainer, toast } from "react-toastify";
import { AuthProvider } from "./Components/Context/appContext";
import MechanicListing from "./userdashboard/dashMain/mechanicListing";
import MechanicDetail from "./userdashboard/dashMain/mechanicDetail";

import CustomerDashboard from "./userdashboard/dashMain/customerDashboard";
import AdminDashboard from "./Components/adminDashboard/dashmain/dashmain";
import Forgetpassword from "./Components/forgetpassword";

function App() {
  return (
    <>
      {" "}
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forget-password" element={<Forgetpassword />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/ServicesPage" element={<ServicesPage />} />
            <Route path="/contactus" element={<ContactUs />} />
            <Route path="/topbikes" element={<Topbikes />} />
            <Route path="/topmechanic" element={<Topmechanic />} />
            <Route path="/appointment" element={<Appointment />} />
            <Route path="/appointment1" element={<Appointment1 />} />
            <Route path="/appointment2" element={<Appointment2 />} />
            <Route path="/appointment3" element={<Appointment3 />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/MechanicService" element={<MechanicService />} />
            <Route path="/UserService" element={<UserService />} />
            <Route path="/faqs" element={<FAQS />} />
            {/* dashboard-User-Routes */}
            <Route path="/dashboard-user" element={<DashboardUser />} />
            <Route path="/mechanics" element={<MechanicListing />} />
            <Route path="/mechanics/:id" element={<MechanicDetail />} />
            <Route path="/customerDashboard" element={<CustomerDashboard />} />
            <Route path="/adminDashboard" element={<AdminDashboard />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
      <ToastContainer />
    </>
  );
}

export default App;
