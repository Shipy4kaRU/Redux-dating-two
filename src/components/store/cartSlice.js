import { createSlice } from "@reduxjs/toolkit";
import { CartRequestSliceActions } from "./CartRequestSlice";

const initialState = {
  products: [],
  productsQuantity: 0,
  isUpdatedContent: false,
};

const cartSlice = createSlice({
  name: "cartSlice",
  initialState,
  reducers: {
    addProduct(state, action) {
      const newProduct = action.payload;
      const existingProduct = state.products.find(
        (product) => product.id === newProduct.id
      );
      state.isUpdatedContent = true;
      if (existingProduct) {
        existingProduct.quantity++;
        existingProduct.total = existingProduct.total + existingProduct.price;
      }
      if (!existingProduct) {
        state.products.push({
          ...newProduct,
          quantity: 1,
          total: newProduct.price,
        });
      }
      state.productsQuantity++;
    },
    deleteProduct(state, action) {
      const idProduct = action.payload;
      const existingProduct = state.products.find(
        (product) => product.id === Number(idProduct)
      );
      state.isUpdatedContent = true;
      if (existingProduct.quantity === 1) {
        state.products = state.products.filter(
          (el) => el.id !== Number(idProduct)
        );
      } else {
        existingProduct.quantity--;
        existingProduct.total = existingProduct.total - existingProduct.price;
      }
      state.productsQuantity--;
    },
    updateCart(state, action) {
      state.products = action.payload.products;
      state.productsQuantity = action.payload.productsQuantity;
    },
  },
});

let deleteStatusBar;
let isStatusBarDeleting = false;

export const getCartData = () => {
  return async (dispatchAction) => {
    dispatchAction(
      CartRequestSliceActions.showMessageRequest({
        requestStatus: "pending",
        requestTitle: "Извлечение данных.",
        requestMessage: "Данные корзины извлекаются с сервера...",
      })
    );
    const getDataRequest = async () => {
      const response = await fetch(
        "https://sushiapp-3c0b7-default-rtdb.firebaseio.com/cart.json"
      );
      if (!response.ok) {
        throw new Error("Невозможно считать данные");
      }
      return await response.json();
    };
    try {
      const responseData = await getDataRequest();
      dispatchAction(
        cartSliceActions.updateCart({
          products: responseData.products || [],
          productsQuantity: responseData.productsQuantity || 0,
        })
      );
      dispatchAction(
        CartRequestSliceActions.showMessageRequest({
          requestStatus: "success",
          requestTitle: "Успешно!",
          requestMessage: "Данные корзины были успешно извлечены!",
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
          requestMessage: "Произошла ошибка при извлечении данных корзины!",
        })
      );
      console.error(`Произошла ошибка: ${err.message}`);
    }
  };
};

export default cartSlice.reducer;
export const cartSliceActions = cartSlice.actions;
