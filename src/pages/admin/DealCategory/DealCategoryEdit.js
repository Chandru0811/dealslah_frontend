import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../../../config/URL";
import ImageURL from "../../../config/ImageURL";

import toast from "react-hot-toast";

function DealCategoryEdit() {
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
        image_path: Yup.mixed().nullable().required("*Image is required"),
        // active: Yup.string().required("*Select an active status"),
    });

    const formik = useFormik({
        initialValues: {
            name: "",
            image_path: null,
            slug: "",
            // active: "",
            description: "",
        },
        validationSchema: validationSchema,
        onSubmit: async (values, { resetForm }) => {
            setLoadIndicator(true);
            const formData = new FormData();
            formData.append("_method", "PUT");
            formData.append("slug", values.slug);

            formData.append("name", values.name);
            formData.append("image_path", values.image_path);
            // formData.append("active", values.active);
            formData.append("description", values.description);

            try {
                const response = await api.post(`admin/dealCategory/update/${id}`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
                if (response.status === 200) {
                    toast.success(response.data.message);
                    navigate("/dealcategories");
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
                const response = await api.get(`admin/dealCategory/${id}`);
                formik.setValues({
                    name: response.data.data.name || "",
                    order: response.data.data.order || "",
                    // active: response.data.data.active || "",
                    description: response.data.data.description || "",
                    image_path: response.data.data.image_path,
                });
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
          formik.setFieldValue("image_path", file);
    
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
                                    <h1 className="h4 ls-tight headingColor">Edit Deal Category</h1>
                                </div>
                            </div>
                            <div className="col-auto">
                                <div className="hstack gap-2 justify-content-end">
                                    <Link to="/dealcategories">
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

                            {/* <div className="col-md-6 col-12 mb-3">
                                <label className="form-label">
                                    Active<span className="text-danger">*</span>
                                </label>
                                <select
                                    className={`form-select ${formik.touched.active && formik.errors.active ? "is-invalid" : ""}`}
                                    {...formik.getFieldProps("active")}
                                >
                                    <option value=""></option>
                                    <option value="1">Active</option>
                                    <option value="0">Inactive</option>
                                </select>
                                {formik.touched.active && formik.errors.active && (
                                    <div className="invalid-feedback">{formik.errors.active}</div>
                                )}
                            </div> */}

<div className="col-md-6 col-12 mb-3">
              <label className="form-label fw-bold">
                Image<span className="text-danger">*</span>
              </label>

              <input
                type="file"
                name="image_path"
                accept=".png,.jpeg,.jpg,.gif,.svg"
                className="form-control"
                onChange={handleFileChange}
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
                        <button type="submit" className="btn btn-button btn-sm">
                            {loadIndicator && (
                                <span className="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>
                            )}
                            Update
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default DealCategoryEdit;
