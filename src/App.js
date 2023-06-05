import logo from "./logo.svg";
import "./App.css";
import Login from "../src/components/Login";
import SignUp from "../src/components/SignUp";
import Home from "./components/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getAllUsers,
  getCurrentUser,
  getAllrProducts,
} from "../src/redux/reducers/userReducer";
import { useDispatch } from "react-redux";
import jwt from "jwt-decode";
import { getUserProducts } from "../src/redux/reducers/userReducer";
import Cookies from "universal-cookie";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import AddCat from "../src/components/AddCat"
import AddItem from "../src/components/Additem"

function App() {
  const dispatch = useDispatch();
  const cookies = new Cookies();
  const AdminRoutes = () => {
    const adminToken = cookies?.get("admin_token");
    return adminToken !== undefined ? (
      <Outlet />
    ) : (
      <Navigate to="/admin-login" />
    );
  };
  const UserRoutes = () => {
    const userToken = cookies?.get("user_token");
    return userToken !== undefined ? <Outlet /> : <Navigate to="/" />;
  };
  const ClientRoutes = () => {
    const clientToken = cookies?.get("client_token");
    return clientToken !== undefined ? <Outlet /> : <Navigate to="/" />;
  };

  const checkToken = cookies?.get("user_token");
  const clientToken = cookies?.get("client_token");
  const adminToken = cookies?.get("admin_token");
  useEffect(() => {
    dispatch(getAllUsers());
    if (checkToken) {
      const userInfo = jwt(checkToken);
      dispatch(getCurrentUser(userInfo._id));
    } else if (clientToken) {
      const userInfo = jwt(clientToken);
      dispatch(getAllrProducts());
      dispatch(getCurrentUser(userInfo._id));
    } else if (adminToken) {
      const userInfo = jwt(adminToken);
      dispatch(getCurrentUser(userInfo._id));
    }
  }, []);

  return (
    <>
      <Router>

          <Routes>
            <Route path="/" element={<Login />} />
              <Route path="/home" element={<Home />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/add-cat" element={<AddCat />} />
            <Route path="/add-item" element={<AddItem />} />
          </Routes>

      </Router>
    </>
  );
}

export default App;
