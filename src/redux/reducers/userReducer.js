import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosInstance";
import { Base_Url } from "../../config/baseUrl";
import axios from "axios";
import Swal from "sweetalert2";
import Cookies from "universal-cookie";
const cookies = new Cookies();
const initialState = {
  currentUser: null,
};
// =========user login
export const userLogin = createAsyncThunk("userLogin", async (data) => {
  try {
    const res = await axiosInstance.post(`user/user-login`, data);
    cookies.set("user_token", res.data.token);
    axios.defaults.headers.authorization = res.data.token;
    Swal.fire({
      position: "center",
      icon: "success",
      title: "congrs....",
      text: res.data.message,
      showConfirmButton: false,
      timer: 2000,
    });
    return res.data.user;
  } catch (err) {
    console.log("backend error", err);
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: err.response.data.message,
    });
    return err;
  }
});
// ========user signUP
export const userSignUP = createAsyncThunk("userSignUP", async (data) => {
  try {
    const res = await axiosInstance.post(`user/user-signup`, data);
    return res.data;
  } catch (err) {
    console.log(err);
  }
});

export const userReducer = createSlice({
  name: "userReducer",
  initialState: initialState,

  reducers: {
    setCurrentUser(state, action) {
      state.currentUser = action.payload;
    },
  },
  extraReducers: {
    [userLogin.fulfilled]: (state, action) => {
      state.currentUser = action.payload;
      // state.isLoading = false;
    },
  },
});
// Action creators are generated for each case reducer function
export const { setCurrentUser } = userReducer.actions;
export default userReducer.reducer;
