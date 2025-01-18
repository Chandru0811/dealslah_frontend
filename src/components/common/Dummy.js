import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import api from "../../../config/URL";
import toast from "react-hot-toast";
import ImageURL from "../../../config/ImageURL";
import noImage from "../../../assets/noimage.png";
import { FaRegCopy } from "react-icons/fa";
import { LuCopyCheck } from "react-icons/lu";

function ProductsView() {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [loadIndicator, setLoadIndicator] = useState(false);
  const [shopStatus, setShopStatus] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const handleOpenModal = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  // const data = {
  //   id: 1,
  //   shop_id: 1,
  //   deal_type: 1,
  //   category_id: 1,
  //   brand: "OnePlus",
  //   name: "OnePlus 12 12/256",
  //   description:
  //     "Upgrade to the OnePlus 12 with 12GB RAM 256 ROM for high-speed performance and sleek design! Get premium quality and power at an unbeatable value – limited time offer!",
  //   slug: "oneplus_12",
  //   original_price: "829.00",
  //   discounted_price: "770.00",
  //   discount_percentage: "7.10",
  //   start_date: "2024-11-22T00:00:00.000Z",
  //   end_date: "2024-12-22T00:00:00.000Z",
  //   stock: 1,
  //   sku: null,
  //   active: 1,
  //   deleted_at: null,
  //   created_at: "2024-11-22T14:06:26.000Z",
  //   updated_at: "2024-11-22T14:59:40.000Z",
  //   coupon_code: "DEALSLAHV01",
  //   specifications: null,
  //   varient: "Red, Green, Blue",
  //   categoryName: "Mobile Phones",
  //   categoryGroupName: "Electronics",
  //   categoryGroupId: 1,
  //   product_media: [
  //     {
  //       id: 1,
  //       path: "assets/images/products/20/1732009744_1_673c5f10dae30Infinix.webp",
  //       order: 0,
  //       type: "image",
  //       imageable_id: 1,
  //       imageable_type: "App\\Models\\Product",
  //       created_at: null,
  //       updated_at: null,
  //     },
  //     {
  //       id: 2,
  //       path: "https://www.youtube.com/embed/jNQXAC9IVRw?si=-b4sOUB3e5Bx3cze",
  //       order: 1,
  //       type: "video",
  //       imageable_id: 1,
  //       imageable_type: "App\\Models\\Product",
  //       created_at: null,
  //       updated_at: null,
  //     },
  //     {
  //       id: 3,
  //       path: "assets/images/products/20/1732009744_1_673c5f10dae30Infinix.webp",
  //       order: 2,
  //       type: "image",
  //       imageable_id: 1,
  //       imageable_type: "App\\Models\\Product",
  //       created_at: null,
  //       updated_at: null,
  //     },
  //     {
  //       id: 4,
  //       path: "assets/images/products/20/1732009744_1_673c5f10dae30Infinix.webp",
  //       order: 3,
  //       type: "image",
  //       imageable_id: 1,
  //       imageable_type: "App\\Models\\Product",
  //       created_at: null,
  //       updated_at: null,
  //     },
  //     {
  //       id: 5,
  //       path: "https://www.youtube.com/embed/PdVZRoLsYm4",
  //       order: 4,
  //       type: "video",
  //       imageable_id: 1,
  //       imageable_type: "App\\Models\\Product",
  //       created_at: null,
  //       updated_at: null,
  //     },
  //     {
  //       id: 6,
  //       path: "assets/images/products/20/1732009744_1_673c5f10dae30Infinix.webp",
  //       order: 5,
  //       type: "image",
  //       imageable_id: 1,
  //       imageable_type: "App\\Models\\Product",
  //       created_at: null,
  //       updated_at: null,
  //     },
  //     {
  //       id: 7,
  //       path: "https://www.youtube.com/embed/jNQXAC9IVRw?si=-b4sOUB3e5Bx3cze",
  //       order: 1,
  //       type: "video",
  //       imageable_id: 1,
  //       imageable_type: "App\\Models\\Product",
  //       created_at: null,
  //       updated_at: null,
  //     },
  //   ],
  // };

  const handleActivate = async () => {
    setLoadIndicator(true);
    try {
      const response = await api.post(`admin/deal/${id}/approve`);
      if (response.status === 200) {
        // getData();
        toast.success("Product Activated Successfully!");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("An error occurred while activating the product.");
      console.error("Activation Error:", error);
    } finally {
      setLoadIndicator(false);
    }
  };

  const handleDeActive = async () => {
    setLoading(true);
    try {
      const response = await api.post(`admin/deal/${id}/disapprove`);
      if (response.status === 200) {
        // getData();
        toast.success("Product DeActivated Successfully!");
        handleClose();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("An error occurred while activating the product.");
      console.error("DeActivation Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const getData = async () => {
    setLoading(true);
    try {
      const response = await api.get(`admin/product/${id}`);
      const { additional_details, ...rest } = response.data.data;

      const decodedAdditionalDetails = additional_details
        ? JSON.parse(additional_details)
        : [];
      setData({
        ...rest,
        additional_details: decodedAdditionalDetails,
      });
      setShopStatus(response.data.data.active);
    } catch (error) {
      toast.error("Error Fetching Data ", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, [id]);

  const handleCopy = async () => {
    try {
      if (data?.coupon_code) {
        await navigator.clipboard.writeText(data.coupon_code);
        setIsCopied(true); // Set the copied state to true
        setTimeout(() => setIsCopied(false), 2000);
      }
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  return (
    <section className="px-4">
      {loading ? (
        <div className="loader-container">
          <div className="loader">
            <svg viewBox="0 0 80 80">
              <circle cx="40" cy="40" r="32"></circle>
            </svg>
          </div>
        </div>
      ) : (
        <div className="">
          <div className="card shadow border-0 mb-3">
            <div className="row p-3">
              <div className="d-flex justify-content-between align-items-center w-100">
                <div>
                  <h3 className="ls-tight">
                    View Deals{" "}
                    <span>
                      {data?.ownerEmailVerifiedAt !== null && (
                        <i
                          className="fa-duotone fa-solid fa-badge-check"
                          style={{ color: "green" }}
                        ></i>
                      )}
                    </span>
                  </h3>
                </div>
                <div>
                  <Link to="/products">
                    <button type="button" className="btn btn-light btn-sm me-2">
                      <span>Back</span>
                    </button>
                  </Link>
                  {shopStatus === "0" ? (
                    <button
                      type="button"
                      onClick={handleActivate}
                      className="btn btn-success btn-sm me-2"
                      disabled={loadIndicator}
                    >
                      {loadIndicator && (
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          aria-hidden="true"
                        ></span>
                      )}
                      Activate
                    </button>
                  ) : (
                    <button
                      onClick={handleOpenModal}
                      className="btn btn-danger btn-sm me-2"
                    >
                      Deactivate
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div
            className="container card shadow border-0"
            style={{ minHeight: "80vh" }}
          >
            <div className="d-flex justify-content-end align-items-center mt-2">
              <p>
                <span>Coupon Code</span>&nbsp;&nbsp;:
                <span className="text-muted" style={{ fontSize: "24px" }}>
                  {data?.coupon_code}
                </span>
              </p>
              &nbsp;&nbsp;
              <span
                onClick={handleCopy}
                style={{ cursor: "pointer" }}
                title={isCopied ? "Copied!" : "Click to copy"}
              >
                {isCopied ? <LuCopyCheck /> : <FaRegCopy />}
              </span>
            </div>
            <div className="row mt-5 p-3">
              <div className="col-md-6 col-12">
                <div className="row mb-3">
                  <div className="col-6 d-flex justify-content-start align-items-center">
                    <p className="text-sm">Category Group</p>
                  </div>
                  <div className="col-6">
                    <p className="text-muted text-sm">
                      : {data.categoryGroupName}
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="row mb-3">
                  <div className="col-6 d-flex justify-content-start align-items-center">
                    <p className="text-sm">Category</p>
                  </div>
                  <div className="col-6">
                    <p className="text-muted text-sm">: {data.categoryName}</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="row mb-3">
                  <div className="col-6 d-flex justify-content-start align-items-center">
                    <p className="text-sm">Deal Type</p>
                  </div>
                  <div className="col-6">
                    {console.log("Deal Type Value:", data.deal_type)}{" "}
                    <p className="text-muted text-sm">
                      :{" "}
                      {data.deal_type === 1 || data.deal_type === "0"
                        ? "Product"
                        : data.deal_type === 2 || data.deal_type === "1"
                        ? "Service"
                        : data.deal_type === 3 || data.deal_type === "2"
                        ? "Product and Service"
                        : "Unknown"}
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="row mb-3">
                  <div className="col-6 d-flex justify-content-start align-items-center">
                    <p className="text-sm">Brand</p>
                  </div>
                  <div className="col-6">
                    <p className="text-muted text-sm">: {data.brand}</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="row mb-3">
                  <div className="col-6 d-flex justify-content-start align-items-center">
                    <p className="text-sm">Slug</p>
                  </div>
                  <div className="col-6">
                    <p className="text-muted text-sm">: {data.slug}</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="row mb-3">
                  <div className="col-6 d-flex justify-content-start align-items-center">
                    <p className="text-sm">Original Price</p>
                  </div>
                  <div className="col-6">
                    <p className="text-muted text-sm">
                      : {data.original_price}
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="row mb-3">
                  <div className="col-6 d-flex justify-content-start align-items-center">
                    <p className="text-sm">Discounted Percentage</p>
                  </div>
                  <div className="col-6">
                    <p className="text-muted text-sm">
                      : {data.discount_percentage}%
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="row mb-3">
                  <div className="col-6 d-flex justify-content-start align-items-center">
                    <p className="text-sm">Discounted Price</p>
                  </div>
                  <div className="col-6">
                    <p className="text-muted text-sm">
                      : {data.discounted_price}
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="row mb-3">
                  <div className="col-6 d-flex justify-content-start align-items-center">
                    <p className="text-sm">Varient</p>
                  </div>
                  <div className="col-6">
                    <p className="text-muted text-sm">
                      :
                      {data?.varient?.split(",").map((variant, index) => (
                        <div
                          key={index}
                          className="badge badge-success badge-outlined mx-1"
                        >
                          {variant.trim()}
                        </div>
                      ))}
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="row mb-3">
                  <div className="col-6 d-flex justify-content-start align-items-center">
                    <p className="text-sm">Delivery Days</p>
                  </div>
                  <div className="col-6">
                    <p className="text-muted text-sm">
                      : {data?.delivery_days}
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="row mb-3">
                  <div className="col-6 d-flex justify-content-start align-items-center">
                    <p className="text-sm">Start Date</p>
                  </div>
                  <div className="col-6">
                    <p className="text-muted text-sm">
                      : {new Date(data.start_date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="row mb-3">
                  <div className="col-6 d-flex justify-content-start align-items-center">
                    <p className="text-sm">End Date</p>
                  </div>
                  <div className="col-6">
                    <p className="text-muted text-sm">
                      : {new Date(data.end_date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-12">
                <div className="row mb-3">
                  <div className="col-3 d-flex justify-content-start align-items-center">
                    <p className="text-sm">Description</p>
                  </div>
                  <div className="col-9">
                    <p className="text-muted text-sm">: {data.description}</p>
                  </div>
                </div>
              </div>
              <div className="col-12">
                <div className="row mb-3">
                  <div className="col-3 d-flex justify-content-start align-items-center">
                    <p className="text-sm">Specification</p>
                  </div>
                  <div className="col-9">
                    <p className="text-muted text-sm">
                      : {data?.specifications}
                    </p>
                  </div>
                </div>
              </div>
              <div className="row p-3">
                <h4 className="mb-5">Company Information</h4>
                <div className="col-md-6 col-12">
                  <div className="row mb-3">
                    <div className="col-6 d-flex justify-content-start align-items-center">
                      <p className="text-sm">Company Name</p>
                    </div>
                    <div className="col-6">
                      <p className="text-muted text-sm">: {data?.shop?.name}</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-12">
                  <div className="row mb-3">
                    <div className="col-6 d-flex justify-content-start align-items-center">
                      <p className="text-sm">Shop Status</p>
                    </div>
                    <div className="col-6">
                      <p className="text-muted text-sm">
                        :{" "}
                        {data?.shop?.active === 1 ? (
                          <>
                            <span
                              className="dot"
                              style={{
                                backgroundColor: "green",
                                width: "10px",
                                height: "10px",
                                display: "inline-block",
                                borderRadius: "50%",
                                marginRight: "3px",
                              }}
                            ></span>
                            Active
                          </>
                        ) : (
                          <>
                            <span
                              className="dot"
                              style={{
                                backgroundColor: "red",
                                width: "10px",
                                height: "10px",
                                display: "inline-block",
                                borderRadius: "50%",
                                marginRight: "3px",
                              }}
                            ></span>
                            Inactive
                          </>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-12">
                  <div className="row mb-3">
                    <div className="col-6 d-flex justify-content-start align-items-center">
                      <p className="text-sm">Logo</p>
                    </div>
                    <div className="col-12">
                      <p className="text-muted text-sm">
                        <img
                          src={
                            data?.shop?.logo !== null
                              ? `${ImageURL}${data?.shop?.logo}`
                              : noImage
                          }
                          alt={data?.shop?.name}
                          style={{ maxWidth: "100px", maxHeight: "100px" }}
                        />
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mt-5 p-3">
                {data.product_media.map((item, index) => (
                  <div className="col-md-4 col-12 mb-3" key={item.id}>
                    {item.type === "image" ? (
                      <>
                        <p className="text-sm">Thumbnail {index + 1}</p>
                        <img
                          src={`${ImageURL}${
                            item.path.startsWith("/")
                              ? item.path
                              : "/" + item.path
                          }`}
                          alt={`Media ${index + 1}`}
                          style={{
                            maxWidth: "100%",
                            maxHeight: "100%",
                            objectFit: "cover",
                          }}
                        />
                      </>
                    ) : (
                      <>
                        <p className="text-sm">Thumbnail {index + 1}</p>
                        <iframe
                          width="100%"
                          height="90%"
                          src={item.path}
                          title={`YouTube Video ${index + 1}`}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <Modal
        show={showModal}
        backdrop="static"
        keyboard={false}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Deactivate Deal</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to deactivate this Deal?</Modal.Body>
        <Modal.Footer>
          <button className="btn btn-sm btn-button" onClick={handleClose}>
            Close
          </button>
          <button
            className="btn-sm btn-danger"
            type="submit"
            onClick={handleDeActive}
            disabled={loading}
          >
            {loading && (
              <span
                className="spinner-border spinner-border-sm me-2"
                aria-hidden="true"
              ></span>
            )}
            Deactivate
          </button>
        </Modal.Footer>
      </Modal>
    </section>
  );
}

export default ProductsView;
