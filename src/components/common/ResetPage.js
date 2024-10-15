import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

// Updated validation schema
const validationSchema = Yup.object({
  email: Yup.string()
    .email("*Invalid email address")
    .required("*Email is required"),
  password: Yup.string().required("*Password is required"),
  cpassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "*Passwords must match")
    .required("*Confirm Password is required"),
});

const ResetPage = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "suriya@gmail.com",
      password: "",
      cpassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("Password:", values.password);
      console.log("Confirm Password:", values.cpassword);
      // navigate("/reset");
    },
  });

  // UseEffect to set the email field as touched
  useEffect(() => {
    formik.setFieldTouched("email", true, false); // Set email field as touched
  }, []);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  return (
    <section style={{}}>
      <div
        className="container-fluid d-flex justify-content-center align-items-center"
        style={{ backgroundColor: "rgb(242, 242, 242)", minHeight: "100vh" }}
      >
        <div className="row">
          <div
            className="card shadow-lg p-3 my-5 rounded"
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
                      : ""
                  }`}
                  placeholder="Email Address"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  readOnly
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
                        : ""
                    }`}
                    placeholder="Password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    // onBlur={formik.handleBlur}
                  />
                  <span
                    className="input-group-text"
                    id="basic-addon2"
                    onClick={togglePasswordVisibility}
                    style={{ cursor: "pointer" }}
                  >
                    {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                  </span>
                  {formik.touched.password && formik.errors.password && (
                    <div className="invalid-feedback mt-0">
                      {formik.errors.password}
                    </div>
                  )}
                </div>
              </div>
              <div className="form-group mb-4 mt-2">
                <label className="form-label" htmlFor="Cpassword">
                  Confirm Password
                </label>
                <div className="input-group mb-3">
                  <input
                    type={confirmPasswordVisible ? "text" : "password"}
                    id="cpassword"
                    name="cpassword"
                    className={`form-control rounded-0 ${
                      formik.touched.cpassword && formik.errors.cpassword
                        ? "is-invalid"
                        : ""
                    }`}
                    placeholder="Confirm Password"
                    value={formik.values.cpassword}
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
                  {formik.touched.cpassword && formik.errors.cpassword && (
                    <div className="invalid-feedback mt-0">
                      {formik.errors.cpassword}
                    </div>
                  )}
                </div>
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
              <Link to="/">
                <p className="text-muted" style={{ fontSize: "0.9rem" }}>
                  Go Back to &nbsp;
                  <span style={{ color: "#ef4444" }}>Login In</span>
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResetPage;
