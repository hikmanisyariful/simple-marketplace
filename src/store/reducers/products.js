import { createSlice } from "@reduxjs/toolkit";
import { fetchAllProduct } from "../actions/products";

const initialState = {
  data: null,
  loading: false,
  isError: false,
};

const products = createSlice({
  name: "products",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProduct.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchAllProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.isError = false;
        state.data = action.payload;
      })
      .addCase(fetchAllProduct.rejected, (state, action) => {
        state.loading = false;
        state.isError = true;
      });
  },
});

export default products.reducer;
