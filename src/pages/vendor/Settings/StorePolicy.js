import React, { useState, useRef } from "react";
import JoditEditor from "jodit-react";
import { useFormik } from "formik";
import * as Yup from 'yup';

const validationSchema = Yup.object({
  shippingPolicy: Yup.string().required('Shipping Policy is required'),
  refundPolicy: Yup.string().required('Refund Policy is required'),
  cancelationPolicy: Yup.string().required('Cancelation Policy is required'),
});
function StorePolicy() {
  const editor = useRef(null);
  const [content, setContent] = useState("");

  const formik = useFormik({
    initialValues: {
      shippingPolicy: '',
      refundPolicy: '',
      cancelationPolicy: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (data) => {
      const plainTextValues = {
        shippingPolicy: stripHtmlTags(data.shippingPolicy),
        refundPolicy: stripHtmlTags(data.refundPolicy),
        cancelationPolicy: stripHtmlTags(data.cancelationPolicy),
      };
      console.log("Plain text values:", plainTextValues);
    },
  });
  const stripHtmlTags = (html) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || '';
  };


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
              value={formik.values.shippingPolicy}
              tabIndex={3}
              config={{ removeButtons: ["about"] }}  // This removes the "Powered by Jodit" branding
              onChange={(newContent) => formik.setFieldValue('shippingPolicy', newContent)}
              onBlur={formik.handleBlur}
            />

            {formik.touched.shippingPolicy && formik.errors.shippingPolicy && (
              <div className="error text-danger">
                <small>{formik.errors.shippingPolicy}</small>
              </div>
            )}
          </div>
          <div className="mb-5">
            <label className="form-label">
              <h5 className="fw-bold">Refund Policy</h5>
            </label>
            <JoditEditor
              ref={editor}
              value={formik.values.refundPolicy}
              tabIndex={3}
              onChange={(newContent) => formik.setFieldValue('refundPolicy', newContent)}
              onBlur={formik.handleBlur}
            />
            {formik.touched.refundPolicy && formik.errors.refundPolicy && (
              <div className="error text-danger">
                <small>{formik.errors.refundPolicy}</small>
              </div>
            )}
          </div>
          <div className="mb-5">
            <label className="form-label">
              <h5 className="fw-bold">Cancellation/Return/Exchange Policy</h5>
            </label>
            <JoditEditor
              ref={editor}
              value={formik.values.cancelationPolicy}
              tabIndex={3}
              onChange={(newContent) => formik.setFieldValue('cancelationPolicy', newContent)}
              onBlur={formik.handleBlur}
            />
            {formik.touched.cancelationPolicy && formik.errors.cancelationPolicy && (
              <div className="error text-danger">
                <small>{formik.errors.cancelationPolicy}</small>
              </div>
            )}
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
        </div>
      </form>
    </div>
  );
}

export default StorePolicy;
