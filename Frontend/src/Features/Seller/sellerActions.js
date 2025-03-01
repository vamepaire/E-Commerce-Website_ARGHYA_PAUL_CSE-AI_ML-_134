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
} from "./sellerSlice";

const API_URL = "http://localhost:3000/owners";

export const registerOwner = (ownerData) => async (dispatch) => {
  try {
    console.log(ownerData);

    dispatch(registerStart());
    const response = await axios.post(`${API_URL}/register`, {
      User_name: ownerData.User_name,
      email: ownerData.email,
      password: ownerData.password,
      Shop_name: ownerData.Shop_name,
      address: ownerData.address,
      gstIn: ownerData.gstIn,
    });

    dispatch(registerSuccess(response.data));
  } catch (error) {
    dispatch(
      registerFailure(error.response?.data?.message || "Registration failed")
    );
  }
  setTimeout(() => {
    dispatch(clearPopUp());
  }, 3000);
};
