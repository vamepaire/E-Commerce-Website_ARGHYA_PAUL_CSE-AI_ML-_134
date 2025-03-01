import axios from "axios";
import {
  loginStart,
  loginSuccess,
  loginFailure,
  registerStart,
  registerSuccess,
  registerFailure,
  logout,
  clearPopUp,
} from "./userSlice";

const API_URL = "http://localhost:3000/users";

export const registerUser = (userData) => async (dispatch) => {
  try {
    dispatch(registerStart());
    const response = await axios.post(`${API_URL}/register`, {
      User_name: `${userData.firstname}_${userData.lastname}`,
      email: userData.email,
      password: userData.password,
    });

    dispatch(registerSuccess(response.data));
  } catch (error) {
    dispatch(
      registerFailure(error.response?.data?.message || "Registration failed")
    );
  }
  setTimeout(() => {
    dispatch(clearPopUp());
  }, 2000);
};

export const loginUser = (credentials) => async (dispatch) => {
  try {
    dispatch(loginStart());
    const response = await axios.post(`${API_URL}/login`, credentials);
    dispatch(loginSuccess(response.data));
  } catch (error) {
    console.log(error.response?.data?.message);

    dispatch(loginFailure(error.response?.data?.errors || "Login failed"));
  }
  // setTimeout(() => {
  //   dispatch(clearPopUp());
  // }, 2000);
};

export const logoutUser = () => async (dispatch) => {
  try {
    await axios.post(`${API_URL}/logout`);
    dispatch(logout());
  } catch (error) {
    console.error("Logout error:", error);
  }
};
