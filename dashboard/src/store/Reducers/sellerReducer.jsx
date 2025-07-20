//dashboard/src/store/reduces/categoryReducer.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../api/api";

export const get_seller_request = createAsyncThunk(
  "seller/get_seller_request",
  async (
    { perPage, page, searchValue },
    { rejectWithValue, fulfillWithValue, getState }
  ) => {
    // const token = getState().auth.token;
    // const config = {
    //   headers: {
    //     Authorization: `Bearer ${token}`
    //   }
    // };
    try {
      const { data } = await api.get(
        `/request-seller-get?page=${page}&&searchValue=${searchValue}&&perPage=${perPage}`,
        { withCredentials: true }
      );
      console.log("data", data);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const get_seller = createAsyncThunk(
  "seller/get_seller",
  async (sellerId, { rejectWithValue, fulfillWithValue, getState }) => {
    try {
      const { data } = await api.get(`/get-seller/${sellerId}`, {
        withCredentials: true
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const seller_status_update = createAsyncThunk(
  "seller/seller_status_update",
  async (info, { rejectWithValue, fulfillWithValue, getState }) => {
    // const token = getState().auth.token;
    // const config = {
    //   headers: {
    //     Authorization: `Bearer ${token}`
    //   }
    // };
    console.log("info", info);
    try {
      const { data } = await api.post(`/seller-status-update`, info, {
        withCredentials: true
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const get_active_sellers = createAsyncThunk(
  "seller/get_active_sellers",
  async (
    { perPage, page, searchValue },
    { rejectWithValue, fulfillWithValue, getState }
  ) => {
    const token = getState().auth.token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    try {
      const { data } = await api.get(
        `/get-sellers?page=${page}&&searchValue=${searchValue}&&perPage=${perPage}`,
        config
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const get_deactive_sellers = createAsyncThunk(
  "seller/get_active_sellers",
  async (
    { perPage, page, searchValue },
    { rejectWithValue, fulfillWithValue, getState }
  ) => {
    const token = getState().auth.token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    try {
      const { data } = await api.get(
        `/get-deactive-sellers?page=${page}&&searchValue=${searchValue}&&perPage=${perPage}`,
        config
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const create_stripe_connect_account = createAsyncThunk(
  "seller/create_stripe_connect_account",
  async (_, { getState }) => {
    const token = getState().auth.token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    try {
      const {
        data: { url }
      } = await api.get(`/api/payment/create-stripe-connect-account`, config);
      window.location.href = url;
      // return fulfillWithValue(data)
    } catch (error) {
      //return rejectWithValue(error.response.data)
    }
  }
);

export const active_stripe_connect_account = createAsyncThunk(
  "seller/active_stripe_connect_account",
  async (activeCode, { rejectWithValue, fulfillWithValue, getState }) => {
    const token = getState().auth.token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    try {
      const { data } = await api.put(
        `/payment/active-stripe-connect-account/${activeCode}`,
        {},
        config
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const sellerReducer = createSlice({
  name: "seller",
  initialState: {
    successMessage: "",
    errorMessage: "",
    loader: false,
    sellers: [],
    totalSeller: 0
  },
  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = "";
      state.successMessage = "";
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(get_seller_request.fulfilled, (state, action) => {
        state.loader = false;
        state.sellers = action.payload.sellers;
        state.totalSellers = action.payload.totalSellers;
      })
      .addCase(get_seller.fulfilled, (state, action) => {
        state.loader = false;
        state.seller = action.payload.seller;
      })
      .addCase(seller_status_update.fulfilled, (state, action) => {
        state.loader = false;
        state.status = action.payload.status;
        state.successMessage = action.payload.message;
      });
  }
});
export const { messageClear } = sellerReducer.actions;
export default sellerReducer.reducer;
