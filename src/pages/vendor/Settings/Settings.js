import React, { useState } from "react";
import { Link } from "react-router-dom";
import Image from "../../../assets/tv.png";
import { BsHandbag } from "react-icons/bs";
import { CiGlobe } from "react-icons/ci";
import { GrCurrency } from "react-icons/gr";
import { PiVanFill } from "react-icons/pi";
import { MdAccessTime } from "react-icons/md";
import Store from "./Store";
import Location from "./Location";
import StorePolicy from "./StorePolicy";
import StoreHours from "./StoreHours";
import Payment from "./Payment";

function Settings() {
    const [selectedItem, setSelectedItem] = useState("Store");

    const handleItemClick = (item) => {
        setSelectedItem(item);
    };

    return (
        <section className="px-4">
            <div className="container card shadow border-0" style={{ minHeight: "90vh" }}>
                <div className="card-header d-flex align-items-center">
                    <h3 className="mb-0">Settings</h3>
                </div>
                <div className="row mt-5">
                    <div className="col-md-3 col-12 card shadow h-50"
                        style={{ backgroundColor: "#1c2b36" }}>
                        <div className="dropdown-item">
                            <div className="dropdown-item items" onClick={() => handleItemClick("Store")}>
                                <BsHandbag /> Store
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
                            <div className="dropdown-item items" onClick={() => handleItemClick("Store Policies")}>
                                <PiVanFill /> Store Policies
                            </div>
                            <div className="dropdown-divider"></div>
                            <div className="dropdown-item items" onClick={() => handleItemClick("Store Hours")}>
                                <MdAccessTime /> Store Hours
                            </div>
                        </div>
                    </div>
                    <div className="col-md-9 col-12 ">
                        <div className="">
                            {selectedItem === "Store" && <Store />}
                            {selectedItem === "Location" && <Location />}
                            {selectedItem === "Payment" && <Payment />}
                            {selectedItem === "Store Policies" && <StorePolicy />}
                            {selectedItem === "Store Hours" && <StoreHours />}
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}

export default Settings;