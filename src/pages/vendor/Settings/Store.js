import React, { useEffect, useState } from 'react'
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from 'axios';
import toast from 'react-hot-toast';

const validationSchema = Yup.object({
    shopName: Yup.string().required('Shop Name is required!'),
    LegalName: Yup.string().required('Legal Name is required!'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    phone: Yup.string()
        .matches(/^[0-9]+$/, 'Phone number must be numeric')
        .required('Phone number is required!'),
    shopType: Yup.string().required('Shop Type is required!'),
    logo: Yup.mixed().required('Logo is required'),
    bannerType: Yup.string().required('Banner Type is required!'),
    banner: Yup.mixed().required('Banner is required!'),
    description: Yup.string().required('Description is required!'),
});

const Store = () => {
    const [data, setData] = useState([]);

    const formik = useFormik({
        initialValues: {
            shopName: '',
            LegalName: '',
            email: '',
            phone: '',
            shopType: '',
            logo: null,
            bannerType: '',
            banner: null,
            description: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (data) => {
            console.log("Form Data", data);
        },
    });

    useEffect(() => {
        const getData = async () => {
          try {
           const response = await axios.get(`https://sgitjobs.com/dealslah/public/api/vendor/shop/{id}`)
            setData(response.data);
          } catch (error) {
            toast.error("Error Fetching Data ", error);
          }
        };
        getData();
      }, []);

    return (
        <section>
            <form onSubmit={formik.handleSubmit} className="w-100">
                <div className='container'>
                    {/* <h3 className='text-primary py-3'>Generat Settings</h3> */}

                    <div className='row'>
                        <div className="col-md-4 col-12 mb-5 ">
                            <label className="form-label fw-bold">
                                Shop Name<span className="text-danger">*</span>
                            </label>
                        </div>
                        <div className="col-md-8 col-12 mb-5">
                            <input
                                type="text"
                                className={`form-control ${formik.touched.shopName && formik.errors.shopName
                                    ? "is-invalid"
                                    : ""
                                    }`}
                                name="shopName"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.shopName}
                            />
                            {formik.touched.shopName &&
                                formik.errors.shopName && (
                                    <div className="error text-danger">
                                        <small>{formik.errors.shopName}</small>
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
                                className={`form-control ${formik.touched.LegalName && formik.errors.LegalName
                                    ? "is-invalid"
                                    : ""
                                    }`}
                                name="LegalName"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.LegalName}
                            />
                            {formik.touched.LegalName &&
                                formik.errors.LegalName && (
                                    <div className="error text-danger">
                                        <small>{formik.errors.LegalName}</small>
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
                                className={`form-control ${formik.touched.email && formik.errors.email
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
                                Shop Phone<span className="text-danger">*</span>
                            </label>
                        </div>
                        <div className="col-md-8 col-12 mb-5">
                            <input
                                type="text"
                                className={`form-control ${formik.touched.phone && formik.errors.phone
                                    ? "is-invalid"
                                    : ""
                                    }`}
                                name="phone"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.phone}
                            />
                            {formik.touched.phone && formik.errors.phone && (
                                <div className="error text-danger">
                                    <small>{formik.errors.phone}</small>
                                </div>
                            )}
                        </div>

                        <h3 className='text-primary py-3'>Shop Brand Setup</h3>
                        <div className="col-md-4 col-12 mb-5">
                            <label className="form-label fw-bold">
                                Shop Shop Type<span className="text-danger">*</span>
                            </label>
                        </div>
                        <div className="col-md-8 col-12 mb-5">
                            <select
                                type="text"
                                className={`form-select ${formik.touched.shopType && formik.errors.shopType
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
                                className={`form-control ${formik.touched.logo && formik.errors.logo
                                    ? "is-invalid"
                                    : ""
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
                                Shop Banner Type<span className="text-danger">*</span>
                            </label>
                        </div>
                        <div className="col-md-8 col-12 mb-5">
                            <select
                                type="text"
                                className={`form-select ${formik.touched.bannerType && formik.errors.bannerType
                                    ? "is-invalid"
                                    : ""
                                    }`}
                                name="bannerType"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.bannerType}
                            >
                                <option></option>
                                <option value="product">Product</option>
                                <option value="service">Service</option>
                            </select>
                            {formik.touched.bannerType && formik.errors.bannerType && (
                                <div className="error text-danger">
                                    <small>{formik.errors.bannerType}</small>
                                </div>
                            )}
                        </div>
                        <div className="col-md-4 col-12 mb-5">
                            <label className="form-label fw-bold">
                                Shop Bannenr
                            </label>
                        </div>
                        <div className="col-md-8 col-12 mb-5">
                            <input
                                type="file"
                                className={`form-control ${formik.touched.banner && formik.errors.banner
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
                                    className={`form-control ${formik.touched.description && formik.errors.description
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
                    // disabled={loadIndicator}
                    >
                        {/* {loadIndicator && (
                            <span
                                className="spinner-border spinner-border-sm me-2"
                                aria-hidden="true"
                            ></span>
                        )} */}
                        Update
                    </button>
                </div>
            </form>
        </section >
    )
}

export default Store