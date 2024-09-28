import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../../../config/URL";
import toast from "react-hot-toast";
import ImageURL from "../../../config/ImageURL";

function CategoryGroupEdit() {
    const [loadIndicator, setLoadIndicator] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();
    const [imageSrc, setImageSrc] = useState(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const [showCropper, setShowCropper] = useState(false);
    const [croppedImagePreview, setCroppedImagePreview] = useState(null);

    const validationSchema = Yup.object({
        name: Yup.string().required("*Name is required"),
        // slug: Yup.string().required("*Slug is required"),
        // icon: Yup.mixed().required("*Image is required"),
        order: Yup.string().required("*Select an order"),
        // active: Yup.string().required("*Select an active"),
    });

    const formik = useFormik({
        initialValues: {
            name: "",
            slug: "",
            icon: "",
            image: null,
            order: "",
            active: "",
            description: "",
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            const formData = new FormData();
            formData.append("_method", "PUT");

            formData.append("name", values.name);
            formData.append("slug", values.slug);
            formData.append("icon", values.icon);
            formData.append("image", values.image);
            formData.append("order", values.order);
            formData.append("active", values.active);
            formData.append("description", values.description);
            setLoadIndicator(true);
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
            } finally {
                setLoadIndicator(false);
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

    useEffect(() => {
        const slug = formik.values.name.toLowerCase().replace(/\s+/g, "_");
        formik.setFieldValue("slug", slug);
    }, [formik.values.name]);
    const handleFileChange = (event) => {
        const file = event.currentTarget.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = () => {
            setImageSrc(reader.result);
            setShowCropper(true);
          };
          reader.readAsDataURL(file);
        }
      };
    
      const convertImageToBase64 = (url, callback) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
          const reader = new FileReader();
          reader.onloadend = function () {
            callback(reader.result);
          };
          reader.readAsDataURL(xhr.response);
        };
        xhr.open('GET', url);
        xhr.responseType = 'blob';
        xhr.send();
      };
    
      const onCropComplete = (croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
      };
    
      // Helper function to get the cropped image
      const getCroppedImg = (imageSrc, crop, croppedAreaPixels) => {
        return new Promise((resolve, reject) => {
          const image = new Image();
          image.src = imageSrc;
          image.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
    
            // Set canvas size to 250x250 pixels
            const targetWidth = 1750;
            const targetHeight = 550;
            canvas.width = targetWidth;
            canvas.height = targetHeight;
    
            // Scale the cropped image to fit into the 250x250 pixels canvas
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
    
            // Convert the canvas content to a Blob
            canvas.toBlob((blob) => {
              if (!blob) {
                reject(new Error('Canvas is empty'));
                return;
              }
              blob.name = 'croppedImage.jpeg';
              resolve(blob);
            }, 'image/jpeg');
          };
        });
      };
    
      const handleCropSave = async () => {
        try {
          const croppedImageBlob = await getCroppedImg(imageSrc, crop, croppedAreaPixels);
    
          // Convert the Blob to a File object
          const file = new File([croppedImageBlob], "croppedImage.jpg", { type: "image/jpeg" });
    
          // Set the file in Formik
          formik.setFieldValue("image", file);
    
          // Close the cropper
          setShowCropper(false);
        } catch (error) {
          console.error("Error cropping the image:", error);
        }
      };
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
                                    Order<span className="text-danger">*</span>
                                </label>
                                <select
                                    className={`form-select ${formik.touched.order && formik.errors.order ? "is-invalid" : ""}`}
                                    {...formik.getFieldProps("order")}
                                >
                                    <option value=""></option>
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
                                    Icon<span className="text-danger">*</span>
                                </label>
                                <input
                                    type="text"
                                    className={`form-control ${formik.touched.icon && formik.errors.icon ? "is-invalid" : ""}`}
                                    {...formik.getFieldProps("icon")}
                                />
                                {formik.touched.icon && formik.errors.icon && (
                                    <div className="invalid-feedback">{formik.errors.icon}</div>
                                )}
                            </div>

                            <div className="col-md-6 col-12 mb-3">
                                <label className="form-label fw-bold">
                                    Image<span className="text-danger">*</span>
                                </label>

                                <input
                                    type="file"
                                    name="image"
                                    accept=".png,.jpeg,.jpg,.gif,.svg"
                                    className="form-control"
                                    onChange={(event) => {
                                        const file = event.target.files[0];
                                        formik.setFieldValue("image", file);
                                    }}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.image && formik.errors.image && (
                                    <div className="error text-danger">
                                        <small>{formik.errors.image}</small>
                                    </div>
                                )}

                                {formik.values.image && (
                                    <div className="mb-3">
                                        {typeof formik.values.image === "object" ? (
                                            <img
                                                src={URL.createObjectURL(formik.values.image)}
                                                alt="image"
                                                style={{ maxWidth: "100px", maxHeight: "100px" }}
                                            />
                                        ) : (
                                            <img
                                                src={`${ImageURL}${formik.values.image}`}
                                                alt="image"
                                                style={{ maxWidth: "100px", maxHeight: "100px" }}
                                            />
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* 
                            <div className="col-md-6 col-12 mb-3">
                                <label className="form-label">
                                    Active<span className="text-danger">*</span>
                                </label>
                                <select
                                    aria-label="Default select example"
                                    className={`form-select ${formik.touched.active && formik.errors.active
                                        ? "is-invalid"
                                        : ""
                                        }`}
                                    {...formik.getFieldProps("active")}
                                >
                                    <option >Select an option</option>
                                    <option value="0">Active</option>
                                    <option value="1">InActive</option>
                                </select>
                                {formik.touched.active && formik.errors.active && (
                                    <div className="invalid-feedback">
                                        {formik.errors.active}
                                    </div>
                                )}
                            </div> */}

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
                        <button
                            type="submit"
                            className="btn btn-sm btn-button"
                        // disabled={loadIndicator}
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
            </form>
        </div>
    );
}

export default CategoryGroupEdit;
