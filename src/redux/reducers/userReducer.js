import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosInstance";
import { Base_Url } from "../../config/baseUrl";
import axios from "axios";
import Swal from "sweetalert2";
import Cookies from "universal-cookie";
const cookies = new Cookies();
const initialState = {
  currentUser: null,
  activePageTab:"",
  alluser:null,
  userProducts:null,
  chekDate:"",
  allProducts:null,
  verifyPayment:""

};
// =========user login
export const userLogin = createAsyncThunk("userLogin", async (data) => {
  try {
    const res = await axios.post(`${Base_Url}/user/user-login`, data);
    if(res?.data?.user.accountType==="owner"){

      cookies.set("user_token", res.data.token);
      cookies.remove('client_token')
    }else if(res?.data?.user.accountType==="client"){
      cookies.remove('user_token')
      cookies.set("client_token", res.data.token);
    }

    axios.defaults.headers.authorization = res.data.token;
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
    const res = await axios.post(`${Base_Url}/user/user-signup`, data);
    return res;
  } catch (err) {
    console.log(err);
  }
});
export const buyerHistory = createAsyncThunk("buyerHistory", async (data) => {
  try {
    const res = await axios.post(`${Base_Url}/payment/payment-records`, data);
    return res;
  } catch (err) {
    console.log(err);
  }
});
export const getPaymentStatus = createAsyncThunk("getPaymentStatus", async (id) => {
  try {
    const res = await axios.get(`${Base_Url}/payment/get-user-payment/${id}`);
    return res;
  } catch (err) {
    console.log(err);
  }
});
// ========user signUP
export const deleteUser = createAsyncThunk("deleteUser", async (id) => {
  console.log("receive _id in api",id)
  try {
    const res = await axios.delete(`${Base_Url}/user/delete-user/${id}`);
    return res;
  } catch (err) {
    console.log(err);
  }
});
export const getAllUsers = createAsyncThunk(
  "getAllUsers",
  async () => {
    try {
      let response = await axios.get(
        `${Base_Url}/user/all-users`
      );
      return response.data.data;
    } catch (err) {
      console.log("all user", err);
    }
  }
);
export const getCurrentUser = createAsyncThunk(
  "getCurrentUser",
  async (id) => {
    try {
      let response = await axios.get(
        `${Base_Url}/user/get-current-user/${id}`
      );
  
      return response.data.data;
    } catch (err) {
      console.log("all user", err);
    }
  }
);
export const updateUserProfile= createAsyncThunk("updateUserProfile", async (obj) => {
  console.log("receive _id in api",obj)
  try {
    const res = await axios.put(`${Base_Url}/user/update-profile/${obj.id}`,obj.data);
    return res;
  } catch (err) {
    console.log(err);
  }
});
// =============Products Api ==============
export const addProduct = createAsyncThunk("addProduct", async (data) => {
  try {
    const res = await axios.post(`${Base_Url}/client/add-product`, data);
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
    console.log("backend error", err);
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: err?.message,
    });
  }
});
export const getUserProducts = createAsyncThunk(
  "getUserProducts",
  async (id) => {
    console.log("user_id reducer",id)
    try {
      let response = await axios.get(
        `${Base_Url}/client/get-products/${id}`
      );
      return response.data.data;
    } catch (err) {
      console.log("all user", err);
    }
  }
);    
export const getAllrProducts = createAsyncThunk(
  "getAllrProducts",
  async (id) => {
    console.log("user_id reducer",id)
    try {
      let response = await axios.get(
        `${Base_Url}/client/get-all-products`
      );
      return response.data.data;
    } catch (err) {
      console.log("all user", err);
    }
  }
);    
export const deleteProduct = createAsyncThunk("deleteProduct", async (id) => {
  console.log("receive _id in api",id)
  try {
    const res = await axios.delete(`${Base_Url}/client/delete-product/${id}`);
    return res;
  } catch (err) {
    console.log(err);
  }
});
export const updateProduct = createAsyncThunk("deleteProduct", async (obj) => {
  console.log("receive _id in api",obj)
  try {
    const res = await axios.put(`${Base_Url}/client/update-product/${obj.id}`,obj.data);
    return res;
  } catch (err) {
    console.log(err);
  }
});

export const userReducer = createSlice({
  name: "userReducer",
  initialState: initialState,

  reducers: {
    chnagePageView(state, action) {
      state.activePageTab = action.payload;
    },



  },
  extraReducers: {
    [userLogin.fulfilled]: (state, action) => {
      state.currentUser = action.payload;
      // state.isLoading = false;
    },
    [getCurrentUser.fulfilled]: (state, action) => {
      state.currentUser = action.payload;
      // state.isLoading = false;
    },
    [getAllUsers.fulfilled]: (state, action) => {
      state.alluser = action.payload;
      // state.isLoading = false;
    },
    [getUserProducts.fulfilled]: (state, action) => {
      state.userProducts = action.payload;
      // state.isLoading = false;
    },
    [getAllrProducts.fulfilled]: (state, action) => {
      state.allProducts = action.payload;
      // state.isLoading = false;
    },
    [getPaymentStatus.fulfilled]: (state, action) => {
      state.verifyPayment = action.payload;
      // state.isLoading = false;
    },
  },
});
// Action creators are generated for each case reducer function
export const { chnagePageView } =
  userReducer.actions;
export default userReducer.reducer;
