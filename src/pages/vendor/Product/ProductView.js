import React, { useState } from "react";
import { Link } from "react-router-dom";
import Image from "../../../assets/tv.png";
import { BsHandbag } from "react-icons/bs";

function ProductView() {
  const [selectedItem, setSelectedItem] = useState("Store");

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  return (
    <section className="px-4">
      <div className="card shadow border-0 mb-3">
        <div className="row p-3">
          <div className="d-flex justify-content-between align-items-center">
            <h1 className="h4 ls-tight">View Products</h1>
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
        <div className="row mt-5 p-3">
          <div className="col-md-6 col-12">
            <div className="row mb-3">
              <div className="col-6 d-flex justify-content-start align-items-center">
                <p className="text-sm">
                  <b>Shop Id</b>
                </p>
              </div>
              <div className="col-6">
                <p className="text-muted text-sm">: 1</p>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-12">
            <div className="row mb-3">
              <div className="col-6 d-flex justify-content-start align-items-center">
                <p className="text-sm">
                  <b>category Id</b>
                </p>
              </div>
              <div className="col-6">
                <p className="text-muted text-sm">: 2</p>
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
                <p className="text-muted text-sm">: Apple</p>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-12">
            <div className="row mb-3">
              <div className="col-6 d-flex justify-content-start align-items-center">
                <p className="text-sm">
                  <b>Slug</b>
                </p>
              </div>
              <div className="col-6">
                <p className="text-muted text-sm">: Slug</p>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-12">
            <div className="row mb-3">
              <div className="col-6 d-flex justify-content-start align-items-center">
                <p className="text-sm">
                  <b>Orginal Price</b>
                </p>
              </div>
              <div className="col-6">
                <p className="text-muted text-sm">: 100</p>
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
                <p className="text-muted text-sm">: 10</p>
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
                <p className="text-muted text-sm">: 10/09/2024</p>
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
                <p className="text-muted text-sm">: 11/09/2024</p>
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
                <p className="text-muted text-sm">: 1000</p>
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
                <p className="text-muted text-sm">: --</p>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-12">
            <div className="row mb-3">
              <div className="col-12 d-flex justify-content-start align-items-center">
                <p className="text-sm">
                  <b>Image</b>
                </p>
              </div>
              <div className="col-12 mt-3">
                <p>
                  <img
                    src={Image}
                    alt="image"
                    className="img-fluid"
                    width={150}
                  />
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-12">
            <div className="row mb-3">
              <div className="col-12 d-flex justify-content-start align-items-center">
                <p className="text-sm">
                  <b>Description</b>
                </p>
              </div>
              <div className="col-12 mt-1">
                <p className="text-muted text-sm">Combines style and performance for everyday computing.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-5 p-3">
          <div className="col-3 card shadow"
            style={{ backgroundColor: "#1c2b36" }}>
            <div className="dropdown-item">
              <div className="dropdown-item items" onClick={() => handleItemClick("Store")}>
                <BsHandbag /> Store
              </div>
              <div className="dropdown-divider"></div>
              <div className="dropdown-item items" onClick={() => handleItemClick("Location")}>
                Location
              </div>
              <div className="dropdown-divider"></div>
              <div className="dropdown-item items" onClick={() => handleItemClick("Payment")}>
                Payment
              </div>
              <div className="dropdown-divider"></div>
              <div className="dropdown-item items" onClick={() => handleItemClick("Store Policies")}>
                Store Policies
              </div>
              <div className="dropdown-divider"></div>
              <div className="dropdown-item items" onClick={() => handleItemClick("Store Hours")}>
                Store Hours
              </div>
            </div>
          </div>
          <div className="col-9">
            <div className="text-center">
              {selectedItem === "Store" && <h3>Store</h3>}
              {selectedItem === "Location" && <h3>Location</h3>}
              {selectedItem === "Payment" && <h3>Payment</h3>}
              {selectedItem === "Store Policies" && <h3>Store Policies</h3>}
              {selectedItem === "Store Hours" && <h3>Store Hours</h3>}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default ProductView;