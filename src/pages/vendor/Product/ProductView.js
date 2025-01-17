import React, { useState } from "react";
import { Link } from "react-router-dom";
import ImageURL from "../../../config/ImageURL";
import { FaRegCopy } from "react-icons/fa";
import { LuCopyCheck } from "react-icons/lu";

function ProductView() {
  const [isCopied, setIsCopied] = useState(false);

  const data = {
    id: 1,
    shop_id: 1,
    deal_type: 1,
    category_id: 1,
    brand: "OnePlus",
    name: "OnePlus 12 12/256",
    description:
      "Upgrade to the OnePlus 12 with 12GB RAM 256 ROM for high-speed performance and sleek design! Get premium quality and power at an unbeatable value – limited time offer!",
    slug: "oneplus_12",
    original_price: "829.00",
    discounted_price: "770.00",
    discount_percentage: "7.10",
    start_date: "2024-11-22T00:00:00.000Z",
    end_date: "2024-12-22T00:00:00.000Z",
    stock: 1,
    sku: null,
    active: 1,
    deleted_at: null,
    created_at: "2024-11-22T14:06:26.000Z",
    updated_at: "2024-11-22T14:59:40.000Z",
    coupon_code: "DEALSLAHV01",
    specifications: null,
    varient: "Red, Green, Blue",
    categoryName: "Mobile Phones",
    categoryGroupName: "Electronics",
    categoryGroupId: 1,
    product_media: [
      {
        id: 1,
        path: "assets/images/products/20/1732009744_1_673c5f10dae30Infinix.webp",
        order: 0,
        type: "image",
        imageable_id: 1,
        imageable_type: "App\\Models\\Product",
        created_at: null,
        updated_at: null,
      },
      {
        id: 2,
        path: "https://www.youtube.com/embed/jNQXAC9IVRw?si=-b4sOUB3e5Bx3cze",
        order: 1,
        type: "video",
        imageable_id: 1,
        imageable_type: "App\\Models\\Product",
        created_at: null,
        updated_at: null,
      },
      {
        id: 3,
        path: "assets/images/products/20/1732009744_1_673c5f10dae30Infinix.webp",
        order: 2,
        type: "image",
        imageable_id: 1,
        imageable_type: "App\\Models\\Product",
        created_at: null,
        updated_at: null,
      },
      {
        id: 4,
        path: "assets/images/products/20/1732009744_1_673c5f10dae30Infinix.webp",
        order: 3,
        type: "image",
        imageable_id: 1,
        imageable_type: "App\\Models\\Product",
        created_at: null,
        updated_at: null,
      },
      {
        id: 5,
        path: "https://www.youtube.com/embed/PdVZRoLsYm4",
        order: 4,
        type: "video",
        imageable_id: 1,
        imageable_type: "App\\Models\\Product",
        created_at: null,
        updated_at: null,
      },
      {
        id: 6,
        path: "assets/images/products/20/1732009744_1_673c5f10dae30Infinix.webp",
        order: 5,
        type: "image",
        imageable_id: 1,
        imageable_type: "App\\Models\\Product",
        created_at: null,
        updated_at: null,
      },
      {
        id: 7,
        path: "https://www.youtube.com/embed/jNQXAC9IVRw?si=-b4sOUB3e5Bx3cze",
        order: 1,
        type: "video",
        imageable_id: 1,
        imageable_type: "App\\Models\\Product",
        created_at: null,
        updated_at: null,
      },
    ],
  };

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
                    <p className="text-muted text-sm">: {data?.categoryName}</p>
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
                    <p className="text-sm">Varient</p>
                  </div>
                  <div className="col-6">
                    <p className="text-muted text-sm">
                      :{" "}
                      {data?.varient.split(",").map((variant, index) => (
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
              <div className="col-12">
                <div className="row mb-3">
                  <div className="col-3 d-flex justify-content-start align-items-center">
                    <p className="text-sm">Description</p>
                  </div>
                  <div className="col-9">
                    <p className="text-muted text-sm">: {data?.description}</p>
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
          </>
        </div>
      </>
    </section>
  );
}

export default ProductView;
