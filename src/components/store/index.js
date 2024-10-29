import { configureStore } from "@reduxjs/toolkit";
import cartSliceReducer from "./cartSlice";
import CartRequestSliceReducer from "./CartRequestSlice";

const store = configureStore({
  reducer: {
    cartSlice: cartSliceReducer,
    cartRequestSlice: CartRequestSliceReducer,
  },
});

export default store;
