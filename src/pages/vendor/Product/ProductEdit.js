import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../../../config/URL";
import toast from "react-hot-toast";
import { FiAlertTriangle } from "react-icons/fi";
import Cropper from "react-easy-crop";
import { FaTrash } from "react-icons/fa";

function ProductEdit() {
  const navigate = useNavigate();
  const [loadIndicator, setLoadIndicator] = useState(false);

  const [mediaFields, setMediaFields] = useState([
    { image: "", video: "", selectedType: "image" },
  ]);
  const [cropperStates, setCropperStates] = useState([]);
  const [imageSrc, setImageSrc] = useState([]);
  const [crop, setCrop] = useState([]);
  const [zoom, setZoom] = useState([]);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState([]);
  const [originalFileName, setOriginalFileName] = useState([]);

  const [originalFileType, setOriginalFileType] = useState("");
  const MAX_FILE_SIZE = 2 * 1024 * 1024;

  const [showModal, setShowModal] = useState(false);
  const [allCategorgroup, setAllCategorgroup] = useState([]);
  const [selectedCategoryGroup, setSelectedCategoryGroup] = useState(null);
  const [category, setCategory] = useState([]);
  const id = localStorage.getItem("shop_id");
  const [couponCode, setCouponCode] = useState("DEALSLAH");
  const [isCouponChecked, setIsCouponChecked] = useState(false);

  const SUPPORTED_FORMATS = [
    "image/jpg",
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/svg+xml",
    "image/webp",
  ];

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const imageValidation = Yup.mixed()
    .required("*Image is required")
    .test("fileFormat", "Unsupported format", (value) => {
      return !value || (value && SUPPORTED_FORMATS.includes(value.type));
    })
    .test("fileSize", "File size is too large. Max 2MB.", (value) => {
      return !value || (value && value.size <= MAX_FILE_SIZE);
    });

  const validationSchema = Yup.object({
    shop_id: Yup.string().required("Category Group is required"),
    category_id: Yup.string().required("Category is required"),
    name: Yup.string()
      .max(25, "Name must be 25 characters or less")
      .required("Name is required"),
    deal_type: Yup.string().required("Deal Type is required"),
    original_price: Yup.number()
      .required("Original Price is required")
      .min(1, "Original Price must be greater than zero"),
    delivery_days: Yup.string().required("Delivery Days is required"),
    discounted_price: Yup.number()
      .required("Discounted Price is required")
      .max(
        Yup.ref("original_price"),
        "The Discounted Price must be same or below the Original Price."
      ),
    discounted_percentage: Yup.number()
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
    description: Yup.string()
      .required("Description is required")
      .min(10, "Description must be at least 10 characters long"),
    specifications: Yup.string()
      .required("Specification is required")
      .min(10, "Specification must be at least 10 characters long"),
    coupon_code: Yup.string()
      .matches(
        /^[A-Za-z]+[0-9]{0,4}$/,
        "Coupon code must end with up to 4 digits"
      )
      .required("Coupon code is required"),
    ...mediaFields.reduce((acc, field, index) => {
      if (field.selectedType === "image") {
        acc[`image-${index}`] = Yup.mixed().required(
          `Image ${index + 1} is required`
        );
      } else if (field.selectedType === "video") {
        acc[`video-${index}`] = Yup.string()
          .url(`Youtube ${index + 1} must be a valid URL`)
          .required(`Youtube ${index + 1} is required`);
      }
      return acc;
    }, {}),
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
      start_date: getCurrentDate(),
      end_date: "",
      coupon_code: couponCode,
      image: null,
      description: "",
      variants: [{ id: Date.now(), value: "" }],
      delivery_days: "",
      specifications: "",
      ...mediaFields.reduce((acc, _, index) => {
        acc[`image-${index}`] = null;
        acc[`video-${index}`] = "";
        return acc;
      }, {}),
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const formattedVariants = values.variants
        .map((variant) => variant.value.trim())
        .filter((value) => value !== "")
        .map((value) => value.replace(/,\s*$/, ""));
      const formData = new FormData();
      formData.append("shop_id", id);
      formData.append("_method", "PUT");
      formData.append("name", values.name);
      formData.append("category_id", values.category_id);
      formData.append("deal_type", values.deal_type);
      formData.append("varient", formattedVariants);
      formData.append("brand", values.brand);
      formData.append("original_price", values.original_price);
      formData.append("discounted_price", values.discounted_price);
      formData.append("discount_percentage", values.discounted_percentage);
      formData.append("start_date", values.start_date);
      formData.append("end_date", values.end_date);
      formData.append("coupon_code", values.coupon_code);
      // formData.append("image-${index}", imageFile);
      formData.append("description", values.description);
      formData.append("specifications", values.specifications);
      mediaFields.forEach((field, index) => {
        if (field.selectedType === "image" && values[`image-${index}`]) {
          formData.append(`media[${index + 1}]`, values[`image-${index}`]);
        }
        if (field.selectedType === "video" && values[`video-${index}`]) {
          formData.append(`media_url[${index + 1}]`, values[`video-${index}`]);
        }
      });
      const slug = values.name.toLowerCase().replace(/\s+/g, "_");
      const finalSlug = `${slug}_${id}`;
      formData.append("slug", finalSlug);

      console.log("Form Data:", formData);
      setLoadIndicator(true);
      try {
        const response = await api.post(`vendor/product/133/update`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log("Response", response);
        if (response.status === 200) {
          toast.success(response.data.message);
          setShowModal(false);
          navigate(`/product/print/${response.data.data.id}`);
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
    const getData = {
      success: true,
      status: 200,
      data: {
        id: 1,
        shop_id: 1,
        deal_type: 1,
        category_id: 1,
        brand: "OnePlus",
        name: "OnePlus 12 12/256",
        description:
          "Upgrade to the OnePlus 12 with 12GB RAM 256 ROM for high-speed performance and sleek design!. Get premium quality and power at an unbeatable value – limited time offer!",
        slug: "oneplus_12",
        original_price: "829.00",
        discounted_price: "770.00",
        discount_percentage: "7.10",
        start_date: "2024-11-22T00:00:00.000000Z",
        end_date: "2024-12-22T00:00:00.000000Z",
        stock: 1,
        sku: null,
        active: 1,
        deleted_at: null,
        created_at: "2024-11-22T14:06:26.000000Z",
        updated_at: "2024-11-22T14:59:40.000000Z",
        coupon_code: "DEALSLAHV01",
        specifications: null,
        varient: null,
        categoryName: "Mobile Phones",
        categoryGroupName: "Electronics",
        categoryGroupId: 1,
        product_media: [
          {
            id: 1,
            path: "assets/products/images/1/oneplus_12/oneplus1.webp",
            order: 0,
            type: "image",
            imageable_id: 1,
            imageable_type: "App\\Models\\Product",
            created_at: null,
            updated_at: null,
          },
          {
            id: 2,
            path: "https://youtu.be/eCXya4fqJ_E?si=NWQ1rwnaKcu2vQ6L",
            order: 1,
            type: "video",
            imageable_id: 1,
            imageable_type: "App\\Models\\Product",
            created_at: null,
            updated_at: null,
          },
          {
            id: 3,
            path: "assets/products/images/1/oneplus_12/oneplus2.webp",
            order: 2,
            type: "image",
            imageable_id: 1,
            imageable_type: "App\\Models\\Product",
            created_at: null,
            updated_at: null,
          },
          {
            id: 4,
            path: "assets/products/images/1/oneplus_12/oneplus3.webp",
            order: 3,
            type: "image",
            imageable_id: 1,
            imageable_type: "App\\Models\\Product",
            created_at: null,
            updated_at: null,
          },
          {
            id: 5,
            path: "https://youtu.be/PdVZRoLsYm4?si=cDkGJOqYpPBXsKU4",
            order: 4,
            type: "video",
            imageable_id: 1,
            imageable_type: "App\\Models\\Product",
            created_at: null,
            updated_at: null,
          },
          {
            id: 6,
            path: "assets/products/images/1/oneplus_12/oneplus4.webp",
            order: 5,
            type: "image",
            imageable_id: 1,
            imageable_type: "App\\Models\\Product",
            created_at: null,
            updated_at: null,
          },
        ],
      },
      message: "Product Retrieved Successfully!",
    };
    const mediaFields = getData.data.product_media.reduce(
      (acc, mediaItem, index) => {
        if (mediaItem.type === "image") {
          acc[`image-${index}`] = mediaItem.path || null;
        } else if (mediaItem.type === "video") {
          acc[`video-${index}`] = mediaItem.path || "";
        }
        return acc;
      },
      {}
    );
    formik.setValues({
      category_id: getData.data.category_id || "",
      name: getData.data.name || "",
      shop_id: getData.data.categoryGroupId || "",
      deal_type: getData.data.deal_type || "",
      brand: getData.data.brand || "",
      original_price: getData.data.original_price || "",
      discounted_price: getData.data.discounted_price || "",
      discounted_percentage: getData.data.discount_percentage || "",
      start_date: getData.data.start_date.slice(0, 10) || "",
      end_date: getData.data.end_date.slice(0, 10) || "",
      coupon_code: getData.data.coupon_code || "",
      description: getData.data.description || "",
      variants: getData.data.varient
        ? getData.data.varient
            .split(",")
            .map((value) => ({ value: value.trim() }))
        : [{ id: Date.now(), value: "" }],
      specifications: getData.data.specifications || "",
      mediaFields: getData.data.product_media.map((mediaItem, index) => ({
        selectedType: mediaItem.type,
        [`image-${index}`]: mediaItem.type === "image" ? mediaItem.path : null,
        [`video-${index}`]: mediaItem.type === "video" ? mediaItem.path : "",
      })),
    });
    fetchCategory(getData.data.categoryGroupId);
  }, []);

  const handlePlaceOrder = (e) => {
    e.preventDefault();

    formik.validateForm().then((errors) => {
      formik.setTouched({
        shop_id: true,
        name: true,
        category_id: true,
        deal_type: true,
        delivery_days: true,
        brand: true,
        original_price: true,
        discounted_price: true,
        discounted_percentage: true,
        start_date: true,
        end_date: true,
        coupon_code: true,
        image: true,
        description: true,
        specifications: true,
        ...mediaFields.reduce((acc, _, index) => {
          acc[`image-${index}`] = true;
          acc[`video-${index}`] = true;
          return acc;
        }, {}),
      });

      const formErrors = formik.errors;
      if (Object.keys(formErrors).length > 0) {
        const fieldLabels = {
          shop_id: "Category Group",
          name: "Name",
          category_id: "Category",
          deal_type: "Deal Type",
          delivery_days: "Delivery Days",
          brand: "Brand",
          original_price: "Original Price",
          discounted_price: "Discounted Price",
          discounted_percentage: "Discounted Percentage",
          start_date: "Start Date",
          end_date: "End Date",
          coupon_code: "Coupon Code",
          image: "Main Image",
          description: "Description",
          specifications: "Specifications",
          ...mediaFields.reduce((acc, _, index) => {
            acc[`image-${index}`] = `Image ${index + 1}`;
            acc[`video-${index}`] = `Youtube ${index + 1}`;
            return acc;
          }, {}),
        };

        const missedFields = Object.keys(formErrors)
          .map((key) => fieldLabels[key] || key) // Fallback to key if no label found
          .join(", ");

        // Ensure toast is displayed
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

      // Proceed to submit the form
      formik.handleSubmit();
    });
  };

  const addVariant = () => {
    const newVariant = { id: Date.now(), value: "" };
    formik.setFieldValue("variants", [...formik.values.variants, newVariant]);
  };

  const removeVariant = (id) => {
    const updatedVariants = formik.values.variants.filter(
      (variant) => variant.id !== id
    );
    formik.setFieldValue("variants", updatedVariants);
  };

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

  const fetchCategory = async (categoryId) => {
    try {
      const category = await api.get(
        `vendor/categories/categorygroups/${categoryId}`
      );
      setCategory(category.data.data);
    } catch (error) {
      toast.error(error);
    }
  };
  const handleCategorygroupChange = (event) => {
    const categoryGroup = event.target.value;
    setCategory([]);

    formik.setFieldValue("shop_id", categoryGroup);

    setSelectedCategoryGroup(categoryGroup);
    fetchCategory(categoryGroup);
  };

  useEffect(() => {
    const { original_price, discounted_price } = formik.values;

    const timeoutId = setTimeout(() => {
      if (original_price) {
        if (discounted_price === null || discounted_price === "0") {
          formik.setFieldValue("discounted_percentage", 100);
        } else {
          const discountedPercentage =
            ((original_price - discounted_price) / original_price) * 100;

          const formattedPercentage = parseFloat(
            (Math.round(discountedPercentage * 10) / 10).toFixed(1)
          );
          formik.setFieldValue("discounted_percentage", formattedPercentage);
        }
      }
    }, 1000);

    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values.discounted_price, formik.values.original_price]);

  // const getData = async () => {
  //   try {
  //     const response = await api.get(`vendor/product/${id}/get`);
  //     const {
  //       image_url1,
  //       image_url2,
  //       image_url3,
  //       image_url4,
  //       coupon_code,
  //       additional_details,
  //       ...rest
  //     } = response.data.data;
  //     setIsCouponChecked(/\d/.test(coupon_code.charAt(8))); // Check if 9th character is a digit
  //     const parsedAdditionalDetails = additional_details
  //       ? JSON.parse(additional_details)
  //       : [];

  //     formik.setValues({
  //       ...rest,
  //     });
  //     setCouponCode(coupon_code);
  //   } catch (error) {
  //     toast.error("Error Fetching Data", error.message);
  //   }
  // };

  // useEffect(() => {
  //   getData();
  // }, []);

  const updateCrop = (index, newCrop) => {
    setCrop((prevCrop) => {
      const newCropArray = [...prevCrop];
      newCropArray[index] = newCrop;
      return newCropArray;
    });
  };

  const handleFileChange = (event, index, type) => {
    const file = event?.target?.files[0];
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        toast.error("File size is too large. Max 2MB.");
        event.target.value = null;
        return;
      }

      if (type === "image") {
        const reader = new FileReader();
        reader.onload = () => {
          const updatedImageSrc = [...imageSrc];
          updatedImageSrc[index] = reader.result;
          setImageSrc(updatedImageSrc);

          // Update cropper state for this index
          const updatedCropperStates = [...cropperStates];
          updatedCropperStates[index] = true;
          setCropperStates(updatedCropperStates);

          setOriginalFileName((prev) => {
            const updated = [...prev];
            updated[index] = file.name;
            return updated;
          });
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const onCropComplete = (index, croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels((prevState) => {
      const updatedState = [...prevState];
      updatedState[index] = croppedAreaPixels;
      return updatedState;
    });
  };

  const getCroppedImg = (imageSrc, crop, croppedAreaPixels, index) => {
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
          blob.name = `croppedImage-${index}.jpeg`;
          resolve(blob);
        }, "image/jpeg");
      };
    });
  };

  const handleCropSave = async (index) => {
    try {
      const croppedImageBlob = await getCroppedImg(
        imageSrc[index],
        crop[index],
        croppedAreaPixels[index],
        index
      );
      const file = new File([croppedImageBlob], originalFileName[index], {
        type: "image/jpeg",
      });

      // Update formik values for the specific index
      formik.setFieldValue(`image-${index}`, file);

      // Update cropper state
      const updatedCropperStates = [...cropperStates];
      updatedCropperStates[index] = false;
      setCropperStates(updatedCropperStates);
    } catch (error) {
      console.error("Error cropping the image:", error);
    }
  };

  const handleCropCancel = (index) => {
    const updatedCropperStates = [...cropperStates];
    updatedCropperStates[index] = false;
    setCropperStates(updatedCropperStates);

    const updatedImageSrc = [...imageSrc];
    updatedImageSrc[index] = null;
    setImageSrc(updatedImageSrc);

    formik.setFieldValue(`image-${index}`, null);
    // Reset the file input
    const fileInput = document.querySelector(`input[name="image-${index}"]`);
    if (fileInput) fileInput.value = "";
  };

  const formatDiscountPercentage = (discounted_percentage) => {
    const roundedDiscount = Math.round(discounted_percentage || 0);
    return roundedDiscount < 10 ? `0${roundedDiscount}` : `${roundedDiscount}`;
  };

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

  useEffect(() => {
    const formattedDiscount = formatDiscountPercentage(
      formik.values.discounted_percentage
    );

    if (isCouponChecked) {
      const updatedCoupon = `DEALSLAH${formattedDiscount}`;
      setCouponCode(updatedCoupon);
      formik.setFieldValue("coupon_code", updatedCoupon);
    } else {
      const updatedCoupon = `DEALSLAHV${id.padStart(2, "0")}`;
      setCouponCode(updatedCoupon);
      formik.setFieldValue("coupon_code", updatedCoupon);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values.discounted_percentage, isCouponChecked]);

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

  const handleDelete = (indexToDelete) => {
    if (mediaFields.length > 1 && indexToDelete !== 0) {
      // Remove the specific row from mediaFields
      const updatedFields = mediaFields.filter(
        (_, index) => index !== indexToDelete
      );
      setMediaFields(updatedFields);

      // Create new form values without the deleted row
      const newValues = { ...formik.values };
      delete newValues[`image-${indexToDelete}`];
      delete newValues[`video-${indexToDelete}`];

      // Reindex the remaining fields after the deleted index
      for (let i = indexToDelete; i < mediaFields.length - 1; i++) {
        if (newValues[`image-${i + 1}`]) {
          newValues[`image-${i}`] = newValues[`image-${i + 1}`];
          delete newValues[`image-${i + 1}`];
        }
        if (newValues[`video-${i + 1}`]) {
          newValues[`video-${i}`] = newValues[`video-${i + 1}`];
          delete newValues[`video-${i + 1}`];
        }
      }

      // Update formik values
      formik.setValues(newValues);

      // Update other state arrays
      setImageSrc((prev) => prev.filter((_, index) => index !== indexToDelete));
      setCrop((prev) => prev.filter((_, index) => index !== indexToDelete));
      setCroppedAreaPixels((prev) =>
        prev.filter((_, index) => index !== indexToDelete)
      );
      setOriginalFileName((prev) =>
        prev.filter((_, index) => index !== indexToDelete)
      );
    }
  };

  const handleAddMore = () => {
    if (mediaFields.length < 7) {
      setMediaFields([
        ...mediaFields,
        { image: "", video: "", selectedType: "image" },
      ]);
    }
  };

  const handleTypeChange = (index, type) => {
    const updatedFields = [...formik.values.mediaFields];
    updatedFields[index].selectedType = type;
    setMediaFields(updatedFields);

    // Reset the values and errors for the changed field
    if (type === "image") {
      formik.setFieldValue(`video-${index}`, "");
      formik.setFieldError(`video-${index}`, undefined);
      formik.setFieldTouched(`video-${index}`, false);
    } else {
      formik.setFieldValue(`image-${index}`, null);
      formik.setFieldError(`image-${index}`, undefined);
      formik.setFieldTouched(`image-${index}`, false);
      const updatedImageSrc = [...imageSrc];
      updatedImageSrc[index] = null;
      setImageSrc(updatedImageSrc);
    }
  };

  return (
    <section className="px-4">
      <form onSubmit={formik.handleSubmit}>
        <div className="card shadow border-0 mb-3">
          <div className="row p-3">
            <div className="d-flex justify-content-between align-items-center">
              <h1 className="h4 ls-tight">Add Deals</h1>
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
                className={`form-select form-select-sm ${
                  formik.touched.shop_id && formik.errors.shop_id
                    ? "is-invalid"
                    : ""
                }`}
                {...formik.getFieldProps("shop_id")}
                onChange={handleCategorygroupChange}
                value={formik.values.shop_id}
              >
                <option value="">Select a category group</option>
                {allCategorgroup &&
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
                className={`form-select form-select-sm ${
                  formik.touched.category_id && formik.errors.category_id
                    ? "is-invalid"
                    : ""
                }`}
                {...formik.getFieldProps("category_id")}
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
                className={`form-select form-select-sm ${
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
                Delivery Days<span className="text-danger">*</span>
              </label>
              <select
                type="text"
                className={`form-select form-select-sm ${
                  formik.touched.delivery_days && formik.errors.delivery_days
                    ? "is-invalid"
                    : ""
                }`}
                {...formik.getFieldProps("delivery_days")}
              >
                <option></option>
                <option value="1">1 Days</option>
                <option value="2">2 Days</option>
                <option value="3">3 Days</option>
                <option value="4">4 Days</option>
                <option value="5">5 Days</option>
                <option value="6">6 Days</option>
                <option value="7">7 Days</option>
                <option value="8">8 Days</option>
                <option value="9">9 Days</option>
                <option value="10">10 Days</option>
              </select>
              {formik.touched.delivery_days && formik.errors.delivery_days && (
                <div className="invalid-feedback">
                  {formik.errors.delivery_days}
                </div>
              )}
            </div>
            <div className="col-md-6 col-12 mb-3">
              <label className="form-label">Brand</label>
              <input
                type="text"
                className={`form-control form-control-sm ${
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
                className={`form-control form-control-sm ${
                  formik.touched.name && formik.errors.name ? "is-invalid" : ""
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
                className={`form-control form-control-sm ${
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
                type="text"
                onInput={(event) => {
                  event.target.value = event.target.value
                    .replace(/[^0-9.]/g, "")
                    .replace(/(\..*)\./g, "$1")
                    .replace(/(\.\d{1})./g, "$1");
                }}
                className={`form-control form-control-sm ${
                  formik.touched.discounted_price &&
                  formik.errors.discounted_price
                    ? "is-invalid"
                    : ""
                }`}
                {...formik.getFieldProps("discounted_price")}
                value={formik.values.discounted_price}
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
                Discounted Percentage (%)<span className="text-danger">*</span>
              </label>
              <input
                type="text"
                readOnly
                onInput={(event) => {
                  let value = event.target.value
                    .replace(/[^0-9.]/g, "")
                    .replace(/(\..*)\./g, "$1")
                    .replace(/^(\d*\.\d{1}).*/, "$1");

                  formik.setFieldValue("discounted_percentage", value);
                }}
                {...formik.getFieldProps("discounted_percentage")}
                className={`form-control form-control-sm ${
                  formik.touched.discounted_percentage &&
                  formik.errors.discounted_percentage
                    ? "is-invalid"
                    : ""
                }`}
              />
              {formik.touched.discounted_percentage &&
                formik.errors.discounted_percentage && (
                  <div className="invalid-feedback">
                    {formik.errors.discounted_percentage}
                  </div>
                )}
            </div>
            <div className="col-md-12 mb-3">
              <label className="form-label">Variants</label>
              <div className="row">
                {formik.values.variants.map((variant, index) => (
                  <div className="col-md-6 col-12 mb-2" key={variant.id}>
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        name={`variants[${index}].value`}
                        value={variant.value}
                        onChange={(e) => {
                          const valueWithoutComma = e.target.value.replace(
                            /,/g,
                            ""
                          );
                          formik.setFieldValue(
                            `variants[${index}].value`,
                            valueWithoutComma
                          );
                        }}
                        placeholder={`Variant ${index + 1}`}
                      />

                      <button
                        type="button"
                        className="btn btn-danger btn-sm"
                        onClick={() => removeVariant(variant.id)}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <button
                type="button"
                className="btn btn-sm btn-button"
                onClick={addVariant}
              >
                Add Variant
              </button>
            </div>
            <div className="col-md-6 col-12 mb-3">
              <label className="form-label">
                Start Date <span className="text-danger">*</span>
              </label>
              <input
                type="date"
                className={`form-control form-control-sm ${
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
                className={`form-control form-control-sm ${
                  formik?.touched?.end_date && formik.errors.end_date
                    ? "is-invalid"
                    : ""
                }`}
                {...formik.getFieldProps("end_date")}
              />
              {formik.touched.end_date && formik.errors.end_date && (
                <div className="invalid-feedback">{formik.errors.end_date}</div>
              )}
            </div>
            <>
              {formik.values.mediaFields?.map((field, index) => (
                <div key={index} className="row">
                  <p>Thumbnail {index + 1}</p>
                  <div className="col-12 d-flex align-items-center mb-3">
                    <div className="form-check me-3">
                      <input
                        type="radio"
                        name={`type-${index}`}
                        id={`image-${index}`}
                        className="form-check-input"
                        checked={
                          (index === 0 && field.selectedType === "image") ||
                          field.selectedType === "image"
                        }
                        onChange={() => handleTypeChange(index, "image")}
                      />
                      <label
                        className="form-check-label"
                        htmlFor={`image-${index}`}
                      >
                        Image
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="radio"
                        name={`type-${index}`}
                        id={`video-${index}`}
                        className="form-check-input"
                        checked={field.selectedType === "video"}
                        onChange={() => handleTypeChange(index, "video")}
                        disabled={index === 0}
                      />
                      <label
                        className="form-check-label"
                        htmlFor={`video-${index}`}
                      >
                        Youtube
                      </label>
                    </div>
                  </div>

                  <div className="col-md-6 col-12 mb-3">
                    <label className="form-label">
                      Image
                      {field.selectedType === "image" && (
                        <span className="text-danger">*</span>
                      )}
                    </label>
                    <input
                      type="file"
                      accept=".png,.jpeg,.jpg,.svg,.webp"
                      className={`form-control ${
                        formik.touched[`image-${index}`] &&
                        formik.errors[`image-${index}`]
                          ? "is-invalid"
                          : ""
                      }`}
                      disabled={field.selectedType !== "image"}
                      onChange={(e) => handleFileChange(e, index, "image")}
                    />
                    {formik.touched[`image-${index}`] &&
                      formik.errors[`image-${index}`] && (
                        <div className="invalid-feedback">
                          {formik.errors[`image-${index}`]}
                        </div>
                      )}
                    {field.selectedType === "image" && (
                      <img src={`image-${index}`} alt="noImage" className="" />
                    )}
                    {cropperStates[index] &&
                      imageSrc[index] &&
                      field.selectedType === "image" && (
                        <div className="crop-container">
                          <Cropper
                            image={imageSrc[index]}
                            crop={crop[index] || { x: 0, y: 0 }}
                            zoom={zoom[index] || 1}
                            aspect={320 / 240}
                            onCropChange={(newCrop) =>
                              updateCrop(index, newCrop)
                            }
                            onZoomChange={(newZoom) =>
                              setZoom((prevZoom) => {
                                const updatedZoom = [...prevZoom];
                                updatedZoom[index] = newZoom;
                                return updatedZoom;
                              })
                            }
                            onCropComplete={(croppedArea, croppedAreaPixels) =>
                              onCropComplete(
                                index,
                                croppedArea,
                                croppedAreaPixels
                              )
                            }
                          />
                        </div>
                      )}
                    <div className="d-flex justify-content-start mt-3 gap-2">
                      <button
                        type="button"
                        className="btn btn-primary mt-3"
                        onClick={() => handleCropSave(index)}
                      >
                        Save Cropped Image
                      </button>
                      <button
                        type="button"
                        className="btn btn-secondary mt-3"
                        onClick={() => handleCropCancel(index)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                  <div className="col-md-6 col-12 mb-3">
                    <label className="form-label">
                      Youtube
                      {field.selectedType === "video" && (
                        <span className="text-danger">*</span>
                      )}
                    </label>
                    <input
                      type="text"
                      className={`form-control ${
                        formik.touched[`video-${index}`] &&
                        formik.errors[`video-${index}`]
                          ? "is-invalid"
                          : ""
                      }`}
                      name={`video-${index}`}
                      value={formik.values[`video-${index}`]}
                      disabled={field.selectedType !== "video"}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched[`video-${index}`] &&
                      formik.errors[`video-${index}`] && (
                        <div className="invalid-feedback">
                          {formik.errors[`video-${index}`]}
                        </div>
                      )}
                  </div>
                  <div className="text-end">
                    {mediaFields.length > 1 &&
                      index > 0 &&
                      index === mediaFields.length - 1 && (
                        <button
                          type="button"
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(index)}
                        >
                          Delete
                        </button>
                      )}
                  </div>
                </div>
              ))}

              <div className="text-end mt-3">
                {mediaFields.length < 7 && (
                  <button
                    type="button"
                    onClick={handleAddMore}
                    className="btn btn-success btn-sm"
                  >
                    Add More
                  </button>
                )}
              </div>
            </>

            <div className="col-12 mb-5">
              <label className="form-label">
                Description<span className="text-danger">*</span>
              </label>
              <textarea
                type="text"
                rows={5}
                className={`form-control form-control-sm ${
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
            <div className="col-12 mb-5">
              <label className="form-label">
                Specification<span className="text-danger">*</span>
              </label>
              <textarea
                type="text"
                rows={5}
                className={`form-control form-control-sm ${
                  formik.touched.specifications && formik.errors.specifications
                    ? "is-invalid"
                    : ""
                }`}
                {...formik.getFieldProps("specifications")}
              />
              {formik.touched.specifications &&
                formik.errors.specifications && (
                  <div className="invalid-feedback">
                    {formik.errors.specifications}
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
                className={`form-control form-control-sm ${
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
              Submit
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}

export default ProductEdit;
