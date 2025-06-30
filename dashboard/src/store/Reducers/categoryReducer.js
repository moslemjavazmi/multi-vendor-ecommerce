//dashboard/src/store/reduces/categoryReducer.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";
export const categoryAdd = createAsyncThunk(
  "category/categoryAdd",
  async ({ name, image }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("image", image);
      const { data } = await api.post("/category-add", formData, {
        withCredentials: true
      });
      console.log("data in cate store", data);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const categoryReducer = createSlice({
  name: "category",
  initialState: {
    successMessage: "",
    errorMessage: "",
    loader: false,
    categorys: []
  },
  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = "";
      state.successMessage = "";
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(categoryAdd.pending, (state, _) => {
        state.loader = true;
        state.errorMessage = "";
        state.successMessage = "";
      })

      .addCase(categoryAdd.fulfilled, (state, action) => {
        state.loader = false;
        state.successMessage = "دسته بندی با موفقیت اضافه ش";
        state.categorys = [...state.categorys, action.payload.category];
      })
      .addCase(categoryAdd.rejected, (state, action) => {
        state.loader = false;
        // state.userInfo = action.payload;
        state.errorMessage = "ایمیل یا رمز عبور نادرست است";
      });
  }
});
export const { messageClear } = categoryReducer.actions;
export default categoryReducer.reducer;
