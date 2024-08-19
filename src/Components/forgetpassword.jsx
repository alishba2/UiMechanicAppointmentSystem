import React, { useState, useContext } from "react";
import { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { notifyError, notifySuccess } from "../utils/helpers";
import { AuthContext } from "./Context/appContext";

const Forgetpassword = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        // Send request to the forgot-password API
        const response = await fetch("http://localhost:3001/forgot-password", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: values.email }),
        });

        const data = await response.json();

        if (response.ok) {
          notifySuccess("Password reset email sent successfully", 1000);
          navigate("/login");
        } else {
          notifyError(data.message || "Something went wrong", 1000);
        }
      } catch (error) {
        notifyError("Failed to send password reset email", 1000);
      } finally {
        setLoading(false);
      }
    },
  });

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
    color: "#36395A",
    cursor: "pointer",
    fontFamily: '"JetBrains Mono", monospace',
    height: "40px",
    paddingLeft: "120px",
    paddingRight: "120px",
    fontSize: "18px",
    transition: "box-shadow 0.15s, transform 0.15s",
  };

  const handleSignInClick = () => {
    navigate("/login");
  };

  return (
    <div
      className="container mx-auto"
      style={{
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
        <div style={{ width: "45%" }}>
          <div className="title flex flex-col items-center">
            <span className="py-4 text-xl w-2/3 text-center text-gray-5">
              Happy to join you
            </span>
          </div>
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              backgroundColor: "#2f3f1e14",
            }}
            className="py-5"
            onSubmit={formik.handleSubmit}
          >
            <h4
              style={{ padding: "0px 10px 15px 10px", textAlign: "center" }}
              className="text-5xl font-bold text-green-500"
            >
              Forget Password
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
                type="email"
                placeholder="Enter your email"
                required
              />
              <span
                style={{ cursor: "pointer" }}
                onClick={handleSignInClick}
              >
                Sign in
              </span>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignSelf: "center",
                }}
              >
                <button style={btnStyle} type="submit" disabled={loading}>
                  {loading ? "Sending..." : "Submit"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Forgetpassword;
