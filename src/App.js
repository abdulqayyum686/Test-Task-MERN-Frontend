import { useEffect, useState } from "react";
import "./App.css";
import Login from "../src/components/Login";
import SignUp from "../src/components/SignUp";
import Home from "./components/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { useDispatch } from "react-redux";
import jwt from "jwt-decode";
import Cookies from "universal-cookie";
import { Navigate, Outlet } from "react-router-dom";
import AddCat from "../src/components/AddCat";
import EditCat from "../src/components/EditCat";
import AddItem from "../src/components/Additem";
import { useSelector } from "react-redux";
import axiosInstance from "../src/axiosInstance";
import jwt_decode from "jwt-decode";
import { setCurrentUser } from "../src/redux/reducers/userReducer";

function App() {
  const dispatch = useDispatch();
  const cookies = new Cookies();

  // const UserRoutes = () => {
  //   const userToken = cookies?.get("user_token");
  //   return userToken !== undefined ? <Outlet /> : <Navigate to="/" />;
  // };

  useEffect(() => {
    const token = cookies.get("user_token");
    if (token) {
      const user = jwt_decode(token);
      // console.log("get_user", user);
      axiosInstance
        .get(`user/get-user/${user?._id}`)
        .then((res) => {
          dispatch(setCurrentUser(res?.data?.user));
        })
        .catch((e) => {});
      // if (window.location.pathname.includes("login")) {
      //   props.history.push(user?.is_admin ? "/admin-dashboard" : "/");
      // }
      // if (lastlogin === "true") {
      //   props.history.push("/admin-dashboard");
      // } else {
      //   props.history.push("/");
      // }
    } else {
      // if (!window.location.href.includes("/page-register")) {
      //   props.history.push("/login");
      // }
    }
  }, []);
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/add-category" element={<AddCat />} />
          <Route path="/add-car" element={<AddItem />} />
          <Route path="/edit-category" element={<EditCat />} />
          <Route path="/edit-car" element={<AddItem />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
