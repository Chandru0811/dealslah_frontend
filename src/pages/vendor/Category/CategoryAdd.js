import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import axios from "axios";
import { FiAlertTriangle } from "react-icons/fi"; // Ensure you import any missing icons
import toast from "react-hot-toast";
import api from "../../../config/URL";

function CategoryAdd() {
    const [loadIndicator, setLoadIndicator] = useState(false);

    const validationSchema = Yup.object({
        groupId: Yup.string().required("*Select an groupId"),
        activeStatus: Yup.string().required("*Select a Status"),
        description: Yup.string().required("*Description is required"),
        name: Yup.string().required("*Name is required"),
        slug: Yup.string().required("*Name Label is required"),
    });

    const formik = useFormik({
        initialValues: {
            groupId: "",
            activeStatus: "",
            description: "",
            name: "",
            slug: "",
        },
        // validationSchema: validationSchema,
        onSubmit: async (values) => {
            setLoadIndicator(true); // Set loading indicator on submit
            console.log("Form Data:", values);
            const completeFormData = { ...values };
            try {
                // const token = `eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJjaGFuZHJ1ZWNzMDAxQGVjc2Nsb3VkaW5mb3RlY2guY29tIiwiaWF0IjoxNzI2MjA2NTQ4LCJleHAiOjE3MzEzOTA1NDh9.z1IzI24w84iaVH7ZZ_CKh-9GLldtXY4P3glPvOR8HiKsY-n_BvjngTRbg4svAbwMKMAhbKIWp6f5Fzp8kr1IpA`;
                const response = await api.post(
                    `admin/categories`,
                    completeFormData,
                    // {
                    //     headers: {
                    //         Authorization: `Bearer ${token}`,
                    //     },
                    // }
                );
                console.log("Response", response);
                if (response.status === 200) {
                    toast.success(response.data.message);
                } else {
                    toast.error(response.data.message);
                }
                // Handle next steps or redirect after successful submit
            } catch (error) {
                if (error.response && error.response.status === 422) {
                    console.log("Full error response:", error.response);
                    const errors = error.response.data.error;
                    if (errors) {
                        Object.keys(errors).forEach((key) => {
                            errors[key].forEach((errorMsg) => {
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
            } finally {
                setLoadIndicator(false); // Reset loading indicator after submit
            }
        },
    });

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
                                    <Link to="/category">
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
                                    className={`form-select ${formik.touched.groupId && formik.errors.groupId
                                        ? "is-invalid"
                                        : ""
                                        }`}
                                    {...formik.getFieldProps("groupId")}
                                >
                                    <option value="">Select a group</option>
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
                                    className={`form-control ${formik.touched.name && formik.errors.name
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
                                    className={`form-control ${formik.touched.slug && formik.errors.slug
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
                                    Active Status<span className="text-danger">*</span>
                                </label>
                                <select
                                    aria-label="Default select example"
                                    className={`form-select ${formik.touched.activeStatus && formik.errors.activeStatus
                                        ? "is-invalid"
                                        : ""
                                        }`}
                                    {...formik.getFieldProps("activeStatus")}
                                >
                                    <option value="">Select an option</option>
                                    <option value="1">Active</option>
                                    <option value="2">Inactive</option>
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
                                    className={`form-control ${formik.touched.description && formik.errors.description
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

export default CategoryAdd;
