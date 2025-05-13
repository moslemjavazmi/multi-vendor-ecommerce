// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import api from "../../api/api";
// export const admin_login = createAsyncThunk(
//   "auth/admin_login",
//   async (info) => {
//     console.log(info);
//     try {
//       const { data } = await api.post("admin-login", info, {
//         withCredentials: true,
//       });
//       console.log(data);
//     } catch (error) {
//       console.log(error.response.data);
//     }
//   }
// );
// export const authReducer = createSlice({
//   name: "auth",
//   initialState: {
//     successMessage: "",
//     errorMessage: "",
//     loader: false,
//     userInfo: "",
//   },
//   reducers: {},
//   // extraReducers: (builder) => {
//   // Add your reducer cases here using builder syntax
//   // Example:
//   // builder.addCase(someAsyncAction.pending, (state) => {
//   //   state.loader = true;
//   // });
//   // },
//   extraReducers: (builder) => {
//     builder
//       .addCase(admin_login.pending, (state) => {
//         state.loader = true;
//         state.errorMessage = "";
//         state.successMessage = "";
//       })
//       .addCase(admin_login.fulfilled, (state, action) => {
//         state.loader = false;
//         state.userInfo = action.payload;
//         state.successMessage = "Login successful";
//       })
//       .addCase(admin_login.rejected, (state, action) => {
//         state.loader = false;
//         state.errorMessage = action.payload?.message || "Login failed";
//       });
//   },
// });
// export default authReducer.reducer;

// deeps help code

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

export const admin_login = createAsyncThunk(
  "auth/admin_login",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post("admin-login", info, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const authReducer = createSlice({
  name: "auth",
  initialState: {
    successMessage: "",
    errorMessage: "",
    loader: false,
    userInfo: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(admin_login.pending, (state) => {
        state.loader = true;
        state.errorMessage = "";
        state.successMessage = "";
      })
      .addCase(admin_login.fulfilled, (state, action) => {
        state.loader = false;
        state.userInfo = action.payload;
        state.successMessage = "Login successful";
      })
      .addCase(admin_login.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error;
      });
  },
});

export default authReducer.reducer;
