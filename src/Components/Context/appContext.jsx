import React, { createContext, useState, useEffect } from "react";
import { getUserById } from "../../Api/api"; // Adjust the import path as needed

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      fetchUser(userId);
    }
  }, []);

  const fetchUser = async (userId) => {
    try {
      const response = await getUserById(userId);
      if (response && response.data) {
        setUser(response.data.user); // Adjust to match the response format
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error("Failed to fetch user:", error);
    }
  };


  useEffect(() => {
    console.log(user, "user data");
    console.log(isLoggedIn, "isLoggedIn");

  }, [user, isLoggedIn])
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("role", userData.role);
    localStorage.setItem("userId", userData.id);
    setIsLoggedIn(true);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("userId");
    localStorage.removeItem("role");
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
