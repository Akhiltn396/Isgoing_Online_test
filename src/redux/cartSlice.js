import { createSlice } from "@reduxjs/toolkit";
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],

    quantity: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      console.log(action.payload.product);
      state.products.push(action.payload.product);

      state.quantity += 1;
    },
    removeProducts: (state, action) => {
      const removeItem = state.products.filter(
        (item) => item.id !== action.payload
      );

      state.products = removeItem;
      state.quantity -= 1;
    },
  },
});

export const { addProduct, removeProducts } = cartSlice.actions;

export default cartSlice.reducer;
