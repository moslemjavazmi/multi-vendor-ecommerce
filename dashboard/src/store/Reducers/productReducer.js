//dashboard/src/store/reduces/categoryReducer.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";
export const productAdd = createAsyncThunk(
  "product/product-add",
  async (product, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post("/product-add", product, {
        withCredentials: true
      });
      // console.log("data in cate store", data);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const getProduct = createAsyncThunk(
  "product/get-product",
  async (
    { perPage, page, searchValue },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const { data } = await api.get(
        `get-product?page=${page}&&searchValue=${searchValue}&&perPage=${perPage}`,
        {
          withCredentials: true
        }
      );

      console.log("data in get cate store", data);
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
    totalProduct: 0
  },
  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = "";
      state.successMessage = "";
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(productAdd.pending, (state, _) => {
        state.loader = true;
        state.errorMessage = "";
        state.successMessage = "";
      })

      .addCase(productAdd.fulfilled, (state, action) => {
        state.loader = false;
        state.successMessage = "محصول جدید با موفقیت اضافه شد";
        state.categorys = [...state.categorys, action.payload.category];
      })
      .addCase(productAdd.rejected, (state, action) => {
        state.loader = false;
        state.errorMessage = "اضافه کردن محصول جدید با خطا مواجه شد";
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.loader = false;
        state.categorys = action.payload.categorys;
        state.totalCategory = action.payload.totalCategory;
      });
  }
});
export const { messageClear } = productReducer.actions;
export default productReducer.reducer;
