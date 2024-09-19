import React, { useEffect, useState } from "react";
import api from "../../../config/URL";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

function Stores() {
  const [data, setData] = useState(null);
  // const id = sessionStorage.getItem("id");
  const { id } = useParams();

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.get(`admin/shop/${id}/details`);
        setData(response.data.data);
      } catch (error) {
        toast.error(error.data.message);
      }
    };
    getData();
  }, []);

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
              <p className="text-muted text-sm">: {data?.name}</p>
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
              <p className="text-muted text-sm">: {data?.legal_name}</p>
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
              <p className="text-muted text-sm ">: {data?.email}</p>
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
              <p className="text-muted text-sm">: {data?.mobile}</p>
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
              <p className="text-muted text-sm">: {data?.shopType}</p>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-12">
          <div className="row mb-3">
            <div className="col-6 d-flex justify-content-start align-items-center">
              <p className="text-sm">
                <b>Banner Logo</b>
              </p>
            </div>
            <div className="col-6">
              <p>
                :<img src={data?.bannerLogo} alt="logo" className="img-fluid" />
              </p>
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
              <p className="text-muted text-sm">: {data?.description}</p>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-12">
          <div className="row mb-3">
            <div className="col-6 d-flex justify-content-start align-items-center">
              <p className="text-sm">
                <b>Shop Rating</b>
              </p>
            </div>
            <div className="col-6">
              <p className="text-muted text-sm">: --</p>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-12">
          <div className="row mb-3">
            <div className="col-6 d-flex justify-content-start align-items-center">
              <p className="text-sm">
                <b>External URL</b>
              </p>
            </div>
            <div className="col-6">
              <p className="text-muted text-sm">: --</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Stores;
