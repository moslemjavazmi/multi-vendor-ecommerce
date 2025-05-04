//src/store/Reducers/authReducer.js
// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// export const authReducer = createSlice({
//   name: "auth",
//   initialState: {
//     successMessage: "",
//     errorMessage: "",
//     loader: false,
//     userInfo: "",
//   },
//   reducers: {},
//   extraReducers: {},
// });
// export default authReducer.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

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
    // Add your reducer cases here using builder syntax
    // Example:
    // builder.addCase(someAsyncAction.pending, (state) => {
    //   state.loader = true
    // })
  },
});

export default authReducer.reducer;
