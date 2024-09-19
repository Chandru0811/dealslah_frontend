import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../../../config/URL";
import toast from "react-hot-toast";

function CategoryGroupEdit() {
    const [loadIndicator, setLoadIndicator] = useState(false);
    const id = sessionStorage.getItem("id");
    const [logo, setLogo] = useState(null); // this is the file
    const navigate = useNavigate();

    const validationSchema = Yup.object({
        name: Yup.string().required("*Name is required"),
        slug: Yup.string().required("*Slug is required"),
        icon: Yup.mixed().required("*Image is required"), // Ensure Yup validation for file is handled with mixed()
        order: Yup.string().required("*Select an order"),
        active: Yup.string().required("*Select an active"),
    });

    const formik = useFormik({
        initialValues: {
            name: "",
            slug: "",
            icon: null,
            order: "",
            active: "",
            description: "",
        },
        validationSchema: validationSchema,
        onSubmit: async (values, { resetForm }) => {
            const formData = new FormData();
            formData.append("_method", "PUT");

            formData.append("name", values.name);
            formData.append("slug", values.slug);
            formData.append("icon", logo);
            formData.append("order", values.order);
            formData.append("active", values.active);
            formData.append("description", values.description);

            try {
                const response = await api.post(`admin/categoryGroup/update/${id}`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
                if (response.status === 200) {
                    toast.success(response.data.message);
                    navigate("/categorygroup");
                }
            } catch (error) {
                toast.error(error.message);
            }
        },
    });

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await api.get(`admin/categoryGroup/${id}`);
                formik.setValues(response.data.data);
            } catch (error) {
                toast.error("Error Fetching Data", error.message);
            }
        };
        getData();
    }, [id]);

    return (
        <div className="container-fluid minHeight m-">
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
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card shadow border-0 my-2" style={{ minHeight: "80vh" }}>
                    <div className="container mb-5">
                        <div className="row py-4">
                            <div className="col-md-6 col-12 mb-3">
                                <label className="form-label">
                                    Name<span className="text-danger">*</span>
                                </label>
                                <input
                                    type="text"
                                    className={`form-control ${formik.touched.name && formik.errors.name ? "is-invalid" : ""}`}
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
                                    className={`form-control ${formik.touched.slug && formik.errors.slug ? "is-invalid" : ""}`}
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
                                    name="icon"
                                    type="file"
                                    className="form-control"
                                    onChange={(event) => {
                                        const file = event.currentTarget.files[0];
                                        setLogo(file); // Set the selected file to logo state
                                    }}
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
                                    className={`form-select ${formik.touched.order && formik.errors.order ? "is-invalid" : ""}`}
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
                                    className={`form-select ${formik.touched.active && formik.errors.active ? "is-invalid" : ""}`}
                                    {...formik.getFieldProps("active")}
                                >
                                    <option value="">Select an active status</option>
                                    <option value="1">Active</option>
                                    <option value="0">Inactive</option>
                                </select>
                                {formik.touched.active && formik.errors.active && (
                                    <div className="invalid-feedback">{formik.errors.active}</div>
                                )}
                            </div>

                            <div className="col-md-6 col-12 mb-3">
                                <label className="form-label">Description</label>
                                <textarea
                                    rows={5}
                                    className="form-control"
                                    {...formik.getFieldProps("description")}
                                />
                                {formik.touched.description && formik.errors.description && (
                                    <div className="invalid-feedback">{formik.errors.description}</div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-auto">
                    <div className="hstack gap-2 justify-content-end">
                        <button type="submit" className="btn btn-button btn-sm">
                            {loadIndicator && (
                                <span className="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>
                            )}
                            Update
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default CategoryGroupEdit;
