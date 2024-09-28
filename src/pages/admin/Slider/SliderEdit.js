import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import api from "../../../config/URL";
import ImageURL from "../../../config/ImageURL";
import Cropper from "react-easy-crop";
import '../../../styles/admin.css';

function SliderEdit() {
  const [loadIndicator, setLoadIndicator] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [showCropper, setShowCropper] = useState(false);
  const [croppedImagePreview, setCroppedImagePreview] = useState(null); // Preview cropped image
  const [loading, setLoading] = useState(true);

  const validationSchema = Yup.object({
    order: Yup.string().required("*Select an Order"),
    image_path: Yup.string().required("*Image is required"),
  });

  const formik = useFormik({
    initialValues: {
      order: "",
      image_path: null,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("_method", "PUT");
      formData.append("order", values.order);
      formData.append("image_path", values.image_path);

      setLoadIndicator(true);
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
      setLoadIndicator(false);
    },
  });

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const response = await api.get(`admin/slider/${id}`);
        formik.setValues(response.data.data);
      } catch (error) {
        toast.error("Error Fetching Data", error.message);
      }
      setLoading(false);
    };
    getData();
  }, [id]);

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
        <div className="container card shadow border-0" style={{ minHeight: "80vh" }}>
          {loading ? (
            <div className="loader-container">
              <div className="loader">
                <svg viewBox="0 0 80 80">
                  <circle cx="40" cy="40" r="32"></circle>
                </svg>
              </div>
            </div>
          ) : (
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
                  onChange={handleFileChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.image_path && formik.errors.image_path && (
                  <div className="error text-danger">
                    <small>{formik.errors.image_path}</small>
                  </div>
                )}
                {formik.values.image_path && (
                  <div className="my-3">
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
          )}
        </div>
        <div className="hstack gap-2 justify-content-end p-2">
          <button type="submit" className="btn btn-sm btn-button" disabled={loadIndicator}>
            {loadIndicator && <span className="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>}
            Update
          </button>
        </div>
      </form>
    </section>
  );
}

export default SliderEdit;