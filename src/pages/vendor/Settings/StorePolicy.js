import React, { useEffect, useRef, useState } from "react";
import JoditEditor from "jodit-react";
import { useFormik } from "formik";
import * as Yup from 'yup';
import toast from "react-hot-toast";
import api from "../../../config/URL";
import { Component } from 'react';
import ReactQuill from 'react-quill';
import { withFormik } from 'formik';

const validationSchema = Yup.object({
  shipping_policy: Yup.string().required('Shipping Policy is required'),
  refund_policy: Yup.string().required('Refund Policy is required'),
  cancellation_policy: Yup.string().required('Cancelation Policy is required'),
});
function StorePolicy() {

  // const id = sessionStorage.getItem("id");
  const id = 2;
  const [loading, setLoading] = useState(false);
  const editor = useRef(null);

  const formik = useFormik({
    initialValues: {
      shop_id: 2,
      shipping_policy: '',
      refund_policy: '',
      cancellation_policy: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      values.shop_id = 2;
      try {
        let response;
        if (id) {
          response = await api.put(`vendor/shopPolicy/update/${id}`,
            values,
          );
        } else {

          response = await api.post(`vendor/shopPolicy`,
            values);
        }

        if (response.status === 200) {
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error(error.message || 'An error occurred');
      } finally {
        setLoading(false);
      }
    },
  });

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.get(`vendor/shopPolicy/${id}`);
        console.log("getpolicy", response.data.data)
        formik.setValues({
          shop_id: 2,
          shipping_policy: response.data.data.shipping_policy || "",
          refund_policy: response.data.data.refund_policy || "",
          cancellation_policy: response.data.data.cancellation_policy || "",
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getData();
  }, [id]);


  return (
    <div className="row m-0">
      <form onSubmit={formik.handleSubmit} className="w-100">
        <div className="col-md-12 col-12 ">
          {/* <h3 className="text-primary mb-4">Policies Setting</h3> */}
          <div className="mb-5">
            <label className="form-label">
              <h5 className="fw-bold">Shipping Policy</h5>
            </label>
            <JoditEditor
              ref={editor}
              value={formik.values.shipping_policy}
              tabIndex={3}
              onChange={(newContent) => formik.setFieldValue('shipping_policy', newContent)}
              onBlur={formik.handleBlur}
            />

            {formik.touched.shipping_policy && formik.errors.shipping_policy && (
              <div className="error text-danger">
                <small>{formik.errors.shipping_policy}</small>
              </div>
            )}
          </div>
          <div className="mb-5">
            <label className="form-label">
              <h5 className="fw-bold">Refund Policy</h5>
            </label>
            <JoditEditor
              ref={editor}
              value={formik.values.refund_policy}
              tabIndex={3}
              onChange={(newContent) => formik.setFieldValue('refund_policy', newContent)}
              onBlur={formik.handleBlur}
            />
            {formik.touched.refund_policy && formik.errors.refund_policy && (
              <div className="error text-danger">
                <small>{formik.errors.refund_policy}</small>
              </div>
            )}
          </div>
          <div className="mb-5">
            <label className="form-label">
              <h5 className="fw-bold">Cancellation/Return/Exchange Policy</h5>
            </label>
            <JoditEditor
              ref={editor}
              value={formik.values.cancellation_policy}
              tabIndex={3}
              onChange={(newContent) => formik.setFieldValue('cancellation_policy', newContent)}
              onBlur={formik.handleBlur}
            />
            {formik.touched.cancellation_policy && formik.errors.cancellation_policy && (
              <div className="error text-danger">
                <small>{formik.errors.cancellation_policy}</small>
              </div>
            )}
          </div>
          <div className="text-end mt-4 mb-3">
            <button
              type="submit"
              className="btn btn-button btn-sm"
              disabled={loading}
            >
              {loading && (
                <span
                  className="spinner-border spinner-border-sm me-2"
                  aria-hidden="true"
                ></span>
              )}
              Update
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default StorePolicy;