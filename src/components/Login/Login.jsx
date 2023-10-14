import React, { useState } from "react";
import styles from "./Login.module.css";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { useContext } from "react";
import { TokenContext } from "../../Context/TokenContext";

export default function Login() {
  let navigate = useNavigate();
  let [isLoading, setIsLoading] = useState(false);
  let [apiResponse, setAPIResponse] = useState({ message: "", status: "" });
  let { setToken } = useContext(TokenContext);

  async function login(values) {
    try {
      console.log(values);
      setIsLoading(true);
      let { data } = await axios.post(
        "https://sara7aiti.onrender.com/api/v1/user/signin",
        values
      );
      console.log(data);
      setIsLoading(false);
      setAPIResponse({ message: data.message, status: "success" });
      localStorage.setItem("userToken", data.token);
      setToken(data.token);
      navigate("/profile");
    } catch (err) {
      console.log(err.response.data.error);
      setIsLoading(false);
      setAPIResponse({ message: err.response.data.error, status: "error" });
    }
  }

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .matches(/^[A-Z]/, "Password should start with an uppercase letter")
      .matches(/^.{4,}$/, "Password should be more than 3 characters")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      login(values);
    },
  });

  return (
    <div className="container my-5">
      <div className="user my-3">
        <h4 className="text-center">
          <i className="far fa-edit user-icon" />
          &nbsp;Login to read your whispers
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

          <button
            type="submit"
            className="btn btn-outline-dark my-4 w-100 rounded"
          >
            {isLoading ? (
              <Spinner animation="border" variant="secondary" />
            ) : (
              "Login"
            )}
          </button>

          <h6 className="text-center">
            Don't have an account?
            <Link to={"/register"} className="link-dark fw-bold">
              Register
            </Link>
          </h6>
        </form>
      </div>
    </div>
  );
}
