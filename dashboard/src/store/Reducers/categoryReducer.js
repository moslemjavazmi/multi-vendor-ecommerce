//dashboard/src/store/reduces/authReducer.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";
export const categoryAdd = createAsyncThunk(
  "category/categoryAdd",
  async ({ name, image }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const formDate = new FormData();
      formDate.append("name", name);
      formDate.append("image", image);
      const { data } = await api.post("/category-add", formDate, {
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

      // .addCase(categoryAdd.fulfilled, (state, action) => {
      //   const { token } = action.payload;
      //   const { role, userInfo } = getUserFromToken(token);

      //   state.loader = false;
      //   state.successMessage = "ورود با موفقیت انجام شد";
      //   state.token = token;
      //   state.role = role;
      //   state.userInfo = userInfo;
      // })
      .addCase(categoryAdd.rejected, (state, action) => {
        state.loader = false;
        // state.userInfo = action.payload;
        state.errorMessage = "ایمیل یا رمز عبور نادرست است";
      });
  }
});
export const { messageClear } = categoryReducer.actions;
export default categoryReducer.reducer;
