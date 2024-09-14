import React, { forwardRef, useImperativeHandle, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

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

const Form3= forwardRef(
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
        navigate("/vendorlogin")
        handleNext();
      },
    });

    useImperativeHandle(ref, () => ({
      form2: formik.handleSubmit,
    }));

    return (
      <form onSubmit={formik.handleSubmit}>
        <div className="row d-flex justify-content-center mt-5">
          <div className="col-md-12 col-12">
           
          </div>
        </div>
      </form>
    );
  }
);

export default Form3;
