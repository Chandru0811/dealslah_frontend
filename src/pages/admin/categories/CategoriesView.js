import React, { useState } from "react";
import { Link } from "react-router-dom";

function CategoriesView() {
  return (
    <section className="px-4">
      <div
        className="container card shadow border-0"
        style={{ minHeight: "90vh" }}
      >
        <div className="row p-2">
          <div className="d-flex justify-content-between align-items-center">
            <h1 className="">View Category</h1>
            <div>
              <Link to="/categories">
                <button type="button" className="btn btn-light btn-sm">
                  <span>Back</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="row mt-5 p-3">
          <div className="col-md-6 col-12">
            <div className="row mb-3">
              <div className="col-6 d-flex justify-content-start align-items-center">
                <p className="text-sm">
                  <b>Category Group Id</b>
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
                  <b>Name</b>
                </p>
              </div>
              <div className="col-6">
                <p className="text-muted text-sm">: Vivo</p>
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
                <p className="text-muted text-sm">: vivo</p>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-12">
            <div className="row mb-3">
              <div className="col-6 d-flex justify-content-start align-items-center">
                <p className="text-sm">
                  <b>Active</b>
                </p>
              </div>
              <div className="col-6">
                <p className="text-muted text-sm">: In active</p>
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
                <p className="text-muted text-sm">: Test</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CategoriesView;
