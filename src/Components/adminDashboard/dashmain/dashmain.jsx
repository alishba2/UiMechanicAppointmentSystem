import React, { useState } from "react";
import "../../../userdashboard/dashMain/dashmain.scss";
import img2 from "../../../images/bike.jpg";
import Mechanics from "../mechanics/mechanics";
import Users from "../users/users";
import { useNavigate, useLocation } from "react-router-dom";

const DashMain = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [activeComponent, setActiveComponent] = useState("Users");

  return (
    <>
      <div className="dashboard-user-main d-flex">
        <div className="left-div d-flex flex-column">
          <img src={img2} alt="Logo" className="logo" />
          <h5 className="text-center mt-3">ADMIN</h5>
          <div className="d-flex flex-column gap-2">
            <h5
              className={`mt-5 ${activeComponent === "Users" ? "active" : ""}`}
              onClick={() => setActiveComponent("Users")}
            >
              All Users
            </h5>
            <h5
              className={`${activeComponent === "Mechanics" ? "active" : ""}`}
              onClick={() => setActiveComponent("Mechanics")}
            >
              All Mechanics
            </h5>
            <h5 onClick={() => navigate("/")}>Logout</h5>
          </div>
        </div>
        <div className="right-div">
          {activeComponent === "Users" && <Users />}
          {activeComponent === "Mechanics" && <Mechanics />}
        </div>
      </div>
    </>
  );
};

export default DashMain;
