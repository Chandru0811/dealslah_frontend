import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

function CategoryGroupEdit() {
    const [loadIndicator, setLoadIndicator] = useState(false);

    const validationSchema = Yup.object({
        name: Yup.string().required("*Name is required"),
        slug: Yup.string().required("*Slug is required"),
        icon: Yup.string().required("*Image is required"),
        order: Yup.string().required("*Select an order"),
        active: Yup.string().required("*Select an active"),
    });

    const formik = useFormik({
        initialValues: {
            name: "Electronics",
            slug: "electronics",
            icon: null,
            order: "1",
            active: "Active",
            description: "Test",
        },
        validationSchema: validationSchema,
        onSubmit: async (values, { resetForm }) => {
            console.log("Category Group Datas:", values);
            resetForm();
        },
    });

    return (
        <div className="container-fluid minHeight m-0">
            <form onSubmit={formik.handleSubmit}>
                <div className="card shadow border-0 mb-2 top-header">
                    <div className="container-fluid py-4">
                        <div className="row align-items-center">
                            <div className="col">
                                <div className="d-flex align-items-center gap-4">
                                    <h1 className="h4 ls-tight headingColor">Edit Category Group</h1>
                                </div>
                            </div>
                            <div className="col-auto">
                                <div className="hstack gap-2 justify-content-end">
                                    <Link to="/categorygroup">
                                        <button type="button" className="btn btn-light btn-sm">
                                            Back
                                        </button>
                                    </Link>
                                    <button type="submit" className="btn btn-button btn-sm">
                                        {loadIndicator && (
                                            <span
                                                className="spinner-border spinner-border-sm me-2"
                                                aria-hidden="true"
                                            ></span>
                                        )}
                                        Update
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card shadow border-0 my-2" style={{ height: "78vh" }}>
                    <div className="row mt-3 me-2">
                        <div className="col-12 text-end"></div>
                    </div>
                    <div className="container mb-5">
                        <div className="row py-4">
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
                                    Icon<span className="text-danger">*</span>
                                </label>
                                <input
                                    type="file"
                                    className={`form-control ${formik.touched.icon && formik.errors.icon
                                        ? "is-invalid"
                                        : ""
                                        }`}
                                    {...formik.getFieldProps("icon")}
                                />
                                {formik.touched.icon && formik.errors.icon && (
                                    <div className="invalid-feedback">{formik.errors.icon}</div>
                                )}
                            </div>
                            <div className="col-md-6 col-12 mb-3">
                                <label className="form-label">
                                    Order<span className="text-danger">*</span>
                                </label>
                                <select
                                    aria-label="Default select example"
                                    className={`form-select ${formik.touched.order && formik.errors.order
                                        ? "is-invalid"
                                        : ""
                                        }`}
                                    {...formik.getFieldProps("order")}
                                >
                                    <option value="">Select an order</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                </select>
                                {formik.touched.order && formik.errors.order && (
                                    <div className="invalid-feedback">{formik.errors.order}</div>
                                )}
                            </div>
                            <div className="col-md-6 col-12 mb-3">
                                <label className="form-label">
                                    Active<span className="text-danger">*</span>
                                </label>
                                <select
                                    aria-label="Default select example"
                                    className={`form-select ${formik.touched.active && formik.errors.active
                                        ? "is-invalid"
                                        : ""
                                        }`}
                                    {...formik.getFieldProps("active")}
                                >
                                    <option value="">Select an active</option>
                                    <option value="1">Active</option>
                                    <option value="0">Inactive</option>
                                </select>
                                {formik.touched.active && formik.errors.active && (
                                    <div className="invalid-feedback">{formik.errors.active}</div>
                                )}
                            </div>
                            <div className="col-md-6 col-12 mb-3">
                                <label className="form-label">
                                    Description
                                </label>
                                <textarea
                                    rows={5}
                                    className={`form-control`}
                                    {...formik.getFieldProps("description")}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default CategoryGroupEdit;