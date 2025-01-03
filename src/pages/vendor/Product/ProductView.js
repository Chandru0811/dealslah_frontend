import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
// import Image from "../../../assets/tv.png"; // Ensure you have a fallback if the image is not available
import toast from "react-hot-toast";
import api from "../../../config/URL";
import ImageURL from "../../../config/ImageURL";
import { FaRegCopy } from "react-icons/fa";
import { LuCopyCheck } from "react-icons/lu";

function ProductView() {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const response = await api.get(`vendor/product/${id}/get`);
        const { additional_details, ...rest } = response.data.data;

        const decodedAdditionalDetails = additional_details
          ? JSON.parse(additional_details)
          : [];

        setData({
          ...rest,
          additional_details: decodedAdditionalDetails,
        });
      } catch (error) {
        toast.error("Error Fetching Data");
      }
      setLoading(false);
    };

    getData();
  }, [id]);

  const [isCopied, setIsCopied] = useState(false);

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
      <>
        <div className="card shadow border-0 mb-3">
          <div className="row p-3">
            <div className="d-flex justify-content-between align-items-center">
              <h1 className="h4 ls-tight">View Deals</h1>
              <div>
                <Link to="/product">
                  <button type="button" className="btn btn-light btn-sm">
                    <span>Back</span>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div
          className="container card shadow border-0"
          style={{ minHeight: "80vh" }}
        >
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
                {/* <div className="col-md-6 col-12">
      <div className="row mb-3">
        <div className="col-6 d-flex justify-content-start align-items-center">
          <p className="text-sm">Category Group</b>
        </div>
        <div className="col-6">
          <p className="text-muted text-sm">: {data.category_group}</p>
        </div>
      </div>
    </div> */}
                <div className="col-md-6 col-12">
                  <div className="row mb-3">
                    <div className="col-6 d-flex justify-content-start align-items-center">
                      <p className="text-sm">Category Group</p>
                    </div>
                    <div className="col-6">
                      <p className="text-muted text-sm">
                        : {data?.categoryGroupName}
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
                      <p className="text-muted text-sm">
                        : {data?.categoryName}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-12">
                  <div className="row mb-3">
                    <div className="col-6 d-flex justify-content-start align-items-center">
                      <p className="text-sm">Deal Type</p>
                    </div>
                    <div className="col-6">
                      {console.log("Deal Type Value:", data?.deal_type)}{" "}
                      {/* Debugging */}
                      <p className="text-muted text-sm">
                        :{" "}
                        {data?.deal_type === 1 || data?.deal_type === "1"
                          ? "Product"
                          : data?.deal_type === 2 || data?.deal_type === "2"
                          ? "Service"
                          : data?.deal_type === 3 || data?.deal_type === "3"
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
                      <p className="text-muted text-sm">: {data?.brand}</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-12">
                  <div className="row mb-3">
                    <div className="col-6 d-flex justify-content-start align-items-center">
                      <p className="text-sm">Name</p>
                    </div>
                    <div className="col-6">
                      <p className="text-muted text-sm">: {data?.name}</p>
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
                        : {data?.original_price}
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
                        : {data?.discounted_price}
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
                        : {data?.discount_percentage}
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
                        :{" "}
                        {data?.start_date
                          ? new Date(data?.start_date).toLocaleDateString()
                          : ""}
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
                        :{" "}
                        {data?.end_date
                          ? new Date(data?.end_date).toLocaleDateString()
                          : ""}
                      </p>
                    </div>
                  </div>
                </div>
                {/* <div className="col-md-6 col-12">
                <div className="row mb-3">
                  <div className="col-6 d-flex justify-content-start align-items-center">
                    <p className="text-sm">
                      Stock
                    </p>
                  </div>
                  <div className="col-6">
                    <p className="text-muted text-sm">: {data?.stock}</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="row mb-3">
                  <div className="col-6 d-flex justify-content-start align-items-center">
                    <p className="text-sm">
                      SKU
                    </p>
                  </div>
                  <div className="col-6">
                    <p className="text-muted text-sm">: {data?.sku}</p>
                  </div>
                </div>
              </div> */}
                {/* <div className="col-md-6 col-12">
                <div className="row mb-3">
                  <div className="col-6 d-flex justify-content-start align-items-center">
                    <p className="text-sm">
                      Coupon Code
                    </p>
                  </div>
                  <div className="col-6">
                    <p className="text-muted text-sm">: {data?.coupon_code}</p>
                  </div>
                </div>
              </div> */}
                {data?.additional_details &&
                data.additional_details.length > 0 ? (
                  data.additional_details.map((item, index) => (
                    <div className="row" key={index}>
                      <div className="col-md-6 col-12">
                        <div className="row mb-3">
                          <div className="col-6 d-flex justify-content-start align-items-center">
                            <p className="text-sm">YouTube URL {index + 1}</p>
                          </div>
                          <div className="col-6">
                            <p
                              style={{ whiteSpace: "nowrap", overflow: "auto" }}
                              className="text-muted text-sm"
                            >
                              : {item?.video_url || ""}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="ps-5 col-md-6 col-12">
                        <div className="row mb-3">
                          <div className="col-6 d-flex justify-content-start align-items-center">
                            <p className="text-sm">Orders {index + 1}</p>
                          </div>
                          <div className="col-6">
                            <p className="text-muted text-sm">
                              : {item?.order || ""}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No additional details available.</p>
                )}
                <div className="col-12">
                  <div className="row mb-3">
                    <div className="col-3 d-flex justify-content-start align-items-center">
                      <p className="text-sm">Description</p>
                    </div>
                    <div className="col-9">
                      <p className="text-muted text-sm">
                        : {data?.description}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-12">
                  <div className="row mb-3">
                    <div className="col-6 d-flex justify-content-start align-items-center">
                      <p className="text-sm">Image1</p>
                    </div>
                    <div className="col-6">
                      <p className="text-muted text-sm">
                        {" "}
                        :
                        <img
                          src={`${ImageURL}${data?.image_url1}`}
                          alt="product"
                          className="img-fluid"
                          // width={150}
                        />
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-12">
                  <div className="row mb-3">
                    <div className="col-6 d-flex justify-content-start align-items-center">
                      <p className="text-sm">Image2</p>
                    </div>
                    <div className="col-6">
                      <p className="text-muted text-sm">
                        {" "}
                        :
                        <img
                          src={`${ImageURL}${data?.image_url2}`}
                          alt="product"
                          className="img-fluid"
                          // width={150}
                        />
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-12">
                  <div className="row mb-3">
                    <div className="col-6 d-flex justify-content-start align-items-center">
                      <p className="text-sm">Image3</p>
                    </div>
                    <div className="col-6">
                      <p className="text-muted text-sm">
                        {" "}
                        :
                        <img
                          src={`${ImageURL}${data?.image_url3}`}
                          alt="product"
                          className="img-fluid"
                          // width={150}
                        />
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-12">
                  <div className="row mb-3">
                    <div className="col-6 d-flex justify-content-start align-items-center">
                      <p className="text-sm">Image4</p>
                    </div>
                    <div className="col-6">
                      <p className="text-muted text-sm">
                        {" "}
                        :
                        <img
                          src={`${ImageURL}${data?.image_url4}`}
                          alt="product"
                          className="img-fluid"
                          // width={150}
                        />
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </>
    </section>
  );
}

export default ProductView;
