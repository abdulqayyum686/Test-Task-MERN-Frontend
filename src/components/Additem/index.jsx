import React, { useState, useEffect } from "react";
import DataTableCom from "../Home/dataTable";
import { Form, Field, Formik, ErrorMessage } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCategory,
  getAllCategory,
} from "../../redux/reducers/categoryReducer";
import { addCar } from "../../redux/reducers/carReducer";
import { useNavigate } from "react-router-dom";

const AddItem = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userReducer = useSelector((state) => state.userReducer.currentUser);
  const categoryReducer = useSelector((state) => state.categoryReducer);
  const [showImage, setShowImage] = useState("");
  const defaultValues = {
    profile: "",
    make: "",
    modal: "",
    year: "",
    color: "",
    Mileage: "",
    Description: "",
    categoryId: categoryReducer?.getAllCategory[0]._id,
  };
  useEffect(() => {
    if (userReducer) {
      console.log(userReducer, "currentUser222");
      dispatch(getAllCategory(userReducer?._id));
    }
  }, [userReducer]);
  const UserValidateSchema = yup.object().shape({
    profile: showImage
      ? yup.mixed()
      : yup.mixed().required("Plese upload car profile"),
    make: yup.string().required("Please enter your make"),
    modal: yup.string().required("Please enter your modal"),
    year: yup.string().required("Please enter year"),
    color: yup.string().required("select car color"),
    Mileage: yup.string().required("Please enter car Mileage"),
    Description: yup.string().required("Please enter your Description"),
    categoryId: yup.string().required("Please select your category"),
  });
  const handleSubmit = async (value, { resetForm }) => {
    console.log("==============value check presale", value);
    const formData = new FormData();
    formData.append("title", value.make);
    formData.append("model", value.modal);
    formData.append("year", value.year);
    formData.append("color", value.color);
    formData.append("milage", value.Mileage);
    formData.append("description", value.Description);
    formData.append("file", value.profile);
    formData.append("categoryId", value.categoryId);
    formData.append("belongsTo", userReducer?._id);
    let res = await dispatch(addCar(formData));
    if (res.payload) {
      navigate("/home");
    }
  };

  return (
    <>
      <div className="home_container">
        <h1 className="add_card_title">Add car</h1>
        <Formik
          initialValues={defaultValues}
          validationSchema={UserValidateSchema}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue }) => (
            <Form>
              <div>
                <div>
                  {showImage === "" ? (
                    <div className="small_eidt">
                      <input
                        type="file"
                        onChange={(e) => {
                          setFieldValue("profile", e.target.files[0]);
                          setShowImage(URL.createObjectURL(e.target.files[0]));
                        }}
                      />
                      {/* <label for="upload10" className="update_profile_pic">
                        upload Car
                      </label> */}
                    </div>
                  ) : (
                    <img className="upload_show_img" src={showImage} />
                  )}
                </div>
                <div className="car_form">
                  <div>
                    <div>Title</div>
                    <div className="add_cat">
                      <Field
                        placeholder="title"
                        name="make"
                        className="input_ele"
                      />
                    </div>
                    <div
                      className="d-flex justify-content-center mt-3 text-danger"
                      style={{ color: "red" }}
                    >
                      <ErrorMessage name="make" />
                    </div>
                  </div>
                  <div>
                    <div>Modal</div>
                    <div className="add_cat">
                      <Field
                        placeholder="Modal"
                        name="modal"
                        className="input_ele"
                      />
                    </div>
                    <div
                      className="d-flex justify-content-center mt-3 text-danger"
                      style={{ color: "red" }}
                    >
                      <ErrorMessage name="modal" />
                    </div>
                  </div>
                </div>
                <div className="car_form">
                  <div>
                    <div>Year</div>
                    <div className="add_cat">
                      <Field
                        placeholder="Year"
                        name="year"
                        className="input_ele"
                      />
                    </div>
                    <div
                      className="d-flex justify-content-center mt-3 text-danger"
                      style={{ color: "red" }}
                    >
                      <ErrorMessage name="year" />
                    </div>
                  </div>
                  <div>
                    <div>Color</div>
                    <div className="add_cat">
                      <Field
                        placeholder="Color"
                        name="color"
                        className="input_ele"
                      />
                    </div>
                    <div
                      className="d-flex justify-content-center mt-3 text-danger"
                      style={{ color: "red" }}
                    >
                      <ErrorMessage name="color" />
                    </div>
                  </div>
                </div>
                <div className="car_form">
                  <div>
                    <div>Mileage</div>
                    <div className="add_cat">
                      <Field
                        placeholder="Mileage"
                        name="Mileage"
                        className="input_ele"
                      />
                    </div>
                    <div
                      className="d-flex justify-content-center mt-3 text-danger"
                      style={{ color: "red" }}
                    >
                      <ErrorMessage name="Mileage" />
                    </div>
                  </div>
                  <div>
                    <div>Description</div>
                    <div className="add_cat">
                      <Field
                        placeholder="Description"
                        name="Description"
                        className="input_ele"
                      />
                    </div>
                    <div
                      className="d-flex justify-content-center mt-3 text-danger"
                      style={{ color: "red" }}
                    >
                      <ErrorMessage name="Description" />
                    </div>
                  </div>
                </div>
                <div className="car_form">
                  <div>
                    <div>Select Category </div>
                    <div className="add_cat">
                      <Field
                        as="select"
                        placeholder="Description"
                        name="categoryId"
                        className="input_ele"
                      >
                        {categoryReducer?.getAllCategory?.map((data, index) => {
                          return (
                            <option key={index} value={data?._id}>
                              {data?._id}
                            </option>
                          );
                        })}
                      </Field>
                    </div>
                    <div
                      className="d-flex justify-content-center mt-3 text-danger"
                      style={{ color: "red" }}
                    >
                      <ErrorMessage name="Description" />
                    </div>
                  </div>
                </div>
                <button className="cat_submit" type="submit">
                  Submit
                </button>
              </div>
            </Form>
          )}
        </Formik>
        <DataTableCom />
      </div>
    </>
  );
};

export default AddItem;
