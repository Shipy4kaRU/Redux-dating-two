import { createSlice } from "@reduxjs/toolkit";

const initialState = { products: [], productsQuantity: 0 };

const cartSlice = createSlice({
  name: "cartSlice",
  initialState,
  reducers: {
    addProduct(state, action) {
      const newProduct = action.payload;
      const existingProduct = state.products.find(
        (product) => product.id === newProduct.id
      );
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
    // updateCart(state, action) {
    //   state.products = action.payload.products;
    //   state.productsQuantity = action.payload.productsQuantity;
    // },
  },
});

export default cartSlice.reducer;
export const cartSliceActions = cartSlice.actions;
