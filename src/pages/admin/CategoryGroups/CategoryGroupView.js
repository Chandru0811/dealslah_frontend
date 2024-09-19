import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import cat1 from "../../../assets/category5.png";
import api from "../../../config/URL";
import toast from "react-hot-toast";

function CategoryGroupView() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  console.log("first", data.icon)
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.get(`admin/categoryGroup/${id}`);
        setData(response.data.data);
      } catch (error) {
        toast.error("Error Fetching Data ", error);
      }
    };
    getData();

  }, [id]);
  // useEffect(() => {
  //   const getData = async () => {
  //     try {
  //       const response = await api.get(`admin/categoryGroup/${id}`);
  //       formik.setValues(response.data.data);
  //     } catch (error) {
  //       toast.error("Error Fetching Data", error.message);
  //     }
  //   };
  //   getData();
  // }, [id]);
  return (
    <div className="container-fluid minHeight">
      <div className="card shadow border-0 mb-2 top-header">
        <div className="container-fluid py-4">
          <div className="row align-items-center">
            <div className="row align-items-center">
              <div className="col">
                <div className="d-flex align-items-center gap-4">
                  <h1 className="h4 ls-tight headingColor">View Category Group</h1>
                </div>
              </div>
              <div className="col-auto">
                <div className="hstack gap-2 justify-content-start">
                  <Link to="/categorygroup">
                    <button type="button" className="btn btn-sm btn-light">
                      Back
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="card shadow border-0 my-2" style={{ height: "80vh" }}>
        <div className="container">
          <div className="row mt-5 p-3">
            <div className="col-md-6 col-12">
              <div className="row mb-3">
                <div className="col-6 d-flex justify-content-start align-items-center">
                  <p className="text-sm">
                    <b>Name</b>
                  </p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">: {data.name}</p>
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
                  <p className="text-muted text-sm">: {data.slug}</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row mb-3">
                <div className="col-6 d-flex justify-content-start align-items-center">
                  <p className="text-sm">
                    <b>Order</b>
                  </p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">: {data.order}</p>
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
                  <p className="text-muted text-sm">: {data.active}</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row mb-3">
                <div className="col-12 d-flex justify-content-start align-items-center">
                  <p className="text-sm">
                    <b>Icon</b>
                  </p>
                </div>
                <div className="col-12">
                  <p>:
                    {/* <img src={data.icon} alt="icon" className="img-fluid" width={100} /> */}
                    {data.icon ? (
                      <img
                        src={data.icon}
                        className="img-fluid ms-2 w-100 rounded"
                        alt="icon"
                      />
                    ) : (
                      <></>
                    )}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row mb-3">
                <div className="col-6 d-flex justify-content-start align-items-center">
                  <p className="text-sm">
                    <b>Description</b>
                  </p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">: {data.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoryGroupView;