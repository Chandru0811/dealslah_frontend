import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("*Invalid email address")
    .required("*Email is required"),
  password: Yup.string().required("*Password is required"),
  Cpassword: Yup.string().required("*Confirm Password is required"),
});

const ResetPage = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      Cpassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("values", values);
      navigate("/resetpassword");
    },
  });

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  return (
    <section>
      <div
        className="container-fluid d-flex justify-content-center align-items-center vh-100"
        style={{ backgroundColor: "rgb(242, 242, 242)" }}
      >
        <div className="row">
          <div
            className="card shadow-lg p-3 mb-5 rounded"
            style={{ width: "100%", maxWidth: "400px" }}
          >
            <h3
              className="cursor-pointer py-2 mb-3"
              style={{
                borderBottom: "2px solid #ef4444",
                paddingBottom: "5px",
                width: "100%",
                textAlign: "center",
                color: "#ef4444",
              }}
            >
              Reset Password
            </h3>
            <p
              className="text-center text-muted mb-4"
              style={{ fontSize: "0.9rem" }}
            >
              Please enter your new password below to complete the reset.
            </p>

            <form onSubmit={formik.handleSubmit}>
              <div className="form-group mb-4 mt-2">
                <label className="form-label" htmlFor="email">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className={`form-control rounded-0 ${
                    formik.touched.email && formik.errors.email
                      ? "is-invalid"
                      : formik.touched.email && !formik.errors.email
                      ? "is-valid"
                      : ""
                  }`}
                  placeholder="Email Address"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  disabled // Keep email disabled
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="invalid-feedback mt-0">
                    {formik.errors.email}
                  </div>
                ) : null}
              </div>

              <div className="form-group mb-4 mt-2">
                <label className="form-label" htmlFor="password">
                  Password
                </label>
                <div className="input-group mb-3">
                  <input
                    type={passwordVisible ? "text" : "password"}
                    id="password"
                    name="password"
                    className={`form-control ${
                      formik.touched.password && formik.errors.password
                        ? "is-invalid"
                        : formik.touched.password && !formik.errors.password
                        ? "is-valid"
                        : ""
                    }`}
                    placeholder="Password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <span
                    className="input-group-text"
                    id="basic-addon2"
                    onClick={togglePasswordVisibility}
                    style={{ cursor: "pointer" }}
                  >
                    {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
                {formik.touched.password && formik.errors.password ? (
                  <div className="invalid-feedback mt-0">
                    {formik.errors.password}
                  </div>
                ) : null}
              </div>

              <div className="form-group mb-4 mt-2">
                <label className="form-label" htmlFor="Cpassword">
                  Confirm Password
                </label>
                <div className="input-group mb-3">
                  <input
                    type={confirmPasswordVisible ? "text" : "password"}
                    id="Cpassword"
                    name="Cpassword"
                    className={`form-control rounded-0 ${
                      formik.touched.Cpassword && formik.errors.Cpassword
                        ? "is-invalid"
                        : formik.touched.Cpassword && !formik.errors.Cpassword
                        ? "is-valid"
                        : ""
                    }`}
                    placeholder="Confirm Password"
                    value={formik.values.Cpassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <span
                    className="input-group-text"
                    id="basic-addon2"
                    onClick={toggleConfirmPasswordVisibility}
                    style={{ cursor: "pointer" }}
                  >
                    {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
                {formik.touched.Cpassword && formik.errors.Cpassword ? (
                  <div className="invalid-feedback mt-0">
                    {formik.errors.Cpassword}
                  </div>
                ) : null}
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-block mt-3 rounded-0 w-100"
                style={{ backgroundColor: "#ef4444", borderColor: "#ef4444" }}
              >
                RESET PASSWORD
              </button>
            </form>

            <div className="text-center mt-3 mb-4">
              <p className="text-muted" style={{ fontSize: "0.9rem" }}>
                Go Back to &nbsp;
                <span style={{ color: "#ef4444" }}>Login In</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResetPage;
