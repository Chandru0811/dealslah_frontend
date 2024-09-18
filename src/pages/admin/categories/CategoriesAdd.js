import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import api from "../../../config/URL";
import toast from "react-hot-toast";

function CategoriesAdd() {
  const [loadIndicator, setLoadIndicator] = useState(false);
  const navigate = useNavigate();
  const [datas, setDatas] = useState([]);

  const validationSchema = Yup.object({
    category_group_id: Yup.string().required("*Select an groupId"),
    activeStatus: Yup.string().required("*Select an Status"),
    description: Yup.string().required("*Description is required"),
    name: Yup.string().required("*name is required"),
    slug: Yup.string().required("*name Label is required"),
  });

  const formik = useFormik({
    initialValues: {
      category_group_id: "",
      activeStatus: "",
      description: "",
      name: "",
      slug: "",
    },
    // validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log("Form Data:", values);
      setLoadIndicator(true);
      try {
        const response = await api.post(`/admin/categories`, values, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.status === 200) {
          toast.success(response.data.message);
          navigate("/categories");
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error(error.message || "An error occurred");
      } finally {
        setLoadIndicator(false);
      }
    },
  });
  useEffect(() => {
    const fetchData = async () => {
      // setLoading(true);
      try {
        const response = await api.get("/admin/categoryGroup");
        setDatas(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <section className="px-4">
      <form onSubmit={formik.handleSubmit}>
        <div className="card shadow border-0 mb-2 top-header">
          <div className="container-fluid py-4">
            <div className="row align-items-center">
              <div className="col">
                <h1 className="h4 ls-tight headingColor">Add Category</h1>
              </div>
              <div className="col-auto">
                <div className="hstack gap-2 justify-content-end">
                  <Link to="/categories">
                    <button type="button" className="btn btn-light btn-sm">
                      Back
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="card shadow border-0 my-2"
          style={{ minHeight: "80vh" }}
        >
          <div className="container mb-5">
            <div className="row py-4">
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  Category Group Id<span className="text-danger">*</span>
                </label>
                <select
                  aria-label="Default select example"
                  className={`form-select ${
                    formik.touched.category_group_id &&
                    formik.errors.category_group_id
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("category_group_id")}
                >
                  <option value=""></option>
                  {datas &&
                    datas.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                </select>
                {formik.touched.category_group_id &&
                  formik.errors.category_group_id && (
                    <div className="invalid-feedback">
                      {formik.errors.category_group_id}
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
        </div>
        <div className="col-auto">
          <div className="hstack gap-2 justify-content-end">
            <button
              type="submit"
              className="btn btn-sm btn-button"
              disabled={loadIndicator}
            >
              {loadIndicator && (
                <span
                  className="spinner-border spinner-border-sm me-2"
                  aria-hidden="true"
                ></span>
              )}
              Submit
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}

export default CategoriesAdd;
