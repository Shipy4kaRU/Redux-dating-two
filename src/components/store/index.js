import { configureStore } from "@reduxjs/toolkit";
import cartSliceReducer from "./cartSlice";

const store = configureStore({
  reducer: {
    cartSlice: cartSliceReducer,
  },
});

export default store;
