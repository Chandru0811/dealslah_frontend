import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { FaInfoCircle } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";
import { FiAlertTriangle } from "react-icons/fi";

// Define the validation schema to match form fields
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  account_holder: Yup.string().required("Account Holder is required"),
  account_type: Yup.string().required("Account Type is required"),
  account_number: Yup.string().required("Account Number is required"),
  bank_name: Yup.string().required("Bank Name is required"),
  account_address: Yup.string().required("Bank Address is required"),
  bank_code: Yup.string().required("Bank Code is required"),
  // check_account: Yup.boolean()
  //   .oneOf([true], "You must agree to the terms")
  //   .required("Agreement to terms is required"),
});

const Form2 = forwardRef(
  ({ formData, setFormData, handleNext, setLoadIndicators }, ref) => {
    const navigate = useNavigate();
    const formik = useFormik({
      initialValues: {
        email: "",
        account_holder: "",
        account_type: "",
        check_account: false,
        account_number: "",
        bank_name: "",
        account_address: "",
        bank_code: "",
      },
      validationSchema: validationSchema,
      onSubmit: async (data) => {
        console.log("Form Data", data);
        const completeFormData = { ...formData, ...data };
        try {
          const token = `eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5ZDAxZTAyMy0zNDI0LTRhMjMtYjIxNS0yZGNhMWY4NzU3OTQiLCJqdGkiOiI2MzdlODMzZTRjNjU1MzRmYjBkM2NiNmUwNDk0OGNkZTc5Y2NjMzkwY2FlZTA0ZjkzNmMyMDFlMGUwNDRiOGJhZjRiMjMxMzBlMGEzY2Y0OCIsImlhdCI6MTcyNjQ4NzQyOC42ODI3NCwibmJmIjoxNzI2NDg3NDI4LjY4Mjc0NiwiZXhwIjoxNzU4MDIzNDI4LjY3NjA1Niwic3ViIjoiNSIsInNjb3BlcyI6W119.BTa1CBsCXTcKlgoGm9-cnmO6pX_tXdtoDOX62VE8hHES2A1l6_T7HuAxQLpjBxgpg-8d8eml6BTELPyRUJaKUTIvFrpdzuOnzhoPK_FwlZsOUMwhYKlQ0MagMqje2uyR-nb3kmIalj0hs0nLrCoC6o9fKElJg1rHxwkJUy0ZebGvX45FdTrOVux4V7S4exT1Q3Nom2snwUSvdhFiyq0f81hcP1rLi8uLPGGwGREzY8tkADWNWGMow493zLNeHEFQEfQrYAuTNAfdyxeG4n3sYAwwA4IP8KVzK0gPouZa3LdnJMNVkUC7Eh0rHxBb2xKjcvK_mEIHCI9OlEkIvkb_MypkjLkhJAHgfJU4UdSfeZmbhfPRao5yxTdxwYFl_QWbGgnNmBLzZV7oqrk1UmZwGbCe-ThnvcZyGzAJRziN10oMb73B_3UwhBoatLg-72XN4492i1-vRgFfbh4mQBCbb3Mrvj0EhqyMNShpx929-DugAFV26iIeBPC-9dpIgfPWnhEZsdr3AjI5rKoPwk-LC8qyGfoksPgwsn8tHeNWpqPZdZcNpGtW62BtoJkZD8puUFXEukcynxbQp-lvpT-MaHMeCm0ClG5c_62GvKXiv4PobVEOhKPh76bqOmTrW4SnPdM8DClFa9Trs6tjZM6lJvtKbiuLEO6hSF2PxM5dzPc`;
          const response = await axios.post(
            `https://sgitjobs.com/dealslah/public/api/vendor/shopregistration`,
            completeFormData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          console.log("Response", response);
          if (response.status === 200) {
            toast.success(response.data.message);
          } else {
            toast.error(response.data.message);
          }
          handleNext();
        } catch (error) {
          if (error.response.status === 422) {
            console.log("Full error response:", error.response);

            const errors = error.response.data.error;

            if (errors) {
              Object.keys(errors).map((key) => {
                errors[key].map((errorMsg) => {
                  toast(errorMsg, {
                    icon: <FiAlertTriangle className="text-warning" />,
                  });
                });
              });
            }
          } else {
            console.error("API Error", error);
            toast.error("An unexpected error occurred.");
          }
        }
      },
    });

    useImperativeHandle(ref, () => ({
      form2: formik.handleSubmit,
    }));

    return (
      <section className="container-fluid my-5">
        <form onSubmit={formik.handleSubmit} className="">
          <h4 className="text-primary mb-5">Payment setup</h4>
          <div className="row d-flex justify-content-center">
            <div className="col-md-12 col-12">
              <div className="row">
                <div className="col-12">
                  <div className="mb-3 row align-items-center">
                    <label className="col-md-4 form-label">
                      PayPal<span className="text-danger">*</span>
                    </label>
                    <div className="col-md-8 col-12">
                      <div className="mb-3">
                        {/* <label className="form-label">
                          E-mail<span className="text-danger">*</span>
                        </label> */}
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
                </div>
                <div className="col-12 mb-5">
                  <div className="row">
                    <div className="col-md-4 col-12 mb-3">
                      <label className=" form-label">
                        Bank Transfer<span className="text-danger">*</span>
                      </label>
                    </div>
                    <div className="col-md-8 col-12 border">
                      <div className="col-md-12">
                        <div className="mb-3">
                          <label className="form-label">Account Holder</label>
                          <input
                            type="text"
                            className={`form-control ${
                              formik.touched.account_holder &&
                              formik.errors.account_holder
                                ? "is-invalid"
                                : ""
                            }`}
                            name="account_holder"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.account_holder}
                          />
                          {formik.touched.account_holder &&
                            formik.errors.account_holder && (
                              <div className="error text-danger">
                                <small>{formik.errors.account_holder}</small>
                              </div>
                            )}
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="mb-3">
                          <label className="form-label">Account Type</label>
                          <input
                            type="text"
                            className={`form-control ${
                              formik.touched.account_type &&
                              formik.errors.account_type
                                ? "is-invalid"
                                : ""
                            }`}
                            name="account_type"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.account_type}
                          />
                          {formik.touched.account_type &&
                            formik.errors.account_type && (
                              <div className="error text-danger">
                                <small>{formik.errors.account_type}</small>
                              </div>
                            )}
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="mb-3">
                          <label className="form-label">Account Number</label>
                          <input
                            type="text"
                            className={`form-control ${
                              formik.touched.account_number &&
                              formik.errors.account_number
                                ? "is-invalid"
                                : ""
                            }`}
                            name="account_number"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.account_number}
                          />
                          {formik.touched.account_number &&
                            formik.errors.account_number && (
                              <div className="error text-danger">
                                <small>{formik.errors.account_number}</small>
                              </div>
                            )}
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="mb-3">
                          <label className="form-label">Bank Name</label>
                          <input
                            type="text"
                            className={`form-control ${
                              formik.touched.bank_name &&
                              formik.errors.bank_name
                                ? "is-invalid"
                                : ""
                            }`}
                            name="bank_name"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.bank_name}
                          />
                          {formik.touched.bank_name &&
                            formik.errors.bank_name && (
                              <div className="error text-danger">
                                <small>{formik.errors.bank_name}</small>
                              </div>
                            )}
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="mb-3">
                          <label className="form-label">Bank Address</label>
                          <input
                            type="text"
                            className={`form-control ${
                              formik.touched.account_address &&
                              formik.errors.account_address
                                ? "is-invalid"
                                : ""
                            }`}
                            name="account_address"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.account_address}
                          />
                          {formik.touched.account_address &&
                            formik.errors.account_address && (
                              <div className="error text-danger">
                                <small>{formik.errors.account_address}</small>
                              </div>
                            )}
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="mb-3">
                          <label className="form-label">Bank Code</label>
                          <input
                            type="text"
                            className={`form-control ${
                              formik.touched.bank_code &&
                              formik.errors.bank_code
                                ? "is-invalid"
                                : ""
                            }`}
                            name="bank_code"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.bank_code}
                          />
                          {formik.touched.bank_code &&
                            formik.errors.bank_code && (
                              <div className="error text-danger">
                                <small>{formik.errors.bank_code}</small>
                              </div>
                            )}
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="mb-3">
                          <div className="form-check">
                            <input
                              type="checkbox"
                              className={`form-check-input ${
                                formik.touched.check_account &&
                                formik.errors.check_account
                                  ? "is-invalid"
                                  : ""
                              }`}
                              id="check_account"
                              name="check_account"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              // checked={formik.values.check_account}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="check_account"
                            >
                              I attest i am the owner and have full
                              authorization to this bank account
                            </label>
                            {/* {formik.touched.check_account &&
                              formik.errors.check_account && (
                                <div className="error text-danger">
                                  <small>{formik.errors.check_account}</small>
                                </div>
                              )} */}
                          </div>
                        </div>
                      </div>
                      <div className="notification-container mb-3">
                        <div className="icon">
                          <FaInfoCircle color="#F39C12" size={24} />
                        </div>
                        <div className="message">
                          <strong>
                            Please double-check your account information!
                          </strong>
                          <br />
                          Incorrect or mismatched account name and number can
                          result in withdrawal delays and fees.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    );
  }
);

export default Form2;
