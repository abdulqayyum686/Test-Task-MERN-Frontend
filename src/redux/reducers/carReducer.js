import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosInstance";
// import swal from "sweetalert";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const initialState = {
  getAllCar: [],
};

export const addCar = createAsyncThunk("addCar", async (formData) => {
  try {
    const res = await axiosInstance.post("car/add-car", formData);

    return res.data;
  } catch (err) {
    console.log(err);
  }
});
export const updateCar = createAsyncThunk("updateCar", async (obj) => {
  try {
    const res = await axiosInstance.put(
      `car/update-car/${obj.id}`,
      obj.formData
    );
    return res.data;
  } catch (err) {
    console.log(err);
  }
});
export const getAllCar = createAsyncThunk("getAllCar", async (id) => {
  try {
    const res = await axiosInstance.get(`car/get-car/${id}`);
    return res.data;
  } catch (err) {
    console.log(err);
  }
});
export const deleteCar = createAsyncThunk("deleteCar", async (id) => {
  try {
    const res = await axiosInstance.put(`car/delete-car/${id}`);
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
    // [updateSettings.fulfilled]: (state, action) => {
    //   state.currentUser = action.payload;
    // },
  },
});
// Action creators are generated for each case reducer function
export const {} = carReducer.actions;
export default carReducer.reducer;
