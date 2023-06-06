import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addCategory } from "../../redux/reducers/categoryReducer";

const AddCat = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userReducer = useSelector((s) => s.userReducer.currentUser);
  const [category, setCategory] = useState({
    title: "",
    belongsTo: "",
  });

  const handelChane = (e) => {
    setCategory({ ...category, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    let res = await dispatch(
      addCategory({ ...category, belongsTo: userReducer._id })
    );
    if (res.payload) {
      navigate("/home");
    }
    setCategory({ ...category, title: "" });
  };

  return (
    <>
      <div className="home_container">
        <div>
          <div>Add category</div>
          <div className="add_cat">
            <input
              placeholder="enter category title "
              className="input_ele"
              name="title"
              onChange={(e) => handelChane(e)}
            />
          </div>
          <div className="cat_submit" onClick={() => onSubmit()}>
            Submit
          </div>
        </div>
      </div>
    </>
  );
};

export default AddCat;
