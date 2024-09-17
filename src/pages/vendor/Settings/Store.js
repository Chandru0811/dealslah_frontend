import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import toast from "react-hot-toast";
import api from "../../../config/URL";

const validationSchema = Yup.object({
  name: Yup.string().required("Shop Name is required!"),
  legal_name: Yup.string().required("Legal Name is required!"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  mobile: Yup.string()
    .matches(/^[0-9]+$/, "mobile number must be numeric")
    .required("mobile number is required!"),
  shopType: Yup.string().required("Shop Type is required!"),
  //   logo: Yup.mixed().required("Logo is required"),
  //   external_url: Yup.string().required("Banner Type is required!"),
  //   banner: Yup.mixed().required("Banner is required!"),
  description: Yup.string().required("Description is required!"),
});

const Store = () => {
  const [data, setData] = useState([]);
  const [loadIndicator, setLoadIndicator] = useState(false);
  const id = sessionStorage.getItem("id");

  const formik = useFormik({
    initialValues: {
      name: "",
      legal_name: "",
      email: "",
      mobile: "",
      shopType: "",
      logo: null,
      external_url: "",
      banner: null,
      description: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (data) => {
      setLoadIndicator(true);
      console.log("Form Data", data);
      try {
        const response = await api.put(`vendor/shop/update/${id}`, data, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.status === 200) {
          toast.success(response.data.message);
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoadIndicator(false);
      }
    },
  });

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.get(`vendor/shop/${id}`);
        setData(response.data);
        const shopData = response.data.data;
        formik.setValues({
          name: shopData.name || "",
          legal_name: shopData.legal_name || "",
          email: shopData.email || "",
          mobile: shopData.mobile || "",
          shopType: shopData.shop_type === "1" ? "product" : "service",
          description: shopData.description || "",
          external_url: shopData.external_url || "",
        });
      } catch (error) {
        toast.error("Error Fetching Data ", error);
      }
    };
    getData();
  }, [id]);

  return (
    <section>
      <form onSubmit={formik.handleSubmit} className="w-100">
        <div className="container">
          {/* <h3 className='text-primary py-3'>Generat Settings</h3> */}

          <div className="row">
            <div className="col-md-4 col-12 mb-5 ">
              <label className="form-label fw-bold">
                Shop Name<span className="text-danger">*</span>
              </label>
            </div>
            <div className="col-md-8 col-12 mb-5">
              <input
                type="text"
                className={`form-control ${
                  formik.touched.name && formik.errors.name ? "is-invalid" : ""
                }`}
                name="name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
              />
              {formik.touched.name && formik.errors.name && (
                <div className="error text-danger">
                  <small>{formik.errors.name}</small>
                </div>
              )}
            </div>
            <div className="col-md-4 col-12 mb-5">
              <label className="form-label fw-bold">
                Shop Legal Name<span className="text-danger">*</span>
              </label>
            </div>
            <div className="col-md-8 col-12 mb-5">
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
                <div className="error text-danger">
                  <small>{formik.errors.legal_name}</small>
                </div>
              )}
            </div>
            <div className="col-md-4 col-12 mb-5">
              <label className="form-label fw-bold">
                Shop Email<span className="text-danger">*</span>
              </label>
            </div>
            <div className="col-md-8 col-12 mb-5">
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
                <div className="error text-danger">
                  <small>{formik.errors.email}</small>
                </div>
              )}
            </div>
            <div className="col-md-4 col-12 mb-5">
              <label className="form-label fw-bold">
                Shop mobile<span className="text-danger">*</span>
              </label>
            </div>
            <div className="col-md-8 col-12 mb-5">
              <input
                type="text"
                className={`form-control ${
                  formik.touched.mobile && formik.errors.mobile
                    ? "is-invalid"
                    : ""
                }`}
                name="mobile"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.mobile}
              />
              {formik.touched.mobile && formik.errors.mobile && (
                <div className="error text-danger">
                  <small>{formik.errors.mobile}</small>
                </div>
              )}
            </div>

            <h3 className="text-primary py-3">Shop Brand Setup</h3>
            <div className="col-md-4 col-12 mb-5">
              <label className="form-label fw-bold">
                Shop Shop Type<span className="text-danger">*</span>
              </label>
            </div>
            <div className="col-md-8 col-12 mb-5">
              <select
                type="text"
                className={`form-select ${
                  formik.touched.shopType && formik.errors.shopType
                    ? "is-invalid"
                    : ""
                }`}
                name="shopType"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.shopType}
              >
                <option></option>
                <option value="product">Product</option>
                <option value="service">Service</option>
              </select>
              {formik.touched.shopType && formik.errors.shopType && (
                <div className="error text-danger">
                  <small>{formik.errors.shopType}</small>
                </div>
              )}
            </div>
            <div className="col-md-4 col-12 mb-5">
              <label className="form-label fw-bold">
                Shop Logo<span className="text-danger">*</span>
              </label>
            </div>
            <div className="col-md-8 col-12 mb-5">
              <input
                type="file"
                className={`form-control ${
                  formik.touched.logo && formik.errors.logo ? "is-invalid" : ""
                }`}
                name="logo"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.logo}
              />
              {formik.touched.logo && formik.errors.logo && (
                <div className="error text-danger">
                  <small>{formik.errors.logo}</small>
                </div>
              )}
            </div>
            <div className="col-md-4 col-12 mb-5">
              <label className="form-label fw-bold">
                External Url<span className="text-danger">*</span>
              </label>
            </div>
            <div className="col-md-8 col-12 mb-5">
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
              {formik.touched.external_url && formik.errors.external_url && (
                <div className="error text-danger">
                  <small>{formik.errors.external_url}</small>
                </div>
              )}
            </div>
            <div className="col-md-4 col-12 mb-5">
              <label className="form-label fw-bold">Shop Bannenr</label>
            </div>
            <div className="col-md-8 col-12 mb-5">
              <input
                type="file"
                className={`form-control ${
                  formik.touched.banner && formik.errors.banner
                    ? "is-invalid"
                    : ""
                }`}
                name="banner"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.banner}
              />
              {formik.touched.banner && formik.errors.banner && (
                <div className="error text-danger">
                  <small>{formik.errors.banner}</small>
                </div>
              )}
            </div>

            <div className="mb-3">
              <h5 className="mb-4 fw-bold">Shop Description</h5>
            </div>

            <div className="row align-items-center">
              <div className="col-12">
                <textarea
                  type="file"
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
                  <div className="error text-danger">
                    <small>{formik.errors.description}</small>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="text-end mt-4 mb-3">
          <button
            type="submit"
            className="btn btn-sm btn-outline-primary"
            disabled={loadIndicator}
          >
            {loadIndicator && (
              <span
                className="spinner-border spinner-border-sm me-2"
                aria-hidden="true"
              ></span>
            )}
            Update
          </button>
        </div>
      </form>
    </section>
  );
};

export default Store;
