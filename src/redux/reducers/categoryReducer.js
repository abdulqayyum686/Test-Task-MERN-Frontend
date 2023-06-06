import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosInstance";
import Swal from "sweetalert2";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const initialState = {
  getAllCategory: [],
};
// =========user login
export const addCategory = createAsyncThunk("addCategory", async (data) => {
  try {
    const res = await axiosInstance.post(`category/add-category`, data);

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
export const getAllCategory = createAsyncThunk("getAllCategory", async (id) => {
  try {
    const res = await axiosInstance.get(`category/get-category/${id}`);
    return res.data;
  } catch (err) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: err.response.data.message,
    });
  }
});
export const updateCategory = createAsyncThunk(
  "updateCategory",
  async (data) => {
    try {
      const res = await axiosInstance.post(
        `category/update-category/${data.id}`,
        data.data
      );

      Swal.fire({
        position: "center",
        icon: "success",
        title: "congrs....",
        text: res.data.message,
        showConfirmButton: false,
        timer: 2000,
      });

      return res.data;
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err.response.data.message,
      });
    }
  }
);
export const deleteCategory = createAsyncThunk("deleteCategory", async (id) => {
  try {
    const res = await axiosInstance.delete(`category/delete-category/${id}`);
    Swal.fire({
      position: "center",
      icon: "success",
      title: "congrs....",
      text: res.data.message,
      showConfirmButton: false,
      timer: 2000,
    });

    return res.data;
  } catch (err) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: err.response.data.message,
    });
  }
});
export const categoryReducer = createSlice({
  name: "categoryReducer",
  initialState: initialState,

  reducers: {},
  extraReducers: {
    [getAllCategory.fulfilled]: (state, action) => {
      state.getAllCategory = action.payload;
    },
  },
});
// Action creators are generated for each case reducer function
export const {} = categoryReducer.actions;
export default categoryReducer.reducer;
