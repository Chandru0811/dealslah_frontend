import React, { forwardRef, useImperativeHandle, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  cpassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

const Form1 = forwardRef(
  ({ formData, setFormData, handleNext, setLoadIndicators }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const formik = useFormik({
      initialValues: {
        name: "",
        email: "",
        password: "",
        cpassword: "",
      },
      validationSchema: validationSchema,
      onSubmit: async (data) => {
        console.log("Form Data", data);
        handleNext();
      },
    });

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
      setShowConfirmPassword(!showConfirmPassword);
    };

    useImperativeHandle(ref, () => ({
      form1: formik.handleSubmit,
    }));

    return (
      <div className="container-fluid py-5">
        <form onSubmit={formik.handleSubmit} className="w-100">
          <div className="row d-flex justify-content-center">
            <div className="col-md-12 col-12">
              <div className="row">
                <div className="col-12">
                  <div className="mb-3">
                    <label className="form-label">
                      Name<span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className={`form-control ${
                        formik.touched.name && formik.errors.name
                          ? "is-invalid"
                          : ""
                      }`}
                      name="name"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.name}
                    />
                    {formik.touched.name && formik.errors.name && (
                      <div className="error text-danger ">
                        <small>{formik.errors.name}</small>
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-12">
                  <div className="mb-3">
                    <label className="form-label">
                      E-mail<span className="text-danger">*</span>
                    </label>
                    <input
                      type="email"
                      className={`form-control ${
                        formik.touched.email && formik.errors.email
                          ? "is-invalid"
                          : ""
                      }`}
                      name="email"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.email}
                    />
                    {formik.touched.email && formik.errors.email && (
                      <div className="error text-danger ">
                        <small>{formik.errors.email}</small>
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-12">
                  <div className="mb-3">
                    <label className="form-label">
                      Password<span className="text-danger">*</span>
                    </label>
                    <div className="input-group">
                      <input
                        type={showPassword ? "text" : "password"}
                        className={`form-control ${
                          formik.touched.password && formik.errors.password
                            ? "is-invalid"
                            : ""
                        }`}
                        name="password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                      />
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={togglePasswordVisibility}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                    {formik.touched.password && formik.errors.password && (
                      <div className="error text-danger">
                        <small>{formik.errors.password}</small>
                      </div>
                    )}
                  </div>
                </div>

                <div className="col-12">
                  <div className="mb-3">
                    <label className="form-label">
                      Confirm Password<span className="text-danger">*</span>
                    </label>
                    <div className="input-group">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        className={`form-control ${
                          formik.touched.cpassword && formik.errors.cpassword
                            ? "is-invalid"
                            : ""
                        }`}
                        name="cpassword"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.cpassword}
                      />
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={toggleConfirmPasswordVisibility}
                      >
                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                    {formik.touched.cpassword && formik.errors.cpassword && (
                      <div className="error text-danger">
                        <small>{formik.errors.cpassword}</small>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
);

export default Form1;
