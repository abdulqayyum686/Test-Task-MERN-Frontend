import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosInstance";
import Swal from "sweetalert2";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const initialState = {
  getAllCar: [],
};

export const addCar = createAsyncThunk("addCar", async (formData) => {
  try {
    const res = await axiosInstance.post("car/add-car", formData);
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
    console.log(err);
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: err.response.data.message,
    });
  }
});
export const updateCar = createAsyncThunk("updateCar", async (obj) => {
  try {
    const res = await axiosInstance.put(`car/update-car/${obj.id}`, obj.data);
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
    console.log(err);
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: err.response.data.message,
    });
  }
});
export const getAllCar = createAsyncThunk("getAllCar", async (id) => {
  try {
    const res = await axiosInstance.get(`car/get-car/${id}`);
    return res.data.data;
  } catch (err) {
    console.log(err);
  }
});
export const deleteCar = createAsyncThunk("deleteCar", async (id) => {
  try {
    const res = await axiosInstance.delete(`car/delete-car/${id}`);
    Swal.fire("Deleted!", "Your file has been deleted.", "success");
    return res.data;
  } catch (err) {
    console.log(err);
  }
});
export const carReducer = createSlice({
  name: "carReducer",
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [getAllCar.fulfilled]: (state, action) => {
      state.getAllCar = action.payload;
    },
  },
});
// Action creators are generated for each case reducer function
export const {} = carReducer.actions;
export default carReducer.reducer;
