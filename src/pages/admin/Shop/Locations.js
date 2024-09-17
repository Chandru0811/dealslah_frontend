import React, { useState } from "react";
import { Link } from "react-router-dom";

function Locations() {
    return (
        <div className="container-fluid ">

            <div className="card shadow border-0 my-2" style={{ minHeight: "80vh" }}>
                <div className="container">
                    <div className="row mt-5 p-3">
                        <div className="col-md-6 col-12">
                            <div className="row mb-3">
                                <div className="col-6 d-flex justify-content-start align-items-center">
                                    <p className="text-sm">
                                        <b>Street</b>
                                    </p>
                                </div>
                                <div className="col-6">
                                    <p className="text-muted text-sm">: Anna Salai</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-12">
                            <div className="row mb-3">
                                <div className="col-6 d-flex justify-content-start align-items-center">
                                    <p className="text-sm">
                                        <b>Street 2</b>
                                    </p>
                                </div>
                                <div className="col-6">
                                    <p className="text-muted text-sm">: porur</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-12">
                            <div className="row mb-3">
                                <div className="col-6 d-flex justify-content-start align-items-center">
                                    <p className="text-sm">
                                        <b>City</b>
                                    </p>
                                </div>
                                <div className="col-6">
                                    <p className="text-muted text-sm">: Chennai</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-12">
                            <div className="row mb-3">
                                <div className="col-6 d-flex justify-content-start align-items-center">
                                    <p className="text-sm">
                                        <b>Zip Code</b>
                                    </p>
                                </div>
                                <div className="col-6">
                                    <p className="text-muted text-sm">: 621711</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="row mb-3">
                                <div className="col-3 d-flex justify-content-start align-items-center">
                                    <p className="text-sm">
                                        <b>State</b>
                                    </p>
                                </div>
                                <div className="col-9">
                                    <p className="text-muted text-sm">: Kerala</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="row mb-3">
                                <div className="col-3 d-flex justify-content-start align-items-center">
                                    <p className="text-sm">
                                        <b>Country</b>
                                    </p>
                                </div>
                                <div className="col-9">
                                    <p className="text-muted text-sm">: India</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Locations;
