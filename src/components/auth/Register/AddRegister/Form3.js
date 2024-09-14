import React, { forwardRef, useImperativeHandle, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import Success from "../../../../assets/Success2.png";

// Define the validation schema to match form fields
const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  legal_name: Yup.string().required("Legal Name is required"),
  slug: Yup.string().required("Slug is required"),
  external_url: Yup.string().required("External URL is required"),
  address: Yup.string().required("Address is required"),
  description: Yup.string().required("Description is required"),
});

const Form3 = forwardRef(
  ({ formData, setFormData, handleNext, setLoadIndicators }, ref) => {
    const navigate = useNavigate();
    const formik = useFormik({
      initialValues: {
        name: "",
        email: "",
        legal_name: "",
        slug: "",
        external_url: "",
        address: "",
        description: "",
      },
      validationSchema: validationSchema,
      onSubmit: async (data) => {
        console.log("Form Data", data);
        navigate("/vendorlogin");
        handleNext();
      },
    });

    useImperativeHandle(ref, () => ({
      form2: formik.handleSubmit,
    }));

    return (
      <form onSubmit={formik.handleSubmit}>
        <div className="row  mt-5">
          <div className="col-md-12 col-12 d-flex flex-column align-items-center justify-content-center">
            <img
              className="img-fluid"
              src={Success}
              alt="Success"
              width={220}
            />
            <h2 className="py-5">Your Store is Ready !</h2>
            <Link to={"/vendorlogin"} className=" mt-4">
              <button className="btn btn-primary">
                Go to your store Dashboard !
              </button>
            </Link>
            <Link
              to={"/vendorlogin"}
              className="pt-5"
              style={{ textDecoration: "underline" }}
            >
              <p>Return to the Marketplace</p>
            </Link>
          </div>
        </div>
      </form>
    );
  }
);

export default Form3;
