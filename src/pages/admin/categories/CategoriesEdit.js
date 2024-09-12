import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";

function CategoriesEdit() {
  const [loadIndicator, setLoadIndicator] = useState(false);

  const validationSchema = Yup.object({
    groupId: Yup.string().required("*Select an groupId"),
    activeStatus: Yup.string().required("*Select an Status"),
    description: Yup.string().required("*Description is required"),
    name: Yup.string().required("*name is required"),
    slug: Yup.string().required("*name Label is required"),
  });

  const formik = useFormik({
    initialValues: {
      groupId: "",
      activeStatus: "",
      description: "",
      name: "",
      slug: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("Form Data:", values);
    },
  });

  return (
    <section className="px-4">
      <div
        className="container card shadow bgroupId-0"
        style={{ minHeight: "90vh" }}
      >
        <form onSubmit={formik.handleSubmit}>
          <div className="row p-2">
            <div className="d-flex justify-content-between align-items-center">
              <h1 className="">Edit Category</h1>
              <div>
                <Link to="/categories">
                  <button type="button" className="btn btn-light btn-sm">
                    <span>Back</span>
                  </button>
                </Link>
                <button type="submit" className="btn btn-sm btn-button">
                  {loadIndicator && (
                    <span
                      className="spinner-bgroupId spinner-bgroupId-sm me-2"
                      aria-hidden="true"
                    ></span>
                  )}
                  Save
                </button>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="row">
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  Category Group Id<span className="text-danger">*</span>
                </label>
                <select
                  aria-label="Default select example"
                  className={`form-select ${
                    formik.touched.groupId && formik.errors.groupId
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("groupId")}
                >
                  <option value="">Select an group</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                </select>
                {formik.touched.groupId && formik.errors.groupId && (
                  <div className="invalid-feedback">
                    {formik.errors.groupId}
                  </div>
                )}
              </div>
              <div className="col-md-6 col-12 mb-3">
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
                  {...formik.getFieldProps("name")}
                />
                {formik.touched.name && formik.errors.name && (
                  <div className="invalid-feedback">{formik.errors.name}</div>
                )}
              </div>
              <div className="col-md-6 col-12 mb-3">
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
                  {...formik.getFieldProps("slug")}
                />
                {formik.touched.slug && formik.errors.slug && (
                  <div className="invalid-feedback">{formik.errors.slug}</div>
                )}
              </div>
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  Active<span className="text-danger">*</span>
                </label>
                <select
                  aria-label="Default select example"
                  className={`form-select ${
                    formik.touched.activeStatus && formik.errors.activeStatus
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("activeStatus")}
                >
                  <option value="">Select an option</option>
                  <option value="1">active</option>
                  <option value="2">inactive</option>
                </select>
                {formik.touched.activeStatus && formik.errors.activeStatus && (
                  <div className="invalid-feedback">
                    {formik.errors.activeStatus}
                  </div>
                )}
              </div>
              <div className="col-md-12 col-12 mb-3">
                <label className="form-label">
                  Description<span className="text-danger">*</span>
                </label>
                <textarea
                  rows={5}
                  className={`form-control ${
                    formik.touched.description && formik.errors.description
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("description")}
                />
                {formik.touched.description && formik.errors.description && (
                  <div className="invalid-feedback">
                    {formik.errors.description}
                  </div>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

export default CategoriesEdit;
