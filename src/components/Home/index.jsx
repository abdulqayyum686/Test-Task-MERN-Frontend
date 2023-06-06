import React, { useEffect, useState } from "react";
import "./home.css";
import { Link, useNavigate } from "react-router-dom";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import Swal from "sweetalert2";
import DataTableCom from "./dataTable";
import {
  deleteCategory,
  getAllCategory,
} from "../../redux/reducers/categoryReducer";
import { deleteCar, getAllCar } from "../../redux/reducers/carReducer";
import { AiFillEdit } from "react-icons/ai";
import { AiFillDelete } from "react-icons/ai";

const Home = () => {
  const navigate = useNavigate();
  const userReducer = useSelector((state) => state.userReducer.currentUser);
  const categoryReducer = useSelector((state) => state.categoryReducer);
  const carReducer = useSelector((state) => state.carReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log(userReducer, "currentUser2225656565656");
    if (userReducer) {
      console.log(userReducer, "currentUser222");
      dispatch(getAllCategory(userReducer?._id));
      dispatch(getAllCar(userReducer?._id));
    }
  }, [userReducer]);

  const goTo = (url) => {
    navigate(url);
  };

  const columns2 = [
    {
      name: "Category Title",
      selector: (row) => row.title,
    },
    {
      name: "Description",
      selector: (row) => row?.description,
    },
    {
      name: "Milage",
      selector: (row) => row?.milage,
    },
    {
      name: "Year",
      selector: (row) => row?.year,
    },
    {
      name: "color",
      selector: (row) => row?.color,
    },
    {
      name: "model",
      selector: (row) => row?.model,
    },
    {
      name: "Car Belongs To",
      selector: (row) => row?.belongsTo?.email,
    },
    {
      name: "Action",
      selector: (row) => (
        <div style={{ display: "flex", cursor: "pointer" }}>
          <AiFillEdit
            size={20}
            style={{ marginRight: "10px" }}
            onClick={() => handelEditCar(row)}
          />
          <AiFillDelete size={20} onClick={() => handelDeleteCar(row)} />
        </div>
      ),
    },
  ];
  const columns = [
    {
      name: "Category Title",
      selector: (row) => row.title,
    },
    {
      name: "Category Belongs To",
      selector: (row) => row?.belongsTo?.email,
    },
    {
      name: "Action",
      selector: (row) => (
        <div style={{ display: "flex", cursor: "pointer" }}>
          <AiFillEdit
            size={20}
            style={{ marginRight: "10px" }}
            onClick={() => handelEditCategory(row)}
          />
          <AiFillDelete size={20} onClick={() => handelDeleteCategory(row)} />
        </div>
      ),
    },
  ];
  const handelEditCar = (row) => {
    navigate("/edit-car", {
      state: row,
    });
  };
  const handelDeleteCar = (row) => {
    // console.log("lllllll", row);
    Swal.fire({
      title: "Are you sure?",
      text: "Are you sure you want to delete this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        let res = await dispatch(deleteCar(row._id));
        if (res.payload) {
          dispatch(getAllCar(userReducer?._id));
        }
      }
    });
  };
  const handelEditCategory = (row) => {
    navigate("/edit-category", {
      state: row,
    });
  };
  const handelDeleteCategory = (row) => {
    console.log("lllllll", row);
    Swal.fire({
      title: "Are you sure?",
      text: "Are you sure you want to delete this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        let res = await dispatch(deleteCategory(row._id));
        if (res.payload) {
          dispatch(getAllCategory(userReducer?._id));
        }
      }
    });
  };
  return (
    <>
      <div className="home_container">
        <div className="add_new_box">
          <Link to="/add-category">
            <div className="add_new_opt" onClick={() => goTo("/add-category")}>
              Add Category
            </div>
          </Link>
          <Link to="/add-car">
            <div className="add_new_opt" onClick={() => goTo("/add-car")}>
              Add Car
            </div>
          </Link>
        </div>
        <div className="home_card_box">
          <p>List of Cars</p>
          <DataTableCom data={carReducer?.getAllCar} columns={columns2} />
        </div>
        <div className="home_card_box">
          <p>List of Categories</p>
          <DataTableCom
            data={categoryReducer?.getAllCategory}
            columns={columns}
          />
        </div>
      </div>
    </>
  );
};

export default Home;
