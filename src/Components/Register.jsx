import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Toaster } from "react-hot-toast";

import { useFormik } from "formik";
import { Dropdown } from "bootstrap";
import { signUp } from "../Api/api";
import { useNavigate } from "react-router-dom";
import { notifySuccess, notifyError } from "../utils/helpers";

export default function Register() {
  const navigate = useNavigate();
  const [file, setFile] = useState();
  const [selectedRole, setSelectedRole] = useState("mechanic"); // Default role
  const handleRoleChange = (e) => {
    setSelectedRole(e.target.value);
    console.log(e.target.value);
    setFile(e.target.value);
  };
  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
      password: "",
    },
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      values = { ...values, role: selectedRole }; // Add the role to the form values
      console.log(values);
      signUp(values.email, values.username, values.password, values.role)
        .then((res) => {
          notifySuccess("Signed up successfully", 1000);
          navigate("/login");
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
          notifyError(err.response.data.message, 1000);
        });
    },
  });

  const onUpload = async (e) => {
    alert("uploaded");
  };

  const glassStyle = {
    background: "linear-gradient(green, white)",
    borderRadius: "16px",
    boxShadow: "0 4px 30px #3b39390b",
    backdropFilter: "blur(7.1px)",
    border: "1px solid rgba(255, 255, 255, 0.3)",
    border:
      "4 border-gray-50 shrink-0 h-3/4 w-[30%] rounded-3xl py-20 px-20 px-7 min-w-max",
  };

  const textboxStyle = {
    borderRadius: "9px",
    backgroundColor: "lightgreen",
    width: "300px",
    marginLeft: "auto",
    marginRight: "auto",
    textAlign: "center",
    border: "none",
    height: "45px",
  };

  const btnStyle = {
    alignItems: "center",
    appearance: "none",
    backgroundColor: "#FCFCFD",
    borderRadius: "4px",
    borderWidth: "0",
    boxShadow:
      "rgba(45, 35, 66, 0.4) 0 2px 4px, rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #D6D6E7 0 -3px 0 inset",
    boxSizing: "border-box",
    color: "#36395A",
    cursor: "pointer",
    display: "inline-flex",
    fontFamily: '"JetBrains Mono", monospace',
    height: "40px",
    justifyContent: "center",
    lineHeight: "1",
    listStyle: "none",
    overflow: "hidden",
    paddingLeft: "120px",
    paddingRight: "120px",
    position: "relative",
    textAlign: "left",
    textDecoration: "none",
    transition: "box-shadow 0.15s, transform 0.15s",
    userSelect: "none",
    WebkitUserSelect: "none",
    touchAction: "manipulation",
    whiteSpace: "nowrap",
    willChange: "box-shadow, transform",
    fontSize: "18px",
  };

  // Define the hover and focus styles separately
  const hoverStyle = {
    boxShadow:
      "rgba(45, 35, 66, 0.4) 0 4px 8px, rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #D6D6E7 0 -3px 0 inset",
    transform: "translateY(-2px)",
  };

  const focusStyle = {
    boxShadow:
      "#D6D6E7 0 0 0 1.5px inset, rgba(45, 35, 66, 0.4) 0 2px 4px, rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #D6D6E7 0 -3px 0 inset",
  };

  const activeStyle = {
    boxShadow: "#D6D6E7 0 3px 7px inset",
    transform: "translateY(2px)",
  };

  return (
    <div
      className="container mx-auto"
      styleName={{
        marginTop: "3%",
        height: "770px",
        width: "600px",
        border: "5px solid transparent",
        borderRadius: "15px",
        boxShadow: "0 0 40px green, 0 0 15px black inset",
        background: "white",
      }}
    >
      <Toaster position="top-center" reverseOrder={false} />

      <div className="flex justify-center items-center h-screen">
        <div styleName={{ width: "45%" }}>
          <div className="tittle flex flex-col items-center">
            <span className="py-4 text-xl w-2/3 text-center text-gray-5">
              Happy to join you
            </span>
          </div>
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
            className="py-5"
            onSubmit={formik.handleSubmit}
          >
            <h4
              style={{ padding: "0px 10px 15px 10px", textAlign: "center" }}
              className="text-5xl font-bold text-green-500"
            >
              Register Here!
            </h4>
            <div
              className="text-box flex flex-col items-center gap-6"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                rowGap: "20px",
              }}
            >
              <input
                {...formik.getFieldProps("email")}
                style={textboxStyle}
                type="text"
                placeholder="Email"
              />
              <input
                {...formik.getFieldProps("username")}
                style={textboxStyle}
                type="text"
                placeholder="Username"
              />
              <input
                {...formik.getFieldProps("password")}
                style={textboxStyle}
                type="text"
                placeholder="Password"
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <label htmlFor="role">Select Role:</label>
                <select
                  id="role"
                  name="role"
                  value={selectedRole}
                  onChange={handleRoleChange}
                  style={{ ...textboxStyle, height: "auto", padding: "8px" }}
                >
                  <option value="mechanic">Mechanic</option>
                  <option value="customer">Customer</option>
                </select>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignSelf: "center",
                }}
              >
                <button style={btnStyle}>Submit</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
