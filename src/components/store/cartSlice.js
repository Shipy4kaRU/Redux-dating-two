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
      state.productsQuantity = state.products.reduce((acc, product) => {
        return acc + product.quantity;
      }, 0);
    },
    deleteProduct(state, action) {
      const idProduct = action.payload;
      const existingProduct = state.products.find(
        (product) => product.id === Number(idProduct)
      );
      existingProduct.quantity--;
      existingProduct.total = existingProduct.total - existingProduct.price;
      if (existingProduct.quantity <= 0) {
        const productIndex = state.products.findIndex(
          (el) => el.id === Number(idProduct)
        );
        state.products.splice(productIndex, 1);
      }
      state.productsQuantity = state.products.reduce((acc, product) => {
        return acc + product.quantity;
      }, 0);
    },
  },
});

export default cartSlice.reducer;
export const cartSliceActions = cartSlice.actions;
