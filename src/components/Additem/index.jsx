import React, { useState } from 'react'
import DataTableCom from "../Home/dataTable"
import { Form, Field, Formik, ErrorMessage } from "formik";
import * as yup from "yup";

const AddItem = () => {
  const [showImage, setShowImage] = useState("");
  const defaultValues = {
    profile: "",
    make: "",
    modal: "",
    year: "",
    color: "",
    Mileage: "",
    Description: "",
  };
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

  });
  const handleSubmit = (value, { resetForm }) => {
    console.log("==============value check presale", value)
    const formData = new FormData();
    formData.append("make", value.make);
    formData.append("modal", value.modal);
    formData.append("year", value.year);
    formData.append("color", value.color);
    formData.append("Mileage", value.Mileage);
    formData.append("Description", value.Description)
    formData.append("profile", value.profile)
  };
  return (
    <>

      <div className="home_container">
        <h1 className='add_card_title'>Add car</h1>
        <Formik
          initialValues={defaultValues}
          validationSchema={UserValidateSchema}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue }) => (
            <Form>
              <div>
                <div className="small_eidt">
                  <input
                    type="file"
                    id="upload10"
                    hidden

                  />
                  <label for="upload10" className="update_profile_pic">
                    upload Car
                  </label>
                </div>
                <div className='car_form'>
                  <div>
                    <div>Make</div>
                    <div className='add_cat'>
                      <Field placeholder='Make' name="make" className='input_ele' />
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
                    <div className='add_cat'>
                      <Field placeholder='Modal' name="modal" className='input_ele' />
                    </div>
                    <div
                      className="d-flex justify-content-center mt-3 text-danger"
                      style={{ color: "red" }}
                    >
                      <ErrorMessage name="modal" />
                    </div>
                  </div>
                </div>
                <div className='car_form'>
                  <div>
                    <div>Year</div>
                    <div className='add_cat'>
                      <Field placeholder='Year' name="year" className='input_ele' />
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
                    <div className='add_cat'>
                      <Field placeholder='Color' name="color" className='input_ele' />
                    </div>
                    <div
                      className="d-flex justify-content-center mt-3 text-danger"
                      style={{ color: "red" }}
                    >
                      <ErrorMessage name="color" />
                    </div>

                  </div>
                </div>
                <div className='car_form'>
                  <div>
                    <div>Mileage</div>
                    <div className='add_cat'>
                      <Field placeholder='Mileage' name="Mileage" className='input_ele' />
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
                    <div className='add_cat'>
                      <Field placeholder='Description' name="Description" className='input_ele' />
                    </div>
                    <div
                      className="d-flex justify-content-center mt-3 text-danger"
                      style={{ color: "red" }}
                    >
                      <ErrorMessage name="Description" />
                    </div>
                  </div>


                </div>
                <button className='cat_submit' type='submit'>Submit</button>
              </div>
            </Form>
          )}
        </Formik>
        <DataTableCom />
      </div>
    </>
  )
}

export default AddItem