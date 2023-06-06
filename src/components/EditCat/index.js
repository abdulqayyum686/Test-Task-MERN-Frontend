import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateCategory,
  getAllCategory,
} from "../../redux/reducers/categoryReducer";
import { useNavigate, useLocation } from "react-router-dom";

const EditCat = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { state } = useLocation();
  console.log("state", state);
  const userReducer = useSelector((s) => s.userReducer.currentUser);
  const [category, setCategory] = useState({
    title: state.title,
    belongsTo: "",
  });

  const handelChane = (e) => {
    setCategory({ ...category, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    let obj = {
      data: { ...category, belongsTo: userReducer._id },
      id: state._id,
    };
    let res = await dispatch(updateCategory(obj));
    if (res.payload) {
      dispatch(getAllCategory(userReducer?._id));
      navigate("/home");
    }
    setCategory({ ...category, title: "" });
  };

  return (
    <>
      <div className="home_container">
        <div>
          <div>Update Category</div>
          <div className="add_cat">
            <input
              placeholder="enter category title "
              className="input_ele"
              name="title"
              value={category.title}
              onChange={(e) => handelChane(e)}
            />
          </div>
          <div className="cat_submit" onClick={() => onSubmit()}>
            Update
          </div>
        </div>
      </div>
    </>
  );
};

export default EditCat;
