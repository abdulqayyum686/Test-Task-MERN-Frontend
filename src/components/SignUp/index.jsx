import React, { useRef, useState } from "react";
import { Form, Field, Formik, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import Swal from "sweetalert2";
import "./sign_up.css";
import { Link } from "react-router-dom";
import { userSignUP } from "../../redux/reducers/userReducer";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [values, setValues] = useState(null);
  console.log("location value", values?.value.description);
  const defaultValues = {
    email: "",
    password: "",
    cpassword: "",
  };
  const UserValidateSchema = yup.object().shape({
    email: yup
      .string()
      .email("Invalid email format")
      .required("email is required !"),
    password: yup.string().required("Password is required*"),

    cpassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "password not match"),
  });

  const handleSubmit = (value, { resetForm }) => {
    const formData = new FormData();
    formData.append("email", value.email);
    formData.append("password", value.password);

    const data = {
      username: value.username,
      email: value.email,
      location: values?.value.description,
      availability: value.availability,
      password: value.password,
      accountType: value.accountType,
    };
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Signup succesffully",
      showConfirmButton: false,
      timer: 3000,
    });
    dispatch(userSignUP(data));
    // resetForm({ value: "" });
    navigate("/");
  };
  return (
    <>
      <Formik
        initialValues={defaultValues}
        validationSchema={UserValidateSchema}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <div className="login_main_container">
              <div className="signUp_img_area"></div>
              <div className="signUP_from_box">
                <div className="logn_from_logo"></div>
                <div className="logo_form_text_box">
                  <div className="login_content_box">
                    <div className="login_heading">Signup</div>

                    <div className="login_feild">
                      {" "}
                      <div className="login_feild_box">
                        <Field
                          className="login_inputs"
                          placeholder="Email"
                          name="email"
                        />
                      </div>
                    </div>

                    <span className="text-danger d-flex text-start">
                      <ErrorMessage name="email" />
                    </span>

                    <div className="login_feild">
                      {" "}
                      <div className="login_feild_box">
                        <Field
                          className="login_inputs"
                          placeholder="Password"
                          name="password"
                        />
                      </div>
                    </div>
                    <span className="text-danger d-flex text-start">
                      <ErrorMessage name="password" />
                    </span>
                    <div className="login_feild">
                      {" "}
                      <div className="login_feild_box">
                        <Field
                          className="login_inputs"
                          placeholder="Confirm Password"
                          name="cpassword"
                        />
                      </div>
                    </div>
                    <span className="text-danger d-flex text-start">
                      <ErrorMessage name="cpassword" />
                    </span>
                    <div className="login_btn_wraper">
                      <button type="submit" className="login_btn">
                        Sign up
                      </button>
                    </div>
                    <div className="login_btn_wraper">
                      <div className="sign_up_or">
                        Or{" "}
                        <Link className="navi_lins" to="/">
                          <span className="sgnup_opt">Login</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default SignUp;
