import React, { useState } from "react";
import styles from "./Register.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Spinner } from "react-bootstrap";
import "@fortawesome/fontawesome-free/css/all.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  let navigate = useNavigate();
  let [isLoading, setIsLoading] = useState(false);
  let [apiResponse, setAPIResponse] = useState({ message: "", status: "" });

  async function register(values) {
    try {
      console.log(values);
      setIsLoading(true);
      let { data } = await axios.post(
        "https://sara7aiti.onrender.com/api/v1/user",
        values
      );
      console.log(data.message, data.added);
      setIsLoading(false);
      setAPIResponse({ message: data.message, status: "success" });
      navigate("/login");
    } catch (err) {
      console.log(err.response.data.error);
      setIsLoading(false);
      setAPIResponse({ message: err.response.data.error, status: "error" });
    }
  }

  const validationSchema = Yup.object({
    name: Yup.string()
      .max(15, "Username must be less than 15 characters")
      .min(3, "Username must be more than 2 characters")
      .required("Username is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .matches(/^[A-Z]/, "Password should start with an uppercase letter")
      .matches(/^.{4,}$/, "Password should be more than 3 characters")
      .required("Password is required"),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords don't match")
      .required("Confirm Password is required"),
    age: Yup.number()
      .min(10, "Minimum age is 10")
      .max(80, "Maximum age is 80")
      .required("Age is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      age: 0,
    },
    validationSchema,
    onSubmit: (values) => {
      register(values);
    },
  });

  return (
    <div className="container my-5">
      <div className="user my-3">
        <h4 className="text-center">
          <i className="far fa-edit user-icon" />
          &nbsp;Join now to receive whispers!
        </h4>

        {apiResponse.status === "success" ? (
          <div className="alert alert-success text-center fw-bold">
            <i
              class="fa-solid fa-check fa-bounce"
              style={{ color: "#5ac115" }}
            ></i>
            &nbsp;
            {apiResponse.message}
          </div>
        ) : apiResponse.status === "error" ? (
          <div className="alert alert-danger text-center fw-bold">
            <i
              class="fa-solid fa-xmark fa-bounce"
              style={{ color: "#df210c" }}
            ></i>
            &nbsp;{apiResponse.message}
          </div>
        ) : null}
      </div>
      <div className="card p-5 w-50 m-auto">
        <form onSubmit={formik.handleSubmit}>
          <FloatingLabel
            controlId="floatingInput"
            label="Name"
            className="mb-3"
          >
            <label htmlFor="name"></label>
            <Form.Control
              placeholder="Enter your Name"
              type="text"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </FloatingLabel>
          {formik.errors.name && formik.touched.name ? (
            <div className="alert alert-danger">{formik.errors.name}</div>
          ) : null}

          <FloatingLabel
            controlId="floatingEmail"
            label="Email"
            className="mb-3"
          >
            <label htmlFor="email"></label>
            <Form.Control
              placeholder="Enter your Email"
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </FloatingLabel>
          {formik.errors.email && formik.touched.email ? (
            <div className="alert alert-danger">{formik.errors.email}</div>
          ) : null}

          <FloatingLabel
            controlId="floatingPassword"
            label="Password"
            className="mb-3"
          >
            <label htmlFor="password"></label>
            <Form.Control
              placeholder="Enter your Password"
              type="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </FloatingLabel>
          {formik.errors.password && formik.touched.password ? (
            <div className="alert alert-danger">{formik.errors.password}</div>
          ) : null}

          <FloatingLabel
            controlId="floatingConfirmPassword"
            label="Confirm Password"
            className="mb-3"
          >
            <label htmlFor="rePassword"></label>
            <Form.Control
              placeholder="Confirm Your Password"
              type="password"
              name="rePassword"
              value={formik.values.rePassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </FloatingLabel>
          {formik.errors.rePassword && formik.touched.rePassword ? (
            <div className="alert alert-danger">{formik.errors.rePassword}</div>
          ) : null}

          <FloatingLabel controlId="floatingAge" label="Age" className="mb-3">
            <label htmlFor="age"></label>
            <Form.Control
              placeholder="Age"
              type="number"
              name="age"
              value={formik.values.age}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </FloatingLabel>
          {formik.errors.age && formik.touched.age ? (
            <div className="alert alert-danger">{formik.errors.age}</div>
          ) : null}
          <button
            type="submit"
            className="btn btn-outline-dark my-4 w-100 rounded"
          >
            {isLoading ? (
              <Spinner animation="border" variant="secondary" />
            ) : (
              "Register"
            )}
          </button>
          
          <h6 className="text-center">Already have an account? <Link to={"/login"} className="link-dark fw-bold">Login</Link></h6>
        </form>
      </div>
    </div>
  );
  
}
