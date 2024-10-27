import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../../../config/URL";
import ImageURL from "../../../config/ImageURL";
import printIcon from "../../../assets/printIcon.png";
import jsPDF from "jspdf";

function ProductPrint() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const response = await api.get(`vendor/product/${id}/get`);
        setData(response.data.data);
      } catch (error) {
        toast.error("Error Fetching Data");
      }
      setLoading(false);
    };

    getData();
  }, [id]);

  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    // Title
    doc.setFontSize(16);
    doc.text("Product Details", 10, 10);
    doc.setFontSize(12);

    // Define common positions
    const startX = 10; // Start X position for labels
    const valueX = 60; // X position for values
    let startY = 20; // Initial Y position
    const lineSpacing = 10; // Spacing between lines

    // Create a function to add each field with alignment
    const addField = (label, value) => {
      doc.text(label, startX, startY);
      doc.text(String(value) || "N/A", valueX, startY);
      startY += lineSpacing;
    };

    // Add fields
    addField("Name:", data?.name || "");
    addField("Coupon Code:", data?.coupon_code || "");
    addField("Original Price:", data?.original_price || "");
    addField("Category Group:", data?.categoryGroupName || "");
    addField("Category:", data?.categoryName || "");
    addField(
      "Deal Type:",
      data?.deal_type === 1
        ? "Product"
        : data?.deal_type === 2
        ? "Service"
        : data?.deal_type === 3
        ? "Product and Service"
        : "Unknown"
    );
    addField("Brand:", data?.brand || "");
    addField("Discounted Price:", data?.discounted_price || "");
    addField("Discount Percentage:", data?.discount_percentage || "");
    addField(
      "Start Date:",
      data?.start_date ? new Date(data.start_date).toLocaleDateString() : ""
    );
    addField(
      "End Date:",
      data?.end_date ? new Date(data.end_date).toLocaleDateString() : ""
    );
    addField("Stock:", data?.stock || "");
    addField("SKU:", data?.sku || "");
    addField("Description:", data?.description || "");

    // Save the PDF
    doc.save("Product_Details.pdf");
  };

  return (
    <section className="px-5">
      <>
        <div
          className="container card shadow border-0"
          style={{ minHeight: "80vh", borderRadius: "20px" }}
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
            <div className="row mt-5 p-3">
              <div className="row">
                <div className="col-md-9 col-12">
                  <div className="row py-2">
                    <div className="col-6">
                      <h2 className="text-muted">Name</h2>
                    </div>
                    <div className="col-6">
                      <h2 className="text-muted">: {data?.name}</h2>
                    </div>
                  </div>
                  <div className="row py-2">
                    <div className="col-6">
                      <h2 className="text-muted">Coupon Code</h2>
                    </div>
                    <div className="col-6">
                      <h2 className="text-muted">: {data?.coupon_code}</h2>
                    </div>
                  </div>
                  <div className="row py-2 pb-4">
                    <div className="col-6">
                      <h2 className="text-muted">Original Price</h2>
                    </div>
                    <div className="col-6">
                      <h2 className="text-muted">: {data?.original_price}</h2>
                    </div>
                  </div>
                </div>
                <div className="col-md-3 col-12">
                  <div
                    onClick={handleDownloadPDF}
                    className="d-flex justify-content-end align-items-center pb-3"
                  >
                    <div>
                      <img
                        src={printIcon}
                        alt="printIcon"
                        className="img-fluid"
                        style={{
                          height: "40px",
                          width: "60px",
                          cursor: "pointer",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-6 col-12">
                <div className="row mb-3">
                  <div className="col-6 d-flex justify-content-start align-items-center">
                    <p className="text-sm">
                      <b>Category Group</b>
                    </p>
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
                    <p className="text-sm">
                      <b>Category</b>
                    </p>
                  </div>
                  <div className="col-6">
                    <p className="text-muted text-sm">: {data?.categoryName}</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="row mb-3">
                  <div className="col-6 d-flex justify-content-start align-items-center">
                    <p className="text-sm">
                      <b>Deal Type</b>
                    </p>
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
                    <p className="text-sm">
                      <b>Brand</b>
                    </p>
                  </div>
                  <div className="col-6">
                    <p className="text-muted text-sm">: {data?.brand}</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="row mb-3">
                  <div className="col-6 d-flex justify-content-start align-items-center">
                    <p className="text-sm">
                      <b>Discounted Price</b>
                    </p>
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
                    <p className="text-sm">
                      <b>Discounted Percentage</b>
                    </p>
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
                    <p className="text-sm">
                      <b>Start Date</b>
                    </p>
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
                    <p className="text-sm">
                      <b>End Date</b>
                    </p>
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
              <div className="col-md-6 col-12">
                <div className="row mb-3">
                  <div className="col-6 d-flex justify-content-start align-items-center">
                    <p className="text-sm">
                      <b>Stock</b>
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
                      <b>SKU</b>
                    </p>
                  </div>
                  <div className="col-6">
                    <p className="text-muted text-sm">: {data?.sku}</p>
                  </div>
                </div>
              </div>

              <div className="col-12">
                <div className="row mb-3">
                  <div className="col-3 d-flex justify-content-start align-items-center">
                    <p className="text-sm">
                      <b>Description</b>
                    </p>
                  </div>
                  <div className="col-9">
                    <p className="text-muted text-sm">: {data?.description}</p>
                  </div>
                </div>
              </div>
              <div className="col-12">
                <div className="row">
                  <div className="col-md-3 col-12">
                    <p className="text-sm">
                      <b>Image1</b>
                    </p>
                    <img
                      src={`${ImageURL}${data?.image_url1}`}
                      alt="product"
                      className="img-fluid"
                      // width={150}
                    />
                  </div>
                  <div className="col-md-3 col-12">
                    <p className="text-sm">
                      <b>Image2</b>
                    </p>
                    <img
                      src={`${ImageURL}${data?.image_url2}`}
                      alt="product"
                      className="img-fluid"
                      // width={150}
                    />
                  </div>
                  <div className="col-md-3 col-12">
                    <p className="text-sm">
                      <b>Image3</b>
                    </p>
                    <img
                      src={`${ImageURL}${data?.image_url3}`}
                      alt="product"
                      className="img-fluid"
                      // width={150}
                    />
                  </div>
                  <div className="col-md-3 col-12">
                    <p className="text-sm">
                      <b>Image4</b>
                    </p>
                    <img
                      src={`${ImageURL}${data?.image_url4}`}
                      alt="product"
                      className="img-fluid"
                      // width={150}
                    />
                  </div>
                </div>
              </div>

              <div className="d-flex justify-content-end align-items-center p-3">
                <Link to="/product">
                  <button className="btn btn-sm btn-danger">Done</button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </>
    </section>
  );
}

export default ProductPrint;
