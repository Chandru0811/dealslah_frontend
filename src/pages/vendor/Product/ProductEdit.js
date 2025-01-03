import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../../../config/URL";
import toast from "react-hot-toast";
import { FiAlertTriangle } from "react-icons/fi";
import { FaPlus, FaTrash } from "react-icons/fa";
import Cropper from "react-easy-crop";
import ImageURL from "../../../config/ImageURL";

function ProductEdit() {
  const [loadIndicator, setLoadIndicator] = useState(false);
  const [loading, setLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [allCategorgroup, setAllCategorgroup] = useState([]);
  const [selectedCategoryGroup, setSelectedCategoryGroup] = useState(null);
  const [images, setImages] = useState([null, null, null, null]);
  const [croppedAreas, setCroppedAreas] = useState([null, null, null, null]);
  const [crops, setCrops] = useState([
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
  ]);
  const [zooms, setZooms] = useState([1, 1, 1, 1]);
  const [showCropper, setShowCropper] = useState([false, false, false, false]);
  const [category, setCategory] = useState([]);
  const shop_id = localStorage.getItem("shop_id");
  const { id } = useParams();
  const navigate = useNavigate();
  const [couponCode, setCouponCode] = useState("DEALSLAH");
  const [isCouponChecked, setIsCouponChecked] = useState(false);

  const SUPPORTED_FORMATS = [
    "image/jpg",
    "image/jpeg",
    "image/png",
    "image/svg+xml",
    "image/webp",
  ];
  const MAX_FILE_SIZE = 2 * 1024 * 1024;
  const imageValidation = Yup.mixed()
    .nullable()
    .test("fileFormat", "Unsupported format", (value) => {
      return !value || (value && SUPPORTED_FORMATS.includes(value.type));
    });
  const validationSchema = Yup.object({
    categoryGroupId: Yup.string().required("Category Group is required"),
    name: Yup.string()
      .max(25, "Name must be 25 characters or less")
      .required("Name is required"),
    category_id: Yup.string().required("Category is required"),
    deal_type: Yup.string().required("Deal Type is required"),
    original_price: Yup.number()
      .required("Original Price is required")
      .min(1, "Original Price must be greater than zero"),
    discounted_price: Yup.number()
      .required("Discounted Price is required")
      .max(
        Yup.ref("original_price"),
        "The Discounted Price must be same or below the Original Price."
      ),
    discount_percentage: Yup.number()
      .required("Discount is required")
      .max(100, "Discount must be less than 100"),
    start_date: Yup.string().required("Start Date is required"),
    end_date: Yup.date()
      .required("End date is required")
      .test(
        "endDateValidation",
        "End date must be the same or after the start date",
        function (value) {
          const { start_date } = this.parent;
          if (!start_date || !value) return true;
          return new Date(value) >= new Date(start_date);
        }
      ),
    image_url1: imageValidation,
    image_url2: imageValidation,
    image_url3: imageValidation,
    image_url4: imageValidation,
    description: Yup.string().min(
      10,
      "Description must be at least 10 characters long"
    ),
    additional_details: Yup.array().of(
      Yup.object().shape({
        video_url: Yup.string().url("Please enter a valid URL").nullable(),
        order: Yup.string(),
      })
    ),
    coupon_code: Yup.string()
      .matches(
        /^[A-Za-z]+[0-9]{0,4}$/,
        "Coupon code must end with up to 4 digits"
      )
      .required("Coupon code is required"),
  });

  const formik = useFormik({
    initialValues: {
      categoryGroupId: "",
      name: "",
      category_id: "",
      deal_type: "",
      brand: "",
      original_price: "",
      coupon_code: "",
      discounted_price: "",
      discount_percentage: "",
      start_date: "",
      end_date: "",
      image_url1: null,
      image_url2: null,
      image_url3: null,
      image_url4: null,
      description: "",
      additional_details: [{ video_url: "", order: "" }],
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("_method", "PUT");
      formData.append("shop_id", shop_id);
      formData.append("name", values.name);
      formData.append("category_id", values.category_id);
      formData.append("deal_type", values.deal_type);
      formData.append("brand", values.brand || "");
      formData.append("coupon_code", values.coupon_code);
      formData.append("original_price", values.original_price);
      formData.append("discounted_price", values.discounted_price);
      formData.append("discount_percentage", values.discount_percentage);
      formData.append("start_date", values.start_date);
      formData.append("end_date", values.end_date);
      if (values.image_url1) {
        formData.append("image1", values.image_url1);
      }
      if (values.image_url2) {
        formData.append("image2", values.image_url2);
      }
      if (values.image_url3) {
        formData.append("image3", values.image_url3);
      }
      if (values.image_url4) {
        formData.append("image4", values.image_url4);
      }
      formData.append("description", values.description);
      formData.append(
        "additional_details",
        JSON.stringify(values.additional_details)
      );
      const slug = values.name.toLowerCase().replace(/\s+/g, "_");
      const finalSlug = `${slug}_${shop_id}`;
      formData.append("slug", finalSlug);

      console.log("Form Data:", formData);
      setLoadIndicator(true);
      try {
        const response = await api.post(
          `vendor/product/${id}/update`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log("Response", response);
        if (response.status === 200) {
          toast.success(response.data.message);
          setShowModal(false);
          navigate("/product");
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

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    formik.validateForm().then((errors) => {
      formik.setTouched({
        categoryGroupId: true,
        name: true,
        category_id: true,
        deal_type: true,
        brand: true,
        original_price: true,
        discounted_price: true,
        discounted_percentage: true,
        start_date: true,
        end_date: true,
        coupon_code: true,
        image_url1: true,
        image_url2: true,
        image_url3: true,
        image_url4: true,
        description: true,
        additional_details: [
          {
            video_url: true,
            order: true,
          },
        ],
      });

      const formErrors = formik.errors;
      if (Object.keys(formErrors).length > 0) {
        const fieldLabels = {
          categoryGroupId: "Category Group",
          name: "Name",
          category_id: "Category",
          deal_type: "Deal Type",
          brand: "Brand",
          original_price: "Original Price",
          discounted_price: "Discounted Price",
          discounted_percentage: "Discounted Percentage",
          start_date: "Start Date",
          end_date: "End Date",
          coupon_code: "Coupon Code",
          image_url1: "Image 1",
          image_url2: "Image 2",
          image_url3: "Image 3",
          image_url4: "Image 4",
          description: "Description",
        };

        const missedFields = Object.keys(formErrors)
          .map((key) => fieldLabels[key])
          .join(", ");

        toast.error(
          `Please fill in the following required fields: ${missedFields}`,
          {
            icon: (
              <FiAlertTriangle
                className="text-warning"
                style={{ fontSize: "1.5em", marginRight: "8px" }}
              />
            ),
            style: { maxWidth: "1000px" },
          }
        );
        return;
      }
    });
    formik.handleSubmit();
  };

  useEffect(() => {
    const getData1 = async () => {
      setLoading(true);
      try {
        const response = await api.get(`vendor/categorygroups`);
        setAllCategorgroup(response.data.data);
      } catch (error) {
        toast.error("Error Fetching Data ", error.message);
      }
      setLoading(false);
    };
    getData1();
    getData();
  }, []);

  useEffect(() => {
    const { original_price, discounted_price } = formik.values;
    if (original_price) {
      if (discounted_price === null || discounted_price === "0") {
        formik.setFieldValue("discounted_percentage", 100);
      } else {
        const discountedPercentage =
          ((original_price - discounted_price) / original_price) * 100;

        const formattedPercentage = Math.floor(discountedPercentage * 10) / 10;
        formik.setFieldValue("discount_percentage", formattedPercentage);
      }
    }
  }, [formik.values.discounted_price, formik.values.original_price]);

  const getData = async () => {
    try {
      const response = await api.get(`vendor/product/${id}/get`);
      const {
        image_url1,
        image_url2,
        image_url3,
        image_url4,
        coupon_code,
        additional_details,
        ...rest
      } = response.data.data;
      setIsCouponChecked(/\d/.test(coupon_code.charAt(8))); // Check if 9th character is a digit
      const parsedAdditionalDetails = additional_details
        ? JSON.parse(additional_details)
        : [];

      formik.setValues({
        ...rest,
        coupon_code: coupon_code,
        start_date: rest.start_date
          ? new Date(rest.start_date).toISOString().split("T")[0]
          : "",
        end_date: rest.end_date
          ? new Date(rest.end_date).toISOString().split("T")[0]
          : "",

        image1: `${ImageURL}${image_url1}`,
        image2: `${ImageURL}${image_url2}`,
        image3: `${ImageURL}${image_url3}`,
        image4: `${ImageURL}${image_url4}`,
        additional_details: parsedAdditionalDetails,
      });
      setCouponCode(coupon_code);
    } catch (error) {
      toast.error("Error Fetching Data", error.message);
    }
  };

  const fetchCategory = async (categoryId) => {
    if (categoryId) {
      try {
        const category = await api.get(
          `vendor/categories/categorygroups/${categoryId}`
        );
        setCategory(category.data.data);
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  const handleCategorygroupChange = (event) => {
    const categoryGroup = event.target.value;
    setCategory([]);
    formik.setFieldValue("categoryGroupId", categoryGroup);
    setSelectedCategoryGroup(categoryGroup);
    fetchCategory(categoryGroup);
  };

  useEffect(() => {
    fetchCategory(formik.values.categoryGroupId);
  }, [formik.values.categoryGroupId]);

  const handleFileChange = (index, event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        formik.setFieldError(
          `image_url${index + 1}`,
          "File size is too large. Max 2MB."
        );
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        const newImages = [...images];
        newImages[index] = reader.result;
        setImages(newImages);

        const newShowCropper = [...showCropper];
        newShowCropper[index] = true;
        setShowCropper(newShowCropper);
        formik.setFieldValue(
          `image_url${index + 1}_originalFileName`,
          file.name
        );
        formik.setFieldValue(
          `image_url${index + 1}_originalFileFormat`,
          file.type
        );
      };
      reader.readAsDataURL(file);
    }
  };

  const onCropComplete = (index, croppedArea, croppedAreaPixels) => {
    const newCroppedAreas = [...croppedAreas];
    newCroppedAreas[index] = croppedAreaPixels;
    setCroppedAreas(newCroppedAreas);
  };

  const handleCropCancel = (index) => {
    const newShowCropper = [...showCropper];
    newShowCropper[index] = false; // Hide cropper for the specific index
    setShowCropper(newShowCropper);

    const newImages = [...images];
    newImages[index] = null; // Clear the image for this specific index
    setImages(newImages);

    // Reset the Formik field value for this specific image field
    formik.setFieldValue(`image${index + 1}`, "");

    // Reset the specific file input by targeting it using its index
    const fileInput = document.querySelectorAll("input[type='file']")[index];
    if (fileInput) {
      fileInput.value = ""; // Clear the file input value
    }
  };

  const handleCropSave = async (index) => {
    const croppedImageBlob = await getCroppedImg(
      images[index],
      crops[index],
      croppedAreas[index]
    );

    const originalFileName =
      formik.values[`image_url${index + 1}_originalFileName`];
    const originalFileFormat =
      formik.values[`image_url${index + 1}_originalFileFormat`];

    const file = new File([croppedImageBlob], originalFileName, {
      type: originalFileFormat,
    });

    formik.setFieldValue(`image_url${index + 1}`, file);
    console.log("file", file);

    const newShowCropper = [...showCropper];
    newShowCropper[index] = false;
    setShowCropper(newShowCropper);
  };

  const getCroppedImg = (imageSrc, crop, croppedAreaPixels) => {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.src = imageSrc;
      image.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const targetWidth = 320;
        const targetHeight = 240;
        canvas.width = targetWidth;
        canvas.height = targetHeight;
        ctx.drawImage(
          image,
          croppedAreaPixels.x,
          croppedAreaPixels.y,
          croppedAreaPixels.width,
          croppedAreaPixels.height,
          0,
          0,
          targetWidth,
          targetHeight
        );
        canvas.toBlob((blob) => {
          if (!blob) {
            reject(new Error("Canvas is empty"));
            return;
          }
          blob.name = "croppedImage.jpeg";
          resolve(blob);
        }, "image/jpeg");
      };
    });
  };

  useEffect(() => {
    if (isCouponChecked) {
      const newCouponCode = `DEALSLAH${formatDiscountPercentage(
        formik.values.discount_percentage
      )}`;
      setCouponCode(newCouponCode);
      formik.setFieldValue("coupon_code", newCouponCode);
    }
  }, [formik.values.discount_percentage, isCouponChecked]);

  const handleRadioChange = (e) => {
    const selectedValue = e.target.value;
    setIsCouponChecked(selectedValue === "discount");

    const formattedDiscount = formatDiscountPercentage(
      formik.values.discounted_percentage
    );
    const newCouponCode =
      selectedValue === "discount"
        ? `DEALSLAH${formattedDiscount}`
        : `DEALSLAHV${id.padStart(2, "0")}`;

    setCouponCode(newCouponCode);
    formik.setFieldValue("coupon_code", newCouponCode);
  };

  const formatDiscountPercentage = (value) => {
    const percentage = Math.round(value || 0);
    return percentage < 10 ? `0${percentage}` : `${percentage}`;
  };

  const addRow = () => {
    formik.setFieldValue("additional_details", [
      ...formik.values.additional_details,
      { video_url: "", order: "" },
    ]);
  };

  const removeRow = (index) => {
    const updatedRows = [...formik.values.additional_details];
    updatedRows.splice(index, 1);
    formik.setFieldValue("additional_details", updatedRows);
  };

  return (
    <section className="px-4">
      <form onSubmit={formik.handleSubmit}>
        {loading ? (
          <div className="loader-container">
            <div className="loader">
              <svg viewBox="0 0 80 80">
                <circle cx="40" cy="40" r="32"></circle>
              </svg>
            </div>
          </div>
        ) : (
          <>
            <div className="card shadow border-0 mb-3">
              <div className="row p-3">
                <div className="d-flex justify-content-between align-items-center">
                  <h1 className="h4 ls-tight">Edit Deals</h1>
                  <Link to="/product">
                    <button type="button" className="btn btn-light btn-sm">
                      <span>Back</span>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="container card shadow border-0 pb-5">
              <div className="row mt-3">
                <div className="col-md-6 col-12 mb-3">
                  <label className="form-label">
                    Category Group<span className="text-danger">*</span>
                  </label>
                  <select
                    className={`form-select ${
                      formik.touched.categoryGroupId &&
                      formik.errors.categoryGroupId
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("categoryGroupId")}
                    onChange={handleCategorygroupChange}
                    value={formik.values.categoryGroupId} // Ensure value is set from Formik state
                  >
                    <option value="">Select a category group</option>
                    {allCategorgroup &&
                      allCategorgroup.map((categorygroup) => (
                        <option key={categorygroup.id} value={categorygroup.id}>
                          {categorygroup.name}
                        </option>
                      ))}
                  </select>
                  {formik.touched.categoryGroupId &&
                    formik.errors.categoryGroupId && (
                      <div className="invalid-feedback">
                        {formik.errors.categoryGroupId}
                      </div>
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
                    onChange={(event) => {
                      const selectedValue = event.target.value;
                      if (selectedValue === "add_new") {
                        setShowModal(true);
                      } else {
                        formik.setFieldValue("category_id", selectedValue);
                      }
                    }}
                  >
                    <option></option>
                    {category &&
                      category.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
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
                    <option value="3">Product & Service</option>
                  </select>
                  {formik.touched.deal_type && formik.errors.deal_type && (
                    <div className="invalid-feedback">
                      {formik.errors.deal_type}
                    </div>
                  )}
                </div>

                <div className="col-md-6 col-12 mb-3">
                  <label className="form-label">Brand</label>
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
                    <div className="invalid-feedback">
                      {formik.errors.brand}
                    </div>
                  )}
                </div>
                <div className="col-md-6 col-12 mb-3">
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
                    maxLength={825}
                  />
                  {formik.touched.name && formik.errors.name && (
                    <div className="invalid-feedback">{formik.errors.name}</div>
                  )}
                </div>
                <div className="col-md-6 col-12 mb-3">
                  <label className="form-label">
                    Original Price<span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    onInput={(event) => {
                      event.target.value = event.target.value
                        .replace(/[^0-9.]/g, "")
                        .replace(/(\..*)\./g, "$1")
                        .replace(/(\.\d{1})./g, "$1");
                    }}
                    className={`form-control ${
                      formik.touched.original_price &&
                      formik.errors.original_price
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
                    type="text"
                    onInput={(event) => {
                      event.target.value = event.target.value
                        .replace(/[^0-9.]/g, "")
                        .replace(/(\..*)\./g, "$1")
                        .replace(/(\.\d{1})./g, "$1");
                    }}
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
                    Discounted Percentage<span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    readOnly
                    onInput={(event) => {
                      event.target.value = event.target.value
                        .replace(/[^0-9.]/g, "")
                        .replace(/(\..*?)\..*/g, "$1")
                        .slice(0, 5);
                    }}
                    className={`form-control ${
                      formik.touched.discount_percentage &&
                      formik.errors.discount_percentage
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("discount_percentage")}
                  />
                  {formik.touched.discount_percentage &&
                    formik.errors.discount_percentage && (
                      <div className="invalid-feedback">
                        {formik.errors.discount_percentage}
                      </div>
                    )}
                </div>
                <div className="col-md-6 col-12 mb-3">
                  <label className="form-label">
                    Start Date <span className="text-danger">*</span>
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
                    End Date <span className="text-danger">*</span>
                  </label>
                  <input
                    type="date"
                    className={`form-control ${
                      formik?.touched?.end_date && formik.errors.end_date
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("end_date")}
                  />
                  {formik.touched.end_date && formik.errors.end_date && (
                    <div className="invalid-feedback">
                      {formik.errors.end_date}
                    </div>
                  )}
                </div>

                {[1, 2, 3, 4].map((num, index) => (
                  <div key={num} className="col-md-6 col-12 mb-3">
                    <label className="form-label">
                      Image {num}
                      <span className="text-danger">*</span>
                    </label>
                    <input
                      type="file"
                      accept=".png,.jpeg,.jpg,.svg,.webp"
                      className={`form-control ${
                        formik.touched[`image_url${num}`] &&
                        formik.errors[`image_url${num}`]
                          ? "is-invalid"
                          : ""
                      }`}
                      name={`image_url${num}`}
                      onChange={(e) => handleFileChange(index, e)}
                      onBlur={formik.handleBlur}
                    />
                    <p style={{ fontSize: "13px" }}>
                      Note: Maximum file size is 2MB. Allowed: .png, .jpg,
                      .jpeg, .svg, .webp.
                    </p>
                    {formik.touched[`image_url${num}`] &&
                      formik.errors[`image_url${num}`] && (
                        <div className="invalid-feedback">
                          {formik.errors[`image_url${num}`]}
                        </div>
                      )}

                    {/* Show the image preview if it exists */}
                    {formik.values[`image${num}`] && (
                      <div className="image-preview mt-2">
                        <img
                          src={formik.values[`image${num}`]}
                          alt={`Image ${num} Preview`}
                          style={{
                            width: "100px",
                            height: "100px",
                            borderRadius: "8px",
                          }}
                        />
                      </div>
                    )}

                    {showCropper[index] && (
                      <>
                        <div className="crop-container">
                          <Cropper
                            image={images[index]}
                            crop={crops[index]}
                            zoom={zooms[index]}
                            aspect={320 / 240}
                            onCropChange={(crop) => {
                              const newCrops = [...crops];
                              newCrops[index] = crop;
                              setCrops(newCrops);
                            }}
                            onZoomChange={(zoom) => {
                              const newZooms = [...zooms];
                              newZooms[index] = zoom;
                              setZooms(newZooms);
                            }}
                            onCropComplete={(croppedArea, croppedAreaPixels) =>
                              onCropComplete(
                                index,
                                croppedArea,
                                croppedAreaPixels
                              )
                            }
                          />
                        </div>
                        <div className="d-flex justify-content-start mt-3 gap-2">
                          <button
                            type="button"
                            className="btn btn-primary mt-3"
                            onClick={() => handleCropSave(index)}
                          >
                            Save Cropped Image {num}
                          </button>
                          <button
                            type="button"
                            className="btn btn-secondary mt-3"
                            onClick={() => handleCropCancel(index)}
                          >
                            Cancel
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                ))}
                <div className="d-flex justify-content-end">
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-primary mt-3"
                    onClick={addRow}
                  >
                    <FaPlus />
                  </button>
                </div>
                {formik.values.additional_details?.map((row, index) => (
                  <div key={index} className="row mt-3">
                    <div className="col-lg-6 col-md-6 col-12">
                      <label>YouTube</label>
                      <input
                        className="form-control form-control-sm"
                        type="text"
                        name={`additional_details[${index}].video_url`}
                        value={
                          formik.values.additional_details[index]?.video_url
                        }
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.additional_details?.[index]?.video_url &&
                        formik.errors.additional_details?.[index]
                          ?.video_url && (
                          <div className="text-danger">
                            {formik.errors.additional_details[index].video_url}
                          </div>
                        )}
                    </div>
                    <div className="col-lg-5 col-md-5 col-12">
                      <label>Order List</label>
                      <select
                        className="form-select form-select-sm"
                        name={`additional_details[${index}].order`}
                        value={formik.values.additional_details[index]?.order}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      >
                        <option value="">Select</option>
                        {[...Array(10)].map((_, i) => (
                          <option key={i} value={i + 1}>
                            {i + 1}
                          </option>
                        ))}
                      </select>
                      {formik.touched.additional_details?.[index]?.order &&
                        formik.errors.additional_details?.[index]?.order && (
                          <div className="text-danger">
                            {formik.errors.additional_details[index].order}
                          </div>
                        )}
                    </div>
                    <div
                      className="col-lg-1 col-md-1 col-12 "
                      style={{ top: "25px", position: "relative" }}
                    >
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => removeRow(index)}
                        disabled={formik.values.additional_details.length === 1}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                ))}
                <div className="col-12 mb-5">
                  <label className="form-label">
                    Description<span className="text-danger">*</span>
                  </label>
                  <textarea
                    type="text"
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
                <div className="col-md-6 col-12 mt-5 d-flex align-items-center">
                  <div className="d-flex align-items-center">
                    <div className="form-check mb-3">
                      <input
                        type="radio"
                        name="changeCouponCode"
                        id="vendorCoupon"
                        value="fixed"
                        className="form-check-input"
                        style={{ boxShadow: "none" }}
                        checked={!isCouponChecked}
                        onChange={handleRadioChange}
                      />
                      <label htmlFor="vendorCoupon" className="form-label ms-2">
                        Vendor Coupon code
                      </label>
                    </div>
                    &nbsp; &nbsp; &nbsp;
                    <div className="form-check mb-3">
                      <input
                        type="radio"
                        name="changeCouponCode"
                        id="genricCoupon"
                        value="discount"
                        className="form-check-input"
                        style={{ boxShadow: "none" }}
                        checked={isCouponChecked}
                        onChange={handleRadioChange}
                      />
                      <label htmlFor="genricCoupon" className="form-label ms-2">
                        Generic Coupon Code
                      </label>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-12 mb-3">
                  <label className="form-label">Coupon Code</label>
                  <input
                    type="text"
                    className={`form-control ${
                      formik.touched.coupon_code && formik.errors.coupon_code
                        ? "is-invalid"
                        : ""
                    }`}
                    value={couponCode}
                    readOnly
                  />
                  {formik.touched.coupon_code && formik.errors.coupon_code && (
                    <div className="invalid-feedback">
                      {formik.errors.coupon_code}
                    </div>
                  )}
                </div>
              </div>
              <div className="hstack p-2">
                <button
                  type="submit"
                  className="btn btn-sm btn-button"
                  disabled={loadIndicator}
                  onClick={handlePlaceOrder}
                >
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
          </>
        )}
      </form>
    </section>
  );
}

export default ProductEdit;
