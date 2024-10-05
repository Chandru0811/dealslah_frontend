import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../../../config/URL";
import toast from "react-hot-toast";
import { FiAlertTriangle } from "react-icons/fi";
import Cropper from "react-easy-crop";
import '../../../styles/admin.css';

function SliderAdd() {
  const [loadIndicator, setLoadIndicator] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [showCropper, setShowCropper] = useState(false);
  const [originalFileName, setOriginalFileName] = useState('');

  const navigate = useNavigate();

  const validationSchema = Yup.object({
    order: Yup.string().required("*Select an Order"),
    image: Yup.mixed()
      .required("*Image is required")
      .test(
        "fileSize",
        "File size should be less than 2MB",
        (value) => !value || (value && value.size <= 2 * 1024 * 1024)
      ),
  });

  const formik = useFormik({
    initialValues: {
      order: "",
      image: null,
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      const formData = new FormData();
      formData.append("order", values.order);
      formData.append("image", values.image);

      setLoadIndicator(true);

      try {
        const response = await api.post(`admin/slider`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        if (response.status === 200) {
          toast.success(response.data.message);
          navigate("/slider");
          resetForm();
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        if (error.response) {
          if (error.response.status === 422) {
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
            toast.error(
              error.response.data.message || "An unexpected error occurred."
            );
          }
        } else {
          toast.error("An unexpected error occurred.");
        }
      } finally {
        setLoadIndicator(false);
      }
    },
  });

  // Handle canceling the cropper
  const handleCropCancel = () => {
    setShowCropper(false);
    setImageSrc(null);
    formik.setFieldValue("image", ""); // Reset Formik field value for 'image'
    document.querySelector("input[type='file']").value = ""; // Reset the file input field
  };

  const handleFileChange = async (event) => {
    const file = event.currentTarget.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result);
        setShowCropper(true);
        setOriginalFileName(file.name); // Save the original file name
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
      const fileName = originalFileName || "croppedImage.jpg";
      const file = new File([croppedImageBlob], fileName, { type: "image/jpeg" });

      // Set the file in Formik
      formik.setFieldValue("image", file);

      // Close the cropper
      setShowCropper(false);
    } catch (error) {
      console.error("Error cropping the image:", error);
    }
  };

  return (
    <section className="px-4">
      <form onSubmit={formik.handleSubmit}>
        <div className="card card-shadow">
          <div className="row p-3">
            <div className="d-flex justify-content-between align-items-center">
              <h1 className="h4 ls-tight">Add Slider</h1>
              <Link to="/slider">
                <button type="button" className="btn btn-light btn-sm">
                  <span>Back</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="container card card-shadow form-container">
          <div className="row mt-3">
            <div className="col-md-6 col-12 file-input">
              <label className="form-label">
                Image<span className="text-danger">*</span>
              </label>
              <input
                type="file"
                accept=".png, .jpg, .jpeg, .svg, .webp"
                className={`form-control ${formik.touched.image && formik.errors.image ? "is-invalid" : ""
                  }`}
                onChange={handleFileChange}
              />
              <p style={{ fontSize: "13px" }}>
                Note: Maximum file size is 2MB. Allowed: .png, .jpg, .jpeg, .svg, .webp.
              </p>
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
              {showCropper && (
                <div className="d-flex justify-content-start mt-3 gap-2">
                  <button
                    type="button"
                    className="btn btn-primary mt-3"
                    onClick={handleCropSave}
                  >
                    Save Cropped Image
                  </button>

                  <button
                    type="button"
                    className="btn btn-secondary mt-3"
                    onClick={handleCropCancel}
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>

            <div className="col-md-6 col-12 file-input">
              <label className="form-label">
                Order<span className="text-danger">*</span>
              </label>
              <select
                aria-label="Default select example"
                className={`form-select ${formik.touched.order && formik.errors.order ? "is-invalid" : ""}`}
                {...formik.getFieldProps("order")}
              >
                <option value="">Select an order</option>
                {Array.from({ length: 8 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
              {formik.touched.order && formik.errors.order && (
                <div className="invalid-feedback">{formik.errors.order}</div>
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
    </section>
  );
}

export default SliderAdd;
