import { createSlice } from "@reduxjs/toolkit";
export const productSlice = createSlice({ 
  name: "product",
  initialState: {
    Total: 0,
    AllProduct: [],
  },
  reducers: { 
    setTotal: (state, action) => {
      state.Total = action.payload;
    },
    setAllProducts: (state, action) => {
      state.AllProduct = action.payload;
    },
  },
});

export const { setTotal, setAllProducts } = productSlice.actions;
export default productSlice.reducer;
