import React, { useState } from "react";
import { Link } from "react-router-dom";

function Payments() {
    return (
        <div className="container-fluid ">

            <div className="card shadow border-0 my-2" style={{ minHeight: "80vh" }}>
                <div className="container">
                    <div className="row mt-5 p-3">
                        <div className="col-md-6 col-12">
                            <div className="row mb-3">
                                <div className="col-6 d-flex justify-content-start align-items-center">
                                    <p className="text-sm">
                                        <b>PayPal Email</b>
                                    </p>
                                </div>
                                <div className="col-6">
                                    <p className="text-muted text-sm">: Abcd@gmail.com</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-12">
                            <div className="row mb-3">
                                <div className="col-6 d-flex justify-content-start align-items-center">
                                    <p className="text-sm">
                                        <b>Account Holder</b>
                                    </p>
                                </div>
                                <div className="col-6">
                                    <p className="text-muted text-sm">: Major</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-12">
                            <div className="row mb-3">
                                <div className="col-6 d-flex justify-content-start align-items-center">
                                    <p className="text-sm">
                                        <b>Account Type</b>
                                    </p>
                                </div>
                                <div className="col-6">
                                    <p className="text-muted text-sm">: Bussiness</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-12">
                            <div className="row mb-3">
                                <div className="col-6 d-flex justify-content-start align-items-center">
                                    <p className="text-sm">
                                        <b>Account Number</b>
                                    </p>
                                </div>
                                <div className="col-6">
                                    <p className="text-muted text-sm">: 3612345678</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="row mb-3">
                                <div className="col-3 d-flex justify-content-start align-items-center">
                                    <p className="text-sm">
                                        <b>Bank Name</b>
                                    </p>
                                </div>
                                <div className="col-9">
                                    <p className="text-muted text-sm">: SBI</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="row mb-3">
                                <div className="col-3 d-flex justify-content-start align-items-center">
                                    <p className="text-sm">
                                        <b>Bank Address</b>
                                    </p>
                                </div>
                                <div className="col-9">
                                    <p className="text-muted text-sm">: Chennai</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="row mb-3">
                                <div className="col-3 d-flex justify-content-start align-items-center">
                                    <p className="text-sm">
                                        <b>Bank Code</b>
                                    </p>
                                </div>
                                <div className="col-9">
                                    <p className="text-muted text-sm">: 652411</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Payments;
