import axios from "axios";

const baseUrl = "http://localhost:3001";
const signUp = (email, username, password, profile) => {
  return new Promise(async (resolve, reject) => {
    const body = {
      username: username,
      email: email,
      password: password,
      role: profile,
    };
    await axios
      .post(`${baseUrl}/register`, body)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const signIn = (email, password) => {
  return new Promise(async (resolve, reject) => {
    const body = {
      email: email,
      password: password,
    };
    await axios
      .post(`${baseUrl}/login`, body)
      .then((res) => {
        console.log(res, "reponse in login");
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
const createUpdateProfile = (userId, profileData) => {
  return new Promise(async (resolve, reject) => {
    await axios
      .put(`${baseUrl}/profile`, { userId, ...profileData })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const getUserById = (userId) => {
  return new Promise(async (resolve, reject) => {
    await axios
      .get(`${baseUrl}/user/${userId}`)

      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export { signUp, signIn, createUpdateProfile, getUserById };
