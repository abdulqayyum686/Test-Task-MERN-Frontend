import React, { useRef, useState } from "react";
import { Form, Field, Formik, ErrorMessage } from "formik";
import * as yup from "yup";
import "./login.css";
import logo from "../../assets/images/logo.png";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { userLogin } from "../../redux/reducers/userReducer"
import { useSelector } from "react-redux";
import { getUserProducts, getAllrProducts, getPaymentStatus } from "../../redux/reducers/userReducer"

const Login = () => {
  const navigate = useNavigate()
  const currentUser = useSelector((state) => state.user.currentUser)

  const dispatch = useDispatch()
  const defaultValues = {
    email: "",
    password: "",
  };
  const UserValidateSchema = yup.object().shape({
    email: yup
      .string()
      .email("Invalid email format")
      .required("email is required !"),
    password: yup.string().required("Password is required*"),
  });
  const handleSubmit = async (value, { resetForm }) => {

    const formData = new FormData();
    formData.append("email", value.email);
    formData.append("password", value.password);
    const data = {
      email: value.email,
      password: value.password
    }
    resetForm({ value: "" });
    let loginRes = await dispatch(userLogin(data))



  
}


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
              <div className="login_img_area">
      
              </div>

              <div className="login_from_box">
                <div className="logn_from_logo">
          
                </div>
                <div className="logo_form_text_box">
                  <div className="login_content_box">
                    <div className="login_heading">Login</div>
          

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
                    <div className="forget_link">Forget Password?</div>

                    <div className="login_btn_wraper">
                      <button type="submit" className="login_btn">
                        Login
                      </button>
                    </div>
                    <div className="login_btn_wraper">
                      <div className="sign_up_or">
                        Or{" "}
                        <Link className="navi_lins" to="/sign-up">
                          <span className="sgnup_opt">Signup</span>
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

export default Login;
