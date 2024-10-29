import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  statusBarMessage: false,
  requestStatus: "",
  requestTitle: "",
  requestMessage: "",
};

const CartRequestSlice = createSlice({
  name: "CartRequestSlice",
  initialState,
  reducers: {
    showMessageRequest(state, action) {
      state.statusBarMessage = true;
      state.requestStatus = action.payload.requestStatus;
      state.requestTitle = action.payload.requestTitle;
      state.requestMessage = action.payload.requestMessage;
    },
    deleteMessageRequest(state) {
      state.statusBarMessage = false;
      state.requestStatus = "";
      state.requestTitle = "";
      state.requestMessage = "";
    },
  },
});

export const CartRequestSliceActions = CartRequestSlice.actions;
export default CartRequestSlice.reducer;
