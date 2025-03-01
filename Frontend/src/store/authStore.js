import { configureStore } from "@reduxjs/toolkit";

import userReducer from "../Features/user/userSlice";
import ownerReducer from "../Features/Seller/sellerSlice";

const store = configureStore({
  reducer: {
    authUser: userReducer,
    authOwner: ownerReducer,
  },
});

export default store;
