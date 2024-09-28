import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FiAlertTriangle } from "react-icons/fi";
import toast from "react-hot-toast";
import api from "../../../config/URL";
import Cropper from "react-easy-crop";

function CategoryGroupAdd() {
    const [loadIndicator, setLoadIndicator] = useState(false);
    const [logo, setLogo] = useState(null); // this is the file
    const navigate = useNavigate();
    const [imageSrc, setImageSrc] = useState(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const [showCropper, setShowCropper] = useState(false);

    const validationSchema = Yup.object({
        name: Yup.string().required("*Name is required"),
        order: Yup.string().required("*Select an order"),
    });

    const formik = useFormik({
        initialValues: {
            name: "",
            slug: "",
            icon: "",
            image: null,
            order: "",
            description: "",
        },
        validationSchema: validationSchema,
        onSubmit: async (values, { resetForm }) => {
            console.log("Category Group Data:", values);

            const formData = new FormData();
            formData.append("name", values.name);
            formData.append("slug", values.slug);
            formData.append("icon", values.icon); // adding the logo file to FormData
            formData.append("image", logo); // adding the logo file to FormData
            formData.append("order", values.order);
            formData.append("description", values.description);

            setLoadIndicator(true);

            try {
                const response = await api.post(`admin/categoryGroup`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data", // make sure this is multipart/form-data
                    },
                });
                console.log("Response", response);

                if (response.status === 200) {
                    toast.success(response.data.message);
                    navigate("/categorygroup");
                    resetForm();
                } else {
                    toast.error(response.data.message);
                }
            } catch (error) {
                if (error.response && error.response.status === 422) {
                    const errors = error.response.data.error;
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
        const slug = formik.values.name.toLowerCase().replace(/\s+/g, "_");
        formik.setFieldValue("slug", slug);
    }, [formik.values.name]);
    const handleFileChange = async (event) => {
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
        <div className="container-fluid minHeight m-0">
            <form onSubmit={formik.handleSubmit}>
                <div className="card shadow border-0 mb-2 top-header">
                    <div className="container-fluid py-4">
                        <div className="row align-items-center">
                            <div className="col">
                                <div className="d-flex align-items-center gap-4">
                                    <h1 className="h4 ls-tight headingColor">Add Category Group</h1>
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
                    <div className="row mt-3 me-2">
                        <div className="col-12 text-end"></div>
                    </div>
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
                                    aria-label="Default select example"
                                    className={`form-select ${formik.touched.order && formik.errors.order ? "is-invalid" : ""}`}
                                    {...formik.getFieldProps("order")}
                                >
                                    <option value="">Select an order</option>
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

                            {/* <div className="col-md-6 col-12 mb-3">
                                <label className="form-label">
                                    Image<span className="text-danger">*</span>
                                </label>
                                <input
                                    name="image"
                                    type="file"
                                    accept=".png, .jpg, .jpeg, .gif, .svg, .webp"
                                    className={`form-control`}
                                    onChange={(event) => {
                                        const file = event.currentTarget.files[0];
                                        setLogo(file);
                                    }}
                                />
                                {formik.touched.image && formik.errors.image && (
                                    <div className="invalid-feedback">{formik.errors.image}</div>
                                )}
                            </div> */}
                            <div className="col-md-6 col-12 file-input">
              <label className="form-label">
                Image<span className="text-danger">*</span>
              </label>
              <input
                type="file"
                accept=".png, .jpg, .jpeg, .gif, .svg, .webp"
                className={`form-control ${formik.touched.image && formik.errors.image ? "is-invalid" : ""
                  }`}
                onChange={handleFileChange}
              />
              {formik.touched.image && formik.errors.image && (
                <div className="invalid-feedback">{formik.errors.image}</div>
              )}

              {showCropper && (
                <div className="crop-container">
                  <Cropper
                    image={imageSrc}
                    crop={crop}
                    zoom={zoom}
                    aspect={1750 / 550}
                                        onCropChange={setCrop}
                    onZoomChange={setZoom}
                    onCropComplete={onCropComplete}
                    cropShape="box"
                    showGrid={false}
                  />

                </div>
              )}
              <button
                type="button"
                className="btn btn-primary mt-3"
                onClick={handleCropSave}
              >
                Save Cropped Image
              </button>
            </div>

                            {/* <div className="col-md-6 col-12 mb-3">
                                <label className="form-label">
                                    Active<span className="text-danger">*</span>
                                </label>
                                <select
                                    aria-label="Default select example"
                                    className={`form-select ${formik.touched.active && formik.errors.active ? "is-invalid" : ""}`}
                                    {...formik.getFieldProps("active")}
                                >
                                    <option value="">Select an active</option>
                                    <option value="1">Active</option>
                                    <option value="0">Inactive</option>
                                </select>
                                {formik.touched.active && formik.errors.active && (
                                    <div className="invalid-feedback">{formik.errors.active}</div>
                                )}
                            </div> */}
                            <div className="col-md-6 col-12 mb-3">
                                <label className="form-label">Description</label>
                                <textarea
                                    rows={4}
                                    className={`form-control`}
                                    {...formik.getFieldProps("description")}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-auto">
                    <div className="hstack gap-2 justify-content-end">
                        <button type="submit" className="btn btn-button btn-sm">
                            {loadIndicator && (
                                <span className="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>
                            )}
                            Submit
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default CategoryGroupAdd;
