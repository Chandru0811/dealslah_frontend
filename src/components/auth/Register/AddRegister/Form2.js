import React, { forwardRef, useImperativeHandle, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

// Define the validation schema to match form fields
const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  legal_name: Yup.string().required("Legal Name is required"),
  slug: Yup.string().required("Slug is required"),
  external_url: Yup.string().required("External URL is required"),
  address: Yup.string().required("Address is required"),
  description: Yup.string().required("Description is required"),
});

const Form2 = forwardRef(
  ({ formData, setFormData, handleNext, setLoadIndicators }, ref) => {
    const navigate = useNavigate();
    const formik = useFormik({
      initialValues: {
        name: "",
        email: "",
        legal_name: "",
        slug: "",
        external_url: "",
        address: "",
        description: "",
      },
      validationSchema: validationSchema,
      onSubmit: async (data) => {
        console.log("Form Data", data);
        navigate("/")
        handleNext();
      },
    });

    useImperativeHandle(ref, () => ({
      form2: formik.handleSubmit,
    }));

    return (
      <form onSubmit={formik.handleSubmit}>
        <div className="row d-flex justify-content-center mt-5">
          <div className="col-md-12 col-12">
            <div className="row">
              <div className="col-md-6 col-12">
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
              <div className="col-md-6 col-12">
                <div className="mb-3">
                  <label className="form-label">
                    Legal Name<span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      formik.touched.legal_name && formik.errors.legal_name
                        ? "is-invalid"
                        : ""
                    }`}
                    name="legal_name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.legal_name}
                  />
                  {formik.touched.legal_name && formik.errors.legal_name && (
                    <div className="error text-danger ">
                      <small>{formik.errors.legal_name}</small>
                    </div>
                  )}
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="mb-3">
                  <label className="form-label">
                    Slug<span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      formik.touched.slug && formik.errors.slug
                        ? "is-invalid"
                        : ""
                    }`}
                    name="slug"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.slug}
                  />
                  {formik.touched.slug && formik.errors.slug && (
                    <div className="error text-danger ">
                      <small>{formik.errors.slug}</small>
                    </div>
                  )}
                </div>
              </div>
              <div className="col-md-6 col-12">
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
              <div className="col-md-6 col-12">
                <div className="mb-3">
                  <label className="form-label">
                    External Url<span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      formik.touched.external_url && formik.errors.external_url
                        ? "is-invalid"
                        : ""
                    }`}
                    name="external_url"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.external_url}
                  />
                  {formik.touched.external_url &&
                    formik.errors.external_url && (
                      <div className="error text-danger ">
                        <small>{formik.errors.external_url}</small>
                      </div>
                    )}
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="mb-3">
                  <label className="form-label">
                    Address<span className="text-danger">*</span>
                  </label>
                  <textarea
                    className={`form-control ${
                      formik.touched.address && formik.errors.address
                        ? "is-invalid"
                        : ""
                    }`}
                    name="address"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.address}
                  />
                  {formik.touched.address && formik.errors.address && (
                    <div className="error text-danger ">
                      <small>{formik.errors.address}</small>
                    </div>
                  )}
                </div>
              </div>
              <div className="col-md-12 col-12">
                <div className="mb-3">
                  <label className="form-label">
                    Description<span className="text-danger">*</span>
                  </label>
                  <textarea
                    className={`form-control ${
                      formik.touched.description && formik.errors.description
                        ? "is-invalid"
                        : ""
                    }`}
                    name="description"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.description}
                  />
                  {formik.touched.description && formik.errors.description && (
                    <div className="error text-danger ">
                      <small>{formik.errors.description}</small>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    );
  }
);

export default Form2;
