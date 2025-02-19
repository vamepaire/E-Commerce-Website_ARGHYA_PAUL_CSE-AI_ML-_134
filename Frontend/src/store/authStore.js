import { configureStore } from "@reduxjs/toolkit";

import userReducer from "../Features/user/userSlice";

const store = configureStore({
  reducer: {
    authUser: userReducer,
  },
});

export default store;
