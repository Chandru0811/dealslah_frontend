import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import api from "../../../config/URL";
import ImageURL from "../../../config/ImageURL";

function SliderEdit() {
  const [loadIndicator, setLoadIndicator] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    order: Yup.string().required("*Select an Order"),
    image_path: Yup.string().required("*Image is required"),
  });

  const formik = useFormik({
    initialValues: {
      order: "3",
      image_path: null,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log("Form Data:", values);
      const formData = new FormData();
      formData.append("_method", "PUT");
      formData.append("order", values.order);
      formData.append("image_path", values.image_path);

      setLoadIndicator(true)
      try {
        const response = await api.post(`admin/slider/update/${id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        if (response.status === 200) {
          toast.success(response.data.message);
          navigate("/slider");
        }
      } catch (error) {
        toast.error(error.message);
      }
      setLoadIndicator(false)
    },
  });

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.get(`admin/slider/${id}`);
        formik.setValues(response.data.data);
      } catch (error) {
        toast.error("Error Fetching Data", error.message);
      }
    };
    getData();
  }, [id]);

  return (
    <section className="px-4">
      <form onSubmit={formik.handleSubmit}>
        <div className="card shadow border-0 mb-3">
          <div className="row p-3">
            <div className="d-flex justify-content-between align-items-center">
              <h1 className="h4 ls-tight">Edit Slider</h1>
              <Link to="/slider">
                <button type="button" className="btn btn-light btn-sm">
                  <span>Back</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div
          className="container card shadow border-0"
          style={{ minHeight: "60vh" }}
        >
          <div className="row mt-3">
            <div className="col-md-6 col-12 mb-3">
              <label className="form-label fw-bold">
                Image<span className="text-danger">*</span>
              </label>

              <input
                type="file"
                name="image_path"
                accept=".png,.jpeg,.jpg,.gif,.svg"
                className="form-control"
                onChange={(event) => {
                  const file = event.target.files[0];
                  formik.setFieldValue("image_path", file);
                }}
                onBlur={formik.handleBlur}
              />
              {formik.touched.image_path && formik.errors.image_path && (
                <div className="error text-danger">
                  <small>{formik.errors.image_path}</small>
                </div>
              )}

              {formik.values.image_path && (
                <div className="mb-3">
                  {typeof formik.values.image_path === "object" ? (
                    <img
                      src={URL.createObjectURL(formik.values.image_path)}
                      alt="image_path"
                      style={{ maxWidth: "100px", maxHeight: "100px" }}
                    />
                  ) : (
                    <img
                      src={`${ImageURL}${formik.values.image_path}`}
                      alt="image_path"
                      style={{ maxWidth: "100px", maxHeight: "100px" }}
                    />
                  )}
                </div>
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
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
              {formik.touched.order && formik.errors.order && (
                <div className="invalid-feedback">{formik.errors.order}</div>
              )}
            </div>
          </div>
        </div>
        <div className="hstack gap-2 justify-content-end p-2">
          <button type="submit" className="btn btn-sm btn-button"
            disabled={loadIndicator}>
            {loadIndicator && (
              <span
                className="spinner-border spinner-border-sm me-2"
                aria-hidden="true"
              ></span>
            )}
            Update
          </button>
        </div>
      </form>
    </section>
  );
}

export default SliderEdit;
