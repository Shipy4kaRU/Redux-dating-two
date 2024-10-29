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

let deleteStatusBar;
let isStatusBarDeleting = false;

export const sendCartData = (cartData) => {
  return async (dispatchAction) => {
    dispatchAction(
      CartRequestSliceActions.showMessageRequest({
        requestStatus: "pending",
        requestTitle: "Отправка данных.",
        requestMessage: "Данные корзины отправляются на сервер...",
      })
    );
    const sendHttpRequest = async () => {
      const response = await fetch(
        "https://sushiapp-3c0b7-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify(cartData),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Ошибка при отправке данных корзины");
      }
    };

    try {
      await sendHttpRequest();
      dispatchAction(
        CartRequestSliceActions.showMessageRequest({
          requestStatus: "success",
          requestTitle: "Успешно!",
          requestMessage: "Товар был успешно добавлен в корзину!",
        })
      );
      if (isStatusBarDeleting) {
        clearTimeout(deleteStatusBar);
      }
      deleteStatusBar = setTimeout(() => {
        dispatchAction(CartRequestSliceActions.deleteMessageRequest());
        isStatusBarDeleting = true;
      }, 1500);
    } catch (err) {
      dispatchAction(
        CartRequestSliceActions.showMessageRequest({
          requestStatus: "error",
          requestTitle: "Неудача!",
          requestMessage: "Произошла ошибка при добавлении товара в корзину!",
        })
      );
      console.error(`Произошла ошибка: ${err.message}`);
    }
  };
};

export const CartRequestSliceActions = CartRequestSlice.actions;
export default CartRequestSlice.reducer;
