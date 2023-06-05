import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosInstance";
import { Base_Url } from "../../config/baseUrl";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import Cookies from "universal-cookie";
const cookies = new Cookies();
const initialState = {
  currentUser: null,
  bookings:null,
  clientBooking:null,
  allBookings:null

};

// =========user login
export const clientLogin = createAsyncThunk("clientLogin", async (data) => {
  try {
    const res = await axios.post(`${Base_Url}/client/client-login`, data);
    console.log("responce=====>", res.data);
    cookies.set("client_token", res.data.token);
    axios.defaults.headers.authorization = res.data.token;
    Swal.fire({
      position: "center",
      icon: "success",
      title: "congrs....",
      text: res.data.message,
      showConfirmButton: false,
      timer: 2000,
    })
    return res;
  } catch (err) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: err.response.data.message,
    });
  }
});
// ========user signUP
export const clientSignUP = createAsyncThunk("clientSignUP", async (data) => {
  try {
    const res = await axios.post(`${Base_Url}/client/client-signup`, data);
    console.log("client====>",res)
    Swal.fire({
      position: "center",
      icon: "success",
      title: "congrs....",
      text: res.data.message,
      showConfirmButton: false,
      timer: 2000,
    })
    return res;
  } catch (err) {
    console.log(err);
  }
});
export const clienchat = createAsyncThunk("clienchat", async (data) => {
  try {
    const res = await axios.post(`${Base_Url}/chat/access`, data);
console.log("chat api_res 0000000",res)
    Swal.fire({
      position: "center",
      icon: "success",
      title: "congrs....",
      text: res.data.message,
      showConfirmButton: false,
      timer: 2000,
    })
    return res;
  } catch (err) {
    console.log(err);
  }
});
// export const getUsersForeChat = createAsyncThunk("getUsersForeChat", async (id) => {
//   try {
//     const res = await axiosInstance.get(`${Base_Url}/chat/fetch/${id}`);
// console.log("chek user")
//     return res;
//   } catch (err) {
//     console.log(err);
//   }
// });
export const getMessage = createAsyncThunk("getMessage", async (id) => {
  try {
    const res = await axios.get(`${Base_Url}/message/fetch/${id}`);

    return res;
  } catch (err) {
    console.log(err);
  }
});

export const MessageImage = createAsyncThunk("MessageImage", async (data) => {
  try {
    const res = await axios.post(`${Base_Url}/message/image}`,data);

    return res;
  } catch (err) {
    console.log(err);
  }
});
export const addBookings = createAsyncThunk("addBookings", async (data) => {
  console.log("add booking",data)
  try {
    const res = await axios.post(`${Base_Url}/client/add-bookings`,data);

    return res;
  } catch (err) {
    console.log(err);
  }
});
export const getClientBooking = createAsyncThunk("getClientBooking", async (id) => {
  try {
    const res = await axios.get(`${Base_Url}/client/client-bookings/${id}`);

    return res;
  } catch (err) {
    console.log(err);
  }
});
export const deleteClientBooking = createAsyncThunk("deleteClientBooking", async (id) => {
  try {
    const res = await axios.delete(`${Base_Url}/client/delete-booking/${id}`);

    return res;
  } catch (err) {
    console.log(err);
  }
});
export const approveClientBooking = createAsyncThunk("approveClientBooking", async (obj) => {
  try {
    const res = await axios.put(`${Base_Url}/client/approve-bookings/${obj?._id}`,obj?.data);

    return res;
  } catch (err) {
    console.log(err);
  }
});
export const allClientBooking = createAsyncThunk("allClientBooking", async () => {
  try {
    const res = await axios.get(`${Base_Url}/client//all-bookings`);

    return res;
  } catch (err) {
    console.log(err);
  }
});

export const MessageAccess = createAsyncThunk("MessageAccess", async (data) => {
  try {
    const res = await axios.post(`${Base_Url}/message/access}`,data)

    return res;
  } catch (err) {
    console.log(err);
  }
});

export const clientReducer = createSlice({
  name: "clientReducer",
  initialState: initialState,

  reducers: {
    chnagePageView(state, action) {
      state.activePageTab = action.payload;
    },

  },
  extraReducers: {
    [clientLogin.fulfilled]: (state, action) => {
      state.currentUser = action.payload.data;
      // state.isLoading = false;
    },
    [addBookings.fulfilled]: (state, action) => {
      state.bookings = action.payload;
      // state.isLoading = false;
    },
    [getClientBooking.fulfilled]: (state, action) => {
      state.clientBooking = action.payload.data.data;
      // state.isLoading = false;
    },
    [allClientBooking.fulfilled]: (state, action) => {
      state.allBookings = action.payload.data.data;
      // state.isLoading = false;
    },

  },
});
// Action creators are generated for each case reducer function
export const { chnagePageView } =
clientReducer.actions;
export default clientReducer.reducer;
