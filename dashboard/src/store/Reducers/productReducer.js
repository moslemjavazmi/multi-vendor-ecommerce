//dashboard/src/store/reduces/categoryReducer.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";
export const productAdd = createAsyncThunk(
  "product/product-add",
  async (formData, { rejectWithValue, fulfillWithValue }) => {
    console.log("product", formData);
    try {
      const { data } = await api.post("/product-add", formData, {
        withCredentials: true
      });
      console.log("data in  product", data);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const getProducts = createAsyncThunk(
  "product/get_products",
  async (
    { perPage, page, searchValue },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const { data } = await api.get(
        `get-products?page=${page}&&searchValue=${searchValue}&&perPage=${perPage}`,
        {
          withCredentials: true
        }
      );

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const getProduct = createAsyncThunk(
  "product/get_product",
  async (productId, { rejectWithValue, fulfillWithValue, getState }) => {
    const token = getState().auth.token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    try {
      const { data } = await api.get(`get-product/${productId}`, config);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const productReducer = createSlice({
  name: "product",
  initialState: {
    successMessage: "",
    errorMessage: "",
    loader: false,
    products: [],
    product: "",
    totalproduct: 0,
    categories: [] // Initialize as empty array
  },
  reducers: {
    messageClear: (state) => {
      state.errorMessage = "";
      state.successMessage = "";
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(productAdd.pending, (state) => {
        state.loader = true;
        state.errorMessage = "";
        state.successMessage = "";
      })
      .addCase(productAdd.fulfilled, (state, action) => {
        state.loader = false;
        state.successMessage = action.payload.message;
      })
      .addCase(productAdd.rejected, (state, action) => {
        state.loader = false;
        state.errorMessage =
          action.payload?.error || "متاسفانه محصول جدید اضافه نشد";
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loader = false;
        state.products = action.payload.products || [];
        state.totalproduct = action.payload.totalproduct || 0;
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.loader = false;
        state.product = action.payload.product || [];
      });
  }
});
export const { messageClear } = productReducer.actions;
export default productReducer.reducer;
