import React, { useState } from "react";
import { Link } from "react-router-dom";

function ShopHours() {
    return (
        <div className="container-fluid ">

            <div className="card shadow border-0 my-2" style={{ minHeight: "80vh" }}>
                <div className="container">
                    <div className="row mt-5 p-3">
                        <div className="col-md-6 col-12">
                            <div className="row mb-3">
                                <div className="col-6 d-flex justify-content-start align-items-center">
                                    <p className="text-sm">
                                        <b>Opening</b>
                                    </p>
                                </div>
                                <div className="col-6">
                                    <p className="text-muted text-sm">: 1pm</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-12">
                            <div className="row mb-3">
                                <div className="col-6 d-flex justify-content-start align-items-center">
                                    <p className="text-sm">
                                        <b>Closing</b>
                                    </p>
                                </div>
                                <div className="col-6">
                                    <p className="text-muted text-sm">: 2pm</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default ShopHours;
