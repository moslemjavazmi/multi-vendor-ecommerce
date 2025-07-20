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
      console.log("data in pro reducer", data);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// export const getProduct = createAsyncThunk(
//   "product/get_product",
//   async (productId, { rejectWithValue, fulfillWithValue }) => {
//     // const token = getState().auth.token;
//     // const config = {
//     //   headers: {
//     //     Authorization: `Bearer ${token}`
//     //   }
//     // };
//     console.log("productId in reducer", productId);
//     try {
//       const { data } = await api.get(`product-get/${productId}`);
//       return fulfillWithValue(data);
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );
export const get_product = createAsyncThunk(
  "product/get_product",
  async (ProductId, { rejectWithValue, fulfillWithValue }) => {
    // const token = getState().auth.token;
    // const config = {
    //   headers: {
    //     Authorization: `Bearer ${token}`
    //   }
    // };
    try {
      const { data } = await api.get(`/product-get/${ProductId}`, {
        withCredentials: true
      });
      console.log("data in get pro test", data);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const update_product = createAsyncThunk(
  "product/update_product",
  async (product, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post(`/product-update`, product, {
        withCredentials: true
      });
      console.log("data in update reducer ", data);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const product_image_update = createAsyncThunk(
  "product/product_update_image",
  async (
    { oldImage, newImage, productId },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const formData = new FormData();
      formData.append("oldImage", oldImage);
      formData.append("newImage", newImage);
      formData.append("productId", productId);
      const { data } = await api.post(`/product-update-image`, formData, {
        withCredentials: true
      });
      console.log("data in update reducer ", data);
      return fulfillWithValue(data);
    } catch (error) {}
  }
);
export const product_add_images = createAsyncThunk(
  "product/product_add_images",
  async (formData, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post("/product-add-images", formData, {
        withCredentials: true
      });
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
      .addCase(get_product.fulfilled, (state, action) => {
        state.loader = false;
        state.product = action.payload.product;
      })
      .addCase(update_product.pending, (state, _) => {
        state.loader = true;
        state.errorMessage = "";
        state.successMessage = "";
      })
      .addCase(update_product.rejected, (state, action) => {
        state.loader = false;
        state.errorMessage = "بروز رسانی محصول با خطا مواجه شد";
      })
      .addCase(update_product.fulfilled, (state, action) => {
        state.loader = false;
        state.product = action.payload.product;
      })
      .addCase(product_image_update.fulfilled, (state, action) => {
        state.loader = false;
        // state.message = action.payload.message;
      })
      .addCase(product_add_images.pending, (state) => {
        state.loader = true;
      })
      .addCase(product_add_images.fulfilled, (state, action) => {
        state.loader = false;
        state.successMessage = action.payload.message;
      })
      .addCase(product_add_images.rejected, (state, action) => {
        state.loader = false;
        state.errorMessage = action.payload?.error || "خطا در افزودن تصاویر";
      });
  }
});
export const { messageClear } = productReducer.actions;
export default productReducer.reducer;
