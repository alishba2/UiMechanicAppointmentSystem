import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./viewProfile.scss";
import dp from "../../Components/assets/dp1.png";
import camera from "../../Components/assets/camera.png";
import { notifyError, notifySuccess } from "../../utils/helpers";
import { AuthContext } from "../../Components/Context/appContext";

const skillsOptions = [
  "Plumbing",
  "Electrical",
  "Carpentry",
  "Painting",
  "HVAC",
  "Gardening",
  "Bike Repair",
  "Car Repair",
  "Engine Overhaul",
  "Transmission Service",
  "Brake Repair",
  "Other",
];

const timeSlotsOptions = [
  "9 AM - 12 PM",
  "12 PM - 3 PM",
  "3 PM - 6 PM",
  "6 PM - 9 PM",
  "9 PM - 12 AM",
  "12 AM - 3 AM",
  "3 AM - 6 AM",
];

const ViewProfile = () => {
  const { user } = useContext(AuthContext);
  const [dpImage, setDpImage] = useState(null);
  const [formValues, setFormValues] = useState({
    username: "",
    email: "",
    contactNo: "",
    address: "",
    skills: [],
    availableTimeSlots: [],
    hourlyRating: "",
    yrsOfExperience: "",
  });

  useEffect(() => {
    if (user) {
      const parsedSkills = user?.skills ? user?.skills[0]?.split(",") : [];
      const parsedTimeSlots = user?.availableTimeSlots
        ? user?.availableTimeSlots?.split(",")
        : [];

      setFormValues({
        username: user.username || "",
        email: user.email || "",
        contactNo: user.contactNo || "",
        address: user.address || "",
        skills: parsedSkills,
        availableTimeSlots: parsedTimeSlots,
        hourlyRating: user.hourlyRating || "",
        yrsOfExperience: user.yrsOfExperience || "",
      });

      if (user?.profileImage) {
        setDpImage(`http://localhost:3001/${user.profileImage}`);
      } else {
        setDpImage(null);
      }
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, value, checked } = e.target;

    setFormValues((prevValues) => {
      const updatedValues = { ...prevValues };

      if (name === "skills") {
        const currentSkills = Array.isArray(prevValues?.skills)
          ? prevValues.skills
          : [];
        updatedValues.skills = checked
          ? [...currentSkills, value]
          : currentSkills.filter((skill) => skill !== value);
      }

      if (name === "availableTimeSlots") {
        const currentSlots = Array.isArray(prevValues?.availableTimeSlots)
          ? prevValues.availableTimeSlots
          : [];
        updatedValues.availableTimeSlots = checked
          ? [...currentSlots, value]
          : currentSlots.filter((slot) => slot !== value);
      }

      return updatedValues;
    });
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setDpImage(file); // Save the file in state
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userId = user._id;
      const formData = new FormData();

      formData.append("userId", userId);
      formData.append("username", formValues.username);
      formData.append("email", formValues.email);
      formData.append("contactNo", formValues.contactNo);
      formData.append("address", formValues.address);

      if (user.role === "mechanic") {
        formData.append("skills", formValues.skills.join(","));
        formData.append(
          "availableTimeSlots",
          formValues.availableTimeSlots.join(",")
        );
        formData.append("hourlyRating", formValues.hourlyRating);
        formData.append("yrsOfExperience", formValues.yrsOfExperience);
      }

      if (dpImage && dpImage !== user.profileImage) {
        formData.append("profileImage", dpImage);
      }

      await axios.put("http://localhost:3001/profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      notifySuccess("Profile updated successfully", 1000);
    } catch (error) {
      notifyError(error.response?.data?.message || "An error occurred", 1000);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="view-profile-main">
      <h4 className="text-center">Edit Profile</h4>
      <div className="user-id-container d-flex">
        <div className="left">
          <img
            src={
              dpImage
                ? dpImage instanceof File
                  ? URL.createObjectURL(dpImage)
                  : dpImage
                : dp
            }
            alt="Profile"
            className="dp"
            style={{
              borderRadius: "100px",
              border: "3px solid black",
              width: "200px",
              height: "200px",
            }}
          />
          <label htmlFor="file-upload" className="camera-icon cursor-pointer">
            <img
              src={camera}
              alt="Upload"
              style={{ marginLeft: "150px", marginTop: "-100px" }}
            />
          </label>
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleImageUpload}
          />
        </div>
        <div className="right d-flex flex-column">
          <h3 className="fw-bold mt-5 pt-5 mx-4" style={{ color: "green" }}>
            {user.username}
          </h3>
          <p>{user.email}</p>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="bottom mt-5">
        <div className="d-flex gap-2 bottom-inner">
          <input
            type="text"
            name="username"
            placeholder="UserName"
            className="user-input"
            value={formValues.username}
            onChange={handleInputChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="user-input"
            value={formValues.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="d-flex gap-2 bottom-inner">
          <input
            type="text"
            name="contactNo"
            placeholder="Phone Number"
            className="user-input"
            value={formValues.contactNo}
            onChange={handleInputChange}
          />
        </div>
        <div className="d-flex gap-2 bottom-inner mt-2">
          <textarea
            name="address"
            placeholder="Address"
            className="user-input"
            value={formValues.address}
            onChange={handleInputChange}
          ></textarea>
        </div>
        {user.role === "mechanic" && (
          <>
            <div className="d-flex gap-2 bottom-inner mt-2">
              <fieldset>
                <legend>Select Skills</legend>
                {skillsOptions.map((skill) => (
                  <div key={skill}>
                    <input
                      type="checkbox"
                      name="skills"
                      value={skill}
                      checked={formValues?.skills?.includes(skill)}
                      onChange={handleCheckboxChange}
                    />
                    <label>{skill}</label>
                  </div>
                ))}
              </fieldset>
              <fieldset>
                <legend>Select Available Time Slots</legend>
                {timeSlotsOptions.map((slot) => (
                  <div key={slot}>
                    <input
                      type="checkbox"
                      name="availableTimeSlots"
                      value={slot}
                      checked={formValues.availableTimeSlots.includes(slot)}
                      onChange={handleCheckboxChange}
                    />
                    <label>{slot}</label>
                  </div>
                ))}
              </fieldset>
            </div>
            <div className="d-flex gap-2 bottom-inner mt-2">
              <input
                type="number"
                name="hourlyRating"
                placeholder="Hourly Rating"
                className="user-input"
                value={formValues.hourlyRating}
                onChange={handleInputChange}
              />
              <input
                type="number"
                name="yrsOfExperience"
                placeholder="Years of Experience"
                className="user-input"
                value={formValues.yrsOfExperience}
                onChange={handleInputChange}
              />
            </div>
          </>
        )}
        <button type="submit" className="mt-3">
          Save
        </button>
      </form>
    </div>
  );
};

export default ViewProfile;
