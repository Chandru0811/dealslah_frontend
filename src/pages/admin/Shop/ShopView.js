import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BsHandbag } from "react-icons/bs";
import { CiGlobe } from "react-icons/ci";
import { GrCurrency } from "react-icons/gr";
import { PiVanFill } from "react-icons/pi";
import { MdAccessTime } from "react-icons/md";
import Stores from "./Stores";
import Locations from "./Locations";
import Payments from "./Payments";
import ShopPolicies from "./ShopPolicies";
import ShopHours from "./ShopHours";
import api from "../../../config/URL";
import toast from "react-hot-toast";
import CancelPopup from "./CancelPopup";

function ShopView() {
    const { id } = useParams();
    const [selectedItem, setSelectedItem] = useState("Shop");
    // const shop_id = sessionStorage.getItem("shop_id");
    const shop_id = 1;

    const [showModal, setShowModal] = useState(false);
    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const handleItemClick = (item) => {
        setSelectedItem(item);
    };

    const handleActivate = async () => {
        try {
            const response = await api.post(`admin/shop/${id}/activate`);

            if (response.status === 200) {
                toast.success('Shop activated successfully!');
            } else {
                toast.error('Failed to activate shop.');
            }
        } catch (error) {
            toast.error('An error occurred while activating the shop.');
            console.error('Activation Error:', error);
        }
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
                            {shop_id == 0 ? (
                                <button
                                    onClick={handleActivate}
                                    className="btn btn-success btn-sm me-2"
                                >
                                    Active
                                </button>
                            ) : <></>}

                            {shop_id === 1 ? (
                                <button
                                    onClick={handleOpenModal}
                                    className="btn btn-danger btn-sm me-2"
                                >
                                    Deactivate
                                </button>
                            ) : <></>}

                            <CancelPopup show={showModal} handleClose={handleCloseModal} id={id} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="container card shadow border-0" style={{ minHeight: "80vh" }}>
                <div className="row mt-5">
                    <div className="col-md-3 col-12 card shadow h-50" style={{ backgroundColor: "#1c2b36" }}>
                        <div className="dropdown-menu p-3"
                            style={{ zIndex: "1" }}>
                            <div
                                className={`dropdown-item ${selectedItem === "Shop" ? "active" : ""
                                    }`}
                                onClick={() => handleItemClick("Shop")}
                            >
                                <BsHandbag /> Shop
                            </div>
                            <div className="dropdown-divider"></div>
                            <div
                                className={`dropdown-item ${selectedItem === "Location" ? "active" : ""
                                    }`}
                                onClick={() => handleItemClick("Location")}
                            >
                                <CiGlobe /> Location
                            </div>
                            <div className="dropdown-divider"></div>
                            <div
                                className={`dropdown-item ${selectedItem === "Payment" ? "active" : ""
                                    }`}
                                onClick={() => handleItemClick("Payment")}
                            >
                                <GrCurrency /> Payment
                            </div>
                            <div className="dropdown-divider"></div>
                            <div
                                className={`dropdown-item ${selectedItem === "Shop Policies" ? "active" : ""
                                    }`}
                                onClick={() => handleItemClick("Shop Policies")}
                            >
                                <PiVanFill /> Shop Policies
                            </div>
                            <div className="dropdown-divider"></div>
                            <div
                                className={`dropdown-item ${selectedItem === "Shop Hours" ? "active" : ""
                                    }`}
                                onClick={() => handleItemClick("Shop Hours")}
                            >
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
