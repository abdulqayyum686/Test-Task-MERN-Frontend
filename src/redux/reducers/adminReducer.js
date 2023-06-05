import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
// import axiosInstance from "../../axiosInstance";
import { Base_Url } from "../../config/baseUrl";
import axios from "axios";
import Swal from "sweetalert2";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
const cookies = new Cookies();

const initialState = {
  adminSession: null,
};
// =========user login
export const adminLogin = createAsyncThunk("adminLogin", async (data) => {
  try {
    const res = await axios.post(`${Base_Url}/admin/admin-login`, data);
    // console.log("responce=====>", res.data);
    cookies.set("admin_token", res.data.token);

    Swal.fire({
      position: "center",
      icon: "success",
      title: "congrs....",
      text: res.data.message,
      showConfirmButton: false,
      timer: 2000,
    });

    return res;
  } catch (err) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: err.response.data.message,
    });
  }
});

export const adminReducer = createSlice({
  name: "adminReducer",
  initialState: initialState,

  reducers: {
    temUserCommunity(state, action) {
      state.tempFollowCommunity = action.payload;
    },
  },
  extraReducers: {
    [adminLogin.fulfilled]: (state, action) => {
      state.adminSession = action.payload.user;
      // state.isLoading = false;
    },
  },
});
// Action creators are generated for each case reducer function
export const { temUserCommunity } = adminReducer.actions;
export default adminReducer.reducer;
