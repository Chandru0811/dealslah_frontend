import React, { useState } from "react";
import { Link } from "react-router-dom";
import Image from "../../../assets/tv.png";
import { BsHandbag } from "react-icons/bs";
import { CiGlobe } from "react-icons/ci";
import { GrCurrency } from "react-icons/gr";
import { PiVanFill } from "react-icons/pi";
import { MdAccessTime } from "react-icons/md";
import Store from "../../vendor/Settings/Store";
import Location from "../../vendor/Settings/Location";
import StorePolicy from "../../vendor/Settings/StorePolicy";
import StoreHours from "../../vendor/Settings/StoreHours";
import Payment from "../../vendor/Settings/Payment";
import Stores from "./Stores";
import Locations from "./Locations";
import Payments from "./Payments";
import ShopPolicies from "./ShopPolicies";
import ShopHours from "./ShopHours";

function ShopView() {
    const [selectedItem, setSelectedItem] = useState("Shop"); // Default to "Shop" to show Stores by default

    const handleItemClick = (item) => {
        setSelectedItem(item);
    };

    return (
        <section className="px-4">
            <div className="card shadow border-0 mb-3">
                <div className="row p-3">
                    <div className="d-flex justify-content-between align-items-center w-100">
                        <div>
                            {selectedItem === "Shop" && <h3>General Settings</h3>}
                            {selectedItem === "Location" && <h3>Shop Address</h3>}
                            {selectedItem === "Payment" && <h3>Payment Settings</h3>}
                            {selectedItem === "Shop Policies" && <h3>Policies Settings</h3>}
                            {selectedItem === "Shop Hours" && <h3>Hours Settings</h3>}
                        </div>
                        <div>
                            <Link to="/shop">
                                <button type="button" className="btn btn-light btn-sm me-2">
                                    <span>Back</span>
                                </button>
                            </Link>
                            <button className="btn btn-success btn-sm me-2">Active</button>
                            <button className="btn btn-danger btn-sm">Inactive</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container card shadow border-0" style={{ minHeight: "80vh" }}>
                <div className="row mt-5">
                    <div className="col-md-3 col-12 card shadow h-50" style={{ backgroundColor: "#1c2b36" }}>
                        <div className="dropdown-item">
                            <div className="dropdown-item items" onClick={() => handleItemClick("Shop")}>
                                <BsHandbag /> Shop
                            </div>
                            <div className="dropdown-divider"></div>
                            <div className="dropdown-item items" onClick={() => handleItemClick("Location")}>
                                <CiGlobe /> Location
                            </div>
                            <div className="dropdown-divider"></div>
                            <div className="dropdown-item items" onClick={() => handleItemClick("Payment")}>
                                <GrCurrency /> Payment
                            </div>
                            <div className="dropdown-divider"></div>
                            <div className="dropdown-item items" onClick={() => handleItemClick("Shop Policies")}>
                                <PiVanFill /> Shop Policies
                            </div>
                            <div className="dropdown-divider"></div>
                            <div className="dropdown-item items" onClick={() => handleItemClick("Shop Hours")}>
                                <MdAccessTime /> Shop Hours
                            </div>
                        </div>
                    </div>
                    <div className="col-md-9 col-12">
                        <div>
                            {selectedItem === "Shop" && <Stores />}
                            {selectedItem === "Location" && <Locations />}
                            {selectedItem === "Payment" && <Payments />}
                            {selectedItem === "Shop Policies" && <ShopPolicies />}
                            {selectedItem === "Shop Hours" && <ShopHours />}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ShopView;
