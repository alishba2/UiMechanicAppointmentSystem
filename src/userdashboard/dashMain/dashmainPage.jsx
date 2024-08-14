import React, { useState, useContext } from "react";
import "./dashmain.scss";
import img2 from "../../images/bike.jpg";
import EditProfile from "../viewProfile/viewProfile";
import SetAppointment from "../Appointment/appointment";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../Components/Context/appContext";

const DashmainPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useContext(AuthContext);


  const [activeComponent, setActiveComponent] = useState("EditProfile");

  return (
    <>
      <div className="dashboard-user-main d-flex">
        <div className="left-div d-flex flex-column">
          <img src={img2} alt="Logo" className="logo" />
          <div className="d-flex flex-column gap-2">
            <h5
              className={`mt-5 ${activeComponent === "EditProfile" ? "active" : ""}`}
              onClick={() => setActiveComponent("EditProfile")}
            >
              Edit Profile
            </h5>
            <h5
              className={`${activeComponent === "SetAppointment" ? "active" : ""}`}
              onClick={() => setActiveComponent("SetAppointment")}
            >
              View Appointment
            </h5>
            <h5 onClick={() => navigate("/")}>Logout</h5>
          </div>
        </div>
        <div className="right-div">
          {activeComponent === "EditProfile" && <EditProfile user={user} />}
          {activeComponent === "SetAppointment" && <SetAppointment user={user} />}
        </div>
      </div>
    </>
  );
};

export default DashmainPage;
