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
                <div className="col-3">
                    <div class="dropdown-menu">
                        <a class="dropdown-item" href="#">Action</a>
                        <a class="dropdown-item" href="#">Another action</a>
                        <a class="dropdown-item" href="#">Something else here</a>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item" href="#">Separated link</a>
                    </div>
                </div>
                <div className="col-9"></div>
            </div>
        </div>

    );
}

export default Stores;