import React, { forwardRef, useImperativeHandle } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FaStar } from "react-icons/fa";

const validationSchema = Yup.object().shape({
  legal_name: Yup.string().required("Legal Name is required"),
  slug: Yup.string().required("Slug is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("E-mail is required"),
  mobile: Yup.string().required("Mobile is required"),
  external_url: Yup.string()
    .url("Invalid URL")
    .required("External URL is required"),
  street: Yup.string().required("Street 1 is required"),
  street2: Yup.string().required("Street 2 is required"),
  city: Yup.string().required("City is required"),
  zip_code: Yup.string().required("Zip Code is required"),
  country: Yup.string().required("Country is required"),
  state: Yup.string().required("State is required"),
  rating: Yup.number()
    .min(1, "Minimum rating is 1")
    .max(5, "Maximum rating is 5")
    .required("Rating is required"),
  shop_type: Yup.string()
    .oneOf(["product", "service"], "Invalid Shop Type")
    .required("Shop Type is required"),
});

const Form1 = forwardRef(
  ({ formData, setFormData, handleNext, setLoadIndicators }, ref) => {
    const formik = useFormik({
      initialValues: {
        legal_name: "",
        slug: "",
        email: "",
        mobile: "",
        external_url: "",
        street: "",
        street2: "",
        city: "",
        zip_code: "",
        country: "",
        state: "",
        rating: 0,
        shop_type: "",
      },
      // validationSchema: validationSchema,
      onSubmit: async (data) => {
        console.log("Form Data", data);
        handleNext();
      },
    });

    const handleStarClick = (rating) => {
      formik.setFieldValue("rating", rating);
    };

    useImperativeHandle(ref, () => ({
      form1: formik.handleSubmit,
    }));

    return (
      <div className="container-fluid py-5">
        <form onSubmit={formik.handleSubmit} className="w-100">
          
          <div className="row d-flex justify-content-center mt-5">
            <div className="col-md-12 col-12">
              <div className="row">
                {/* Legal Name */}
                <div className="col-12">
                  <div className="mb-3 row align-items-center">
                    <label className="col-md-4 form-label">
                      Legal Name<span className="text-danger">*</span>
                    </label>
                    <div className="col-md-8">
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
                      {formik.touched.legal_name &&
                        formik.errors.legal_name && (
                          <div className="error text-danger">
                            <small>{formik.errors.legal_name}</small>
                          </div>
                        )}
                    </div>
                  </div>
                </div>

                {/* Slug */}
                <div className="col-12">
                  <div className="mb-3 row align-items-center">
                    <label className="col-md-4 form-label">
                      Slug<span className="text-danger">*</span>
                    </label>
                    <div className="col-md-8">
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
                        <div className="error text-danger">
                          <small>{formik.errors.slug}</small>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* E-mail */}
                <div className="col-12">
                  <div className="mb-3 row align-items-center">
                    <label className="col-md-4 form-label">
                      E-mail<span className="text-danger">*</span>
                    </label>
                    <div className="col-md-8">
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
                  </div>
                </div>

                {/* Mobile */}
                <div className="col-12">
                  <div className="mb-3 row align-items-center">
                    <label className="col-md-4 form-label">
                      Mobile<span className="text-danger">*</span>
                    </label>
                    <div className="col-md-8">
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
                  </div>
                </div>

                {/* External URL */}
                <div className="col-12">
                  <div className="mb-3 row align-items-center">
                    <label className="col-md-4 form-label">
                      External Url<span className="text-danger">*</span>
                    </label>
                    <div className="col-md-8">
                      <input
                        type="text"
                        className={`form-control ${
                          formik.touched.external_url &&
                          formik.errors.external_url
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
                          <div className="error text-danger">
                            <small>{formik.errors.external_url}</small>
                          </div>
                        )}
                    </div>
                  </div>
                </div>

                {/* Street 1 */}
                <div className="col-12">
                  <div className="mb-3 row align-items-center">
                    <label className="col-md-4 form-label">
                      Street 1<span className="text-danger">*</span>
                    </label>
                    <div className="col-md-8">
                      <input
                        type="text"
                        className={`form-control ${
                          formik.touched.street && formik.errors.street
                            ? "is-invalid"
                            : ""
                        }`}
                        name="street"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.street}
                      />
                      {formik.touched.street && formik.errors.street && (
                        <div className="error text-danger">
                          <small>{formik.errors.street}</small>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Street 2 */}
                <div className="col-12">
                  <div className="mb-3 row align-items-center">
                    <label className="col-md-4 form-label">
                      Street 2<span className="text-danger">*</span>
                    </label>
                    <div className="col-md-8">
                      <input
                        type="text"
                        className={`form-control ${
                          formik.touched.street2 && formik.errors.street2
                            ? "is-invalid"
                            : ""
                        }`}
                        name="street2"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.street2}
                      />
                      {formik.touched.street2 && formik.errors.street2 && (
                        <div className="error text-danger">
                          <small>{formik.errors.street2}</small>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* City */}
                <div className="col-12">
                  <div className="mb-3 row align-items-center">
                    <label className="col-md-4 form-label">
                      City<span className="text-danger">*</span>
                    </label>
                    <div className="col-md-8">
                      <input
                        type="text"
                        className={`form-control ${
                          formik.touched.city && formik.errors.city
                            ? "is-invalid"
                            : ""
                        }`}
                        name="city"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.city}
                      />
                      {formik.touched.city && formik.errors.city && (
                        <div className="error text-danger">
                          <small>{formik.errors.city}</small>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Zip Code */}
                <div className="col-12">
                  <div className="mb-3 row align-items-center">
                    <label className="col-md-4 form-label">
                      Zip Code<span className="text-danger">*</span>
                    </label>
                    <div className="col-md-8">
                      <input
                        type="text"
                        className={`form-control ${
                          formik.touched.zip_code && formik.errors.zip_code
                            ? "is-invalid"
                            : ""
                        }`}
                        name="zip_code"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.zip_code}
                      />
                      {formik.touched.zip_code && formik.errors.zip_code && (
                        <div className="error text-danger">
                          <small>{formik.errors.zip_code}</small>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Country */}
                <div className="col-12">
                  <div className="mb-3 row align-items-center">
                    <label className="col-md-4 form-label">
                      Country<span className="text-danger">*</span>
                    </label>
                    <div className="col-md-8">
                      <input
                        type="text"
                        className={`form-control ${
                          formik.touched.country && formik.errors.country
                            ? "is-invalid"
                            : ""
                        }`}
                        name="country"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.country}
                      />
                      {formik.touched.country && formik.errors.country && (
                        <div className="error text-danger">
                          <small>{formik.errors.country}</small>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* State */}
                <div className="col-12">
                  <div className="mb-3 row align-items-center">
                    <label className="col-md-4 form-label">
                      State<span className="text-danger">*</span>
                    </label>
                    <div className="col-md-8">
                      <input
                        type="text"
                        className={`form-control ${
                          formik.touched.state && formik.errors.state
                            ? "is-invalid"
                            : ""
                        }`}
                        name="state"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.state}
                      />
                      {formik.touched.state && formik.errors.state && (
                        <div className="error text-danger">
                          <small>{formik.errors.state}</small>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  <div className="mb-3 row align-items-center">
                    <label className="col-md-4 form-label ">
                      Rating<span className="text-danger">*</span>
                    </label>
                    <div className="col-md-8 rating ">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <FaStar
                          key={star}
                          className={`star ${
                            formik.values.rating >= star ? "filled" : ""
                          }`}
                          onClick={() => handleStarClick(star)}
                        />
                      ))}
                    </div>
                    {formik.touched.rating && formik.errors.rating && (
                      <div className="error text-danger">
                        <small>{formik.errors.rating}</small>
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
