import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, Modal } from "react-bootstrap";
import { PiPlusSquareFill } from "react-icons/pi";
import api from "../../../config/URL";
import toast from "react-hot-toast";
import { FiAlertTriangle } from "react-icons/fi";

function ProductAdd() {
  const [loadIndicator, setLoadIndicator] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [allCategorgroup, setAllCategorgroup] = useState([]);
  const [category, setCategory] = useState([]);

  const id = sessionStorage.getItem("shop_id");

  const validationSchema = Yup.object({
    shop_id: Yup.string().required("Shop Id is required"),
    name: Yup.string().required("Name is required"),
    category_id: Yup.string().required("Category Id is required"),
    brand: Yup.string().required("Brand is required"),
    original_price: Yup.number()
      .required("Original Price is required")
      .min(1, "Original Price must be greater than zero"),
    discounted_price: Yup.number()
      .required("Discounted Price is required")
      .lessThan(
        Yup.ref("original_price"),
        "Discounted Price must be less than Original Price"
      ),
    start_date: Yup.date().required("Start Date is required").nullable(),
    end_date: Yup.date()
      .required("End Date is required")
      .min(Yup.ref("start_date"), "End Date cannot be before Start Date")
      .nullable(),
    stock: Yup.number()
      .required("Stock is required")
      .min(0, "Stock cannot be negative"),
    sku: Yup.string().required("SKU is required"),
    image: Yup.mixed().required("Image is required"),
    description: Yup.string()
      .required("Description is required")
      .min(10, "Description must be at least 10 characters long"),
  });

  const formik = useFormik({
    initialValues: {
      shop_id: "",
      name: "",
      category_id: "",
      deal_type: "",
      brand: "",
      original_price: "",
      discounted_price: "",
      discounted_percentage: "",
      start_date: "",
      end_date: "",
      stock: "",
      sku: "",
      image: null,
      description: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const formData = new FormData();
      // formData.append("shop_id", values.shop_id);
      formData.append("shop_id", id);
      formData.append("name", values.name);
      formData.append("category_id", values.category_id);
      formData.append("deal_type", values.deal_type);
      formData.append("brand", values.brand);
      formData.append("original_price", values.original_price);
      formData.append("discounted_price", values.discounted_price);
      formData.append("discount_percentage", values.discounted_percentage);
      formData.append("start_date", values.start_date);
      formData.append("end_date", values.end_date);
      formData.append("stock", values.stock);
      formData.append("sku", values.sku);
      formData.append("image", values.image);
      formData.append("description", values.description);

      // Generate the slug and append it
      const transformedSlug = values.name.toLowerCase().replace(/\s+/g, "_");
      formData.append("slug", transformedSlug);

      console.log("Form Data:", formData);
      try {
        const response = await api.post(`vendor/product`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log("Response", response);
        if (response.status === 200) {
          toast.success(response.data.message);
          setShowModal(false);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        if (error.response && error.response.status === 422) {
          const errors = error.response.data.errors;
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
        setLoadIndicator(false);
      }
    },
  });
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.get(`vendor/categorygroups`);
        setAllCategorgroup(response.data.data);
      } catch (error) {
        toast.error("Error Fetching Data ", error);
      }
    };
    getData();
  }, []);
  const fecthCategory = async (subjectId) => {
    try {
      const category = await api.get(
        `vendor/categories/categorygroups/${subjectId}`
      );
      setCategory(category.data.data);
    } catch (error) {
      toast.error(error);
    }
  };
  const handleCategorygroupChange = (event) => {
    setCategory([]);
    const categoryGroup = event.target.value;
    formik.setFieldValue("shop_id", categoryGroup);
    fecthCategory(categoryGroup);
  };

  // const handleCategoryGroupChange = (e) => {
  //   const value = e.target.value;
  //   formik.setFieldValue("category_id", value);

  //   if (value === "3") {
  //     setShowModal(true);
  //   }
  // };

  return (
    <section className="px-4">
      <form onSubmit={formik.handleSubmit}>
        <div className="card shadow border-0 mb-3">
          <div className="row p-3">
            <div className="d-flex justify-content-between align-items-center">
              <h1 className="h4 ls-tight">Add Products</h1>
              <Link to="/product">
                <button type="button" className="btn btn-light btn-sm">
                  <span>Back</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div
          className="container card shadow border-0"
          style={{ minHeight: "80vh" }}
        >
          <div className="row mt-3">
            <div className="col-md-6 col-12 mb-3">
              <label className="form-label">
                Category Group<span className="text-danger">*</span>
              </label>
              <select
                type="text"
                className={`form-select ${
                  formik.touched.shop_id && formik.errors.shop_id
                    ? "is-invalid"
                    : ""
                }`}
                {...formik.getFieldProps("shop_id")}
                onChange={handleCategorygroupChange}
              >
                <option></option>
                {Array.isArray(allCategorgroup) &&
                  allCategorgroup.map((categorygroup) => (
                    <option key={categorygroup.id} value={categorygroup.id}>
                      {categorygroup.name}
                    </option>
                  ))}
              </select>
              {formik.touched.shop_id && formik.errors.shop_id && (
                <div className="invalid-feedback">{formik.errors.shop_id}</div>
              )}
            </div>
            <div className="col-md-6 col-12 mb-3">
              <label className="form-label">
                Category<span className="text-danger">*</span>
              </label>
              <select
                type="text"
                className={`form-select ${
                  formik.touched.category_id && formik.errors.category_id
                    ? "is-invalid"
                    : ""
                }`}
                {...formik.getFieldProps("category_id")}
              >
                <option></option>
                {Array.isArray(category) &&
                  category.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                <option
                  value="3"
                  style={{ background: "#1c2b36", color: "#fff" }}
                >
                  <PiPlusSquareFill size={20} color="#fff" />
                  Add New Category
                </option>
              </select>
              {formik.touched.category_id && formik.errors.category_id && (
                <div className="invalid-feedback">
                  {formik.errors.category_id}
                </div>
              )}
            </div>
            <div className="col-md-6 col-12 mb-3">
              <label className="form-label">
                Deal Type<span className="text-danger">*</span>
              </label>
              <select
                type="text"
                className={`form-select ${
                  formik.touched.deal_type && formik.errors.deal_type
                    ? "is-invalid"
                    : ""
                }`}
                {...formik.getFieldProps("deal_type")}
              >
                <option></option>
                <option value="1">Product</option>
                <option value="2">Service</option>
              </select>
              {formik.touched.deal_type && formik.errors.deal_type && (
                <div className="invalid-feedback">
                  {formik.errors.deal_type}
                </div>
              )}
            </div>

            <div className="col-md-6 col-12 mb-3">
              <label className="form-label">
                Brand<span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className={`form-control ${
                  formik.touched.brand && formik.errors.brand
                    ? "is-invalid"
                    : ""
                }`}
                {...formik.getFieldProps("brand")}
              />
              {formik.touched.brand && formik.errors.brand && (
                <div className="invalid-feedback">{formik.errors.brand}</div>
              )}
            </div>
            <div className="col-md-6 col-12 mb-3">
              <label className="form-label">
                Name<span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className={`form-control ${
                  formik.touched.name && formik.errors.name ? "is-invalid" : ""
                }`}
                {...formik.getFieldProps("name")}
              />
              {formik.touched.name && formik.errors.name && (
                <div className="invalid-feedback">{formik.errors.name}</div>
              )}
            </div>
            <div className="col-md-6 col-12 mb-3">
              <label className="form-label">
                Image<span className="text-danger">*</span>
              </label>
              <input
                type="file"
                name="file"
                accept=".png,.jpeg,.jpg,.gif,.svg"
                className="form-control"
                onChange={(event) => {
                  const file = event.target.files[0];
                  formik.setFieldValue("image", file);
                }}
                onBlur={formik.handleBlur}
              />
              {formik.touched.image && formik.errors.image && (
                <div className="invalid-feedback">{formik.errors.image}</div>
              )}
            </div>

            <div className="col-md-6 col-12 mb-3">
              <label className="form-label">
                Original Price<span className="text-danger">*</span>
              </label>
              <input
                type="number"
                className={`form-control ${
                  formik.touched.original_price && formik.errors.original_price
                    ? "is-invalid"
                    : ""
                }`}
                {...formik.getFieldProps("original_price")}
              />
              {formik.touched.original_price &&
                formik.errors.original_price && (
                  <div className="invalid-feedback">
                    {formik.errors.original_price}
                  </div>
                )}
            </div>
            <div className="col-md-6 col-12 mb-3">
              <label className="form-label">
                Discounted Price<span className="text-danger">*</span>
              </label>
              <input
                type="number"
                className={`form-control ${
                  formik.touched.discounted_price &&
                  formik.errors.discounted_price
                    ? "is-invalid"
                    : ""
                }`}
                {...formik.getFieldProps("discounted_price")}
              />
              {formik.touched.discounted_price &&
                formik.errors.discounted_price && (
                  <div className="invalid-feedback">
                    {formik.errors.discounted_price}
                  </div>
                )}
            </div>

            <div className="col-md-6 col-12 mb-3">
              <label className="form-label">
                Start Date<span className="text-danger">*</span>
              </label>
              <input
                type="date"
                className={`form-control ${
                  formik.touched.start_date && formik.errors.start_date
                    ? "is-invalid"
                    : ""
                }`}
                {...formik.getFieldProps("start_date")}
              />
              {formik.touched.start_date && formik.errors.start_date && (
                <div className="invalid-feedback">
                  {formik.errors.start_date}
                </div>
              )}
            </div>
            <div className="col-md-6 col-12 mb-3">
              <label className="form-label">
                End Date<span className="text-danger">*</span>
              </label>
              <input
                type="date"
                className={`form-control ${
                  formik.touched.end_date && formik.errors.end_date
                    ? "is-invalid"
                    : ""
                }`}
                {...formik.getFieldProps("end_date")}
              />
              {formik.touched.end_date && formik.errors.end_date && (
                <div className="invalid-feedback">{formik.errors.end_date}</div>
              )}
            </div>
            <div className="col-md-6 col-12 mb-3">
              <label className="form-label">
                Discounted Percentage<span className="text-danger">*</span>
              </label>
              <input
                type="number"
                className={`form-control ${
                  formik.touched.discounted_percentage &&
                  formik.errors.discounted_percentage
                    ? "is-invalid"
                    : ""
                }`}
                {...formik.getFieldProps("discounted_percentage")}
              />
              {formik.touched.discounted_percentage &&
                formik.errors.discounted_percentage && (
                  <div className="invalid-feedback">
                    {formik.errors.discounted_percentage}
                  </div>
                )}
            </div>

            <div className="col-md-6 col-12 mb-3">
              <label className="form-label">
                Stock<span className="text-danger">*</span>
              </label>
              <input
                type="number"
                className={`form-control ${
                  formik.touched.stock && formik.errors.stock
                    ? "is-invalid"
                    : ""
                }`}
                {...formik.getFieldProps("stock")}
              />
              {formik.touched.stock && formik.errors.stock && (
                <div className="invalid-feedback">{formik.errors.stock}</div>
              )}
            </div>
            <div className="col-md-6 col-12 mb-3">
              <label className="form-label">
                SKU<span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className={`form-control ${
                  formik.touched.sku && formik.errors.sku ? "is-invalid" : ""
                }`}
                {...formik.getFieldProps("sku")}
              />
              {formik.touched.sku && formik.errors.sku && (
                <div className="invalid-feedback">{formik.errors.sku}</div>
              )}
            </div>

            <div className="col-md-6 col-12 mb-3">
              <label className="form-label">
                Description<span className="text-danger">*</span>
              </label>
              <textarea
                type="text"
                className={`form-control ${
                  formik.touched.description && formik.errors.description
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
        <div className="hstack gap-2 justify-content-end p-2">
          <button type="submit" className="btn btn-sm btn-button">
            {loadIndicator && (
              <span
                className="spinner-border spinner-border-sm me-2"
                aria-hidden="true"
              ></span>
            )}
            Submit
          </button>
        </div>
      </form>
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        size="md"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Form inside the modal */}
          <form onSubmit={formik.handleSubmit}>
            <div className="row py-4">
              <div className="col-12 mb-3">
                <label className="form-label">
                  Category Group Id<span className="text-danger">*</span>
                </label>
                <select
                  className={`form-select ${
                    formik.touched.groupId && formik.errors.groupId
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

              <div className="col-12 mb-3">
                <label className="form-label">
                  Name<span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className={`form-control ${
                    formik.touched.name && formik.errors.name
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("name")}
                />
                {formik.touched.name && formik.errors.name && (
                  <div className="invalid-feedback">{formik.errors.name}</div>
                )}
              </div>
              <div className="col-12 mb-3">
                <label className="form-label">
                  Image<span className="text-danger">*</span>
                </label>
                <input
                  type="file"
                  className={`form-control ${
                    formik.touched.file && formik.errors.file
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("file")}
                  onChange={(event) => {
                    const file = event.target.files[0];
                    formik.setFieldValue("file", file);
                  }}
                />
                {formik.touched.file && formik.errors.file && (
                  <div className="invalid-feedback">{formik.errors.file}</div>
                )}
              </div>

              <div className="col-md-12 col-12 mb-3">
                <label className="form-label">
                  Description<span className="text-danger">*</span>
                </label>
                <textarea
                  rows={5}
                  className={`form-control ${
                    formik.touched.description && formik.errors.description
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

            <div className="d-flex justify-content-end">
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                Close
              </Button>
              <Button
                type="submit"
                className="btn btn-sm btn-button shadow-none border-0 ms-3"
                disabled={loadIndicator}
              >
                {loadIndicator && (
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    aria-hidden="true"
                  ></span>
                )}
                Submit
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </section>
  );
}

export default ProductAdd;
