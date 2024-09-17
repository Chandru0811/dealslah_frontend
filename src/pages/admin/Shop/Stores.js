import React from "react";
import { Link } from "react-router-dom";
import Image from "../../../assets/tv.png";

function Stores() {

    return (


        <div
            className="container card shadow border-0"
            style={{ minHeight: "80vh" }}
        >
            <div className="row mt-5 p-3">
                <div className="col-md-6 col-12">
                    <div className="row mb-3">
                        <div className="col-6 d-flex justify-content-start align-items-center">
                            <p className="text-sm">
                                <b>Shop Name</b>
                            </p>
                        </div>
                        <div className="col-6">
                            <p className="text-muted text-sm">: Ecs</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 col-12">
                    <div className="row mb-3">
                        <div className="col-6 d-flex justify-content-start align-items-center">
                            <p className="text-sm">
                                <b>Shop Legal Name</b>
                            </p>
                        </div>
                        <div className="col-6">
                            <p className="text-muted text-sm">: store</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 col-12">
                    <div className="row mb-3">
                        <div className="col-6 d-flex justify-content-start align-items-center">
                            <p className="text-sm">
                                <b>Shop Email</b>
                            </p>
                        </div>
                        <div className="col-6">
                            <p className="text-muted text-sm">: Abc@gmail.com</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 col-12">
                    <div className="row mb-3">
                        <div className="col-6 d-flex justify-content-start align-items-center">
                            <p className="text-sm">
                                <b>Shop Phone</b>
                            </p>
                        </div>
                        <div className="col-6">
                            <p className="text-muted text-sm">: 9232198745</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 col-12">
                    <div className="row mb-3">
                        <div className="col-6 d-flex justify-content-start align-items-center">
                            <p className="text-sm">
                                <b>Shop Type</b>
                            </p>
                        </div>
                        <div className="col-6">
                            <p className="text-muted text-sm">: stationary</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 col-12">
                    <div className="row mb-3">
                        <div className="col-6 d-flex justify-content-start align-items-center">
                            <p className="text-sm">
                                <b>Shop Banner Type</b>
                            </p>
                        </div>
                        <div className="col-6">
                            <p className="text-muted text-sm">: flex</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 col-12">
                    <div className="row mb-3">
                        <div className="col-6 d-flex justify-content-start align-items-center">
                            <p className="text-sm">
                                <b>Shop Description</b>
                            </p>
                        </div>
                        <div className="col-6">
                            <p className="text-muted text-sm">: test</p>
                        </div>
                    </div>
                </div>

            </div>


        </div>

    );
}

export default Stores;