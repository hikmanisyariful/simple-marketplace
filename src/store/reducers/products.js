import { createSlice } from "@reduxjs/toolkit";
import { fetchAllProduct } from "../actions/products";

const initialState = {
  data: null,
  loading: false,
  isError: false,
  dataSearch: null,
  valueSearch: "",
};

const products = createSlice({
  name: "products",
  initialState,
  reducers: {
    setValueSearch(state, action) {
      state.valueSearch = action.payload;
    },
    searchProducts(state, action) {
      const products = state.data;
      const searchProducts = products.filter((item) => item.name === action.payload || item.sku === action.payload);
      state.dataSearch = searchProducts;
    },
    resetDataSearch(state, action) {
      state.dataSearch = null;
    },
  },
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

export const { searchProducts, setValueSearch, resetDataSearch } = products.actions;
export default products.reducer;
