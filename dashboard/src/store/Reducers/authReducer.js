//dashboard/src/store/reduces/authReducer.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";
import api from "../../api/api";
export const admin_login = createAsyncThunk(
  "auth/admin_login",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post("/admin-login", info, {
        withCredentials: true
      });
      localStorage.setItem("accessToken", data.token);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const seller_login = createAsyncThunk(
  "auth/seller_login",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post("/seller-login", info, {
        withCredentials: true
      });
      // console.log(data);
      localStorage.setItem("accessToken", data.token);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const seller_register = createAsyncThunk(
  "auth/seller_register",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      console.log("info", info);
      const { data } = await api.post("/seller-register", info, {
        withCredentials: true
      });

      // localStorage.setItem("accessToken", data.token);
      // console.log("data", data);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const get_user_info = createAsyncThunk(
  "auth/get_user_info",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get("/get-user", {
        withCredentials: true
      });

      console.log("data in get user data", data);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const profile_image_upload = createAsyncThunk(
  "auth/profile_image_upload",
  async ({ formData, config }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post(
        `/profile-image-upload`,
        formData,
        config
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const profile_info_add = createAsyncThunk(
  "auth/profile_info_add",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post("/profile-info-add", info, {
        withCredentials: true
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
const returnRole = (token) => {
  if (!token) return ""; // اگر توکن وجود نداشت

  try {
    const deCodeToken = jwtDecode(token);
    const expireTime = new Date(deCodeToken.exp * 1000);

    if (new Date() > expireTime) {
      localStorage.removeItem("accessToken");
      return "";
    }

    return deCodeToken.role; // اگر توکن معتبر بود
  } catch (error) {
    return ""; // اگر خطایی در decode رخ داد
  }
};

const getUserFromToken = (token) => {
  if (!token) return { role: "", userInfo: null };

  try {
    const deCodeToken = jwtDecode(token);
    const expireTime = new Date(deCodeToken.exp * 1000);

    if (new Date() > expireTime) {
      localStorage.removeItem("accessToken");
      return { role: "", userInfo: null };
    }

    return {
      role: deCodeToken.role,
      userInfo: {
        id: deCodeToken.id,
        name: deCodeToken.name,
        email: deCodeToken.email
        // سایر اطلاعات کاربر
      }
    };
  } catch (error) {
    return { role: "", userInfo: null };
  }
};
export const authReducer = createSlice({
  name: "auth",
  initialState: {
    successMessage: "",
    errorMessage: "",
    loader: false,
    userInfo: "",
    role: returnRole(localStorage.getItem("accessToken")),
    token: ""
  },
  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = "";
      state.successMessage = "";
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(admin_login.pending, (state, _) => {
        state.loader = true;
        state.errorMessage = "";
        state.successMessage = "";
      })
      // .addCase(admin_login.fulfilled, (state, action) => {
      //   state.loader = false;
      //   state.successMessage = "ورود با موفقیت انجام شد";
      //   state.token = action.payload.token;
      //   state.role = returnRole(action.payload.token);
      // })
      .addCase(admin_login.fulfilled, (state, action) => {
        const { token } = action.payload;
        const { role, userInfo } = getUserFromToken(token);

        state.loader = false;
        state.successMessage = "ورود با موفقیت انجام شد";
        state.token = token;
        state.role = role;
        state.userInfo = userInfo;
      })
      .addCase(admin_login.rejected, (state, action) => {
        state.loader = false;
        state.userInfo = action.payload;
        state.errorMessage = "ایمیل یا رمز عبور نادرست است";
      });
    builder
      .addCase(seller_login.pending, (state, _) => {
        state.loader = true;
        state.errorMessage = "";
        state.successMessage = "";
      })
      // .addCase(seller_login.fulfilled, (state, action) => {
      //   state.loader = false;
      //   state.userInfo = action.payload;
      //   state.successMessage = "ورود با موفقیت انجام شد";
      //   state.token = action.payload.token;
      //   state.role = returnRole(action.payload.token);
      // })
      .addCase(seller_login.fulfilled, (state, action) => {
        const { token } = action.payload;
        const { role, userInfo } = getUserFromToken(token);

        state.loader = false;
        state.successMessage = "ورود با موفقیت انجام شد";
        state.token = token;
        state.role = role;
        state.userInfo = userInfo;
      })
      .addCase(seller_login.rejected, (state, action) => {
        state.loader = false;
        state.userInfo = action.payload;
        state.errorMessage = "ایمیل یا رمز عبور نادرست است";
      });

    builder
      .addCase(seller_register.pending, (state, _) => {
        state.loader = true;
        state.errorMessage = "";
        state.successMessage = "";
      })
      .addCase(seller_register.rejected, (state, action) => {
        state.loader = false;
        state.userInfo = action.payload;
        state.errorMessage = "ایمیل قبلا ثبت شده است";
      })
      .addCase(seller_register.fulfilled, (state, action) => {
        state.loader = false;
        state.userInfo = action.payload;
        state.successMessage = "ثبت نام با موفقیت انجام شد";
      })
      .addCase(get_user_info.pending, (state, _) => {
        state.loader = true;
        state.errorMessage = "";
        state.successMessage = "";
      })
      .addCase(get_user_info.fulfilled, (state, action) => {
        state.loader = false;
        state.userInfo = action.payload.userInfo;
      })

      .addCase(get_user_info.rejected, (state, action) => {
        state.loader = false;
        state.userInfo = "اصلاعات کاربر یافت نشد";
      });
    builder
      .addCase(profile_image_upload.pending, (state) => {
        state.loader = true;
      })
      .addCase(profile_image_upload.fulfilled, (state, action) => {
        state.loader = false;
        state.userInfo = action.payload.userInfo;
        state.successMessage = action.payload.message;
      })
      .addCase(profile_image_upload.rejected, (state, action) => {
        state.loader = false;
        state.errorMessage = action.payload?.error || "خطا در آپلود تصویر";
      })
      .addCase(profile_info_add.fulfilled, (state, action) => {
        state.loader = false;
        state.userInfo = action.payload.userInfo;
        state.successMessage = action.payload.message;
      })
      .addCase(profile_info_add.pending, (state) => {
        state.loader = true;
      })
      .addCase(profile_info_add.rejected, (state, action) => {
        state.loader = false;
        state.errorMessage = action.payload?.error || "خطا در دریافت اطلاعات";
      });
  }
});
export const { messageClear } = authReducer.actions;
export default authReducer.reducer;
