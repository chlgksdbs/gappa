
import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authslice";



const store = configureStore({
  reducer: {
    auth: authSlice,
  },
});

// export const counterActions = counterSlice.actions;

export default store;