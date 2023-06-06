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
import { useSelector } from "react-redux";
import AddCat from "../src/components/AddCat";
import AddItem from "../src/components/Additem";

function App() {
  const dispatch = useDispatch();
  const cookies = new Cookies();

  const UserRoutes = () => {
    const userToken = cookies?.get("user_token");
    return userToken !== undefined ? <Outlet /> : <Navigate to="/" />;
  };

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
