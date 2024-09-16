import React from 'react'
import { useFormik } from "formik";
import * as Yup from "yup";
import { FaInfoCircle } from "react-icons/fa";

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

function Payment() {
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
        },
    });
    return (
        <section>
            <form onSubmit={formik.handleSubmit} className="w-100">
                <div className='container'>
                    <div className='row'>
                        <div className="col-md-4 col-12 mb-5">
                            <label className="form-label fw-bold"><span className="text-danger">*</span>
                                Paypal Email
                            </label>
                        </div>
                        <div className="col-md-8 col-12 mb-5">
                            <input
                                type="text"
                                className={`form-control ${formik.touched.email && formik.errors.email
                                    ? "is-invalid"
                                    : ""
                                    }`}
                                name="email"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.email}
                            />
                            {formik.touched.email &&
                                formik.errors.email && (
                                    <div className="error text-danger">
                                        <small>{formik.errors.email}</small>
                                    </div>
                                )}
                        </div>
                        <div className="col-md-4 col-12 mb-3">
                            <label className=" form-label fw-bold">
                                Bank Transfer<span className="text-danger">*</span>
                            </label>
                        </div>
                        <div className="col-md-8 col-12 border">
                            <div className="col-md-12">
                                <div className="mb-3">
                                    <label className="form-label">Account Holder</label>
                                    <input
                                        type="text"
                                        className={`form-control ${formik.touched.account_holder &&
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
                                        className={`form-control ${formik.touched.account_type && formik.errors.account_type
                                            ? "is-invalid"
                                            : ""
                                            }`}
                                        name="account_type"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.account_type}
                                    />
                                    {formik.touched.account_type && formik.errors.account_type && (
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
                                        className={`form-control ${formik.touched.account_number &&
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
                                        className={`form-control ${formik.touched.bank_name &&
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
                                        className={`form-control ${formik.touched.account_address &&
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
                                        className={`form-control ${formik.touched.bank_code &&
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
                                            className={`form-check-input ${formik.touched.check_account &&
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
                <div className="text-end mt-4 mb-3">
                    <button
                        type="submit"
                        className="btn btn-sm btn-outline-primary"
                    // disabled={loadIndicator}
                    >
                        {/* {loadIndicator && (
                            <span
                                className="spinner-border spinner-border-sm me-2"
                                aria-hidden="true"
                            ></span>
                        )} */}
                        Save
                    </button>
                </div>
            </form>
        </section >
    )
}

export default Payment