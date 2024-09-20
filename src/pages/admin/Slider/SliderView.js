import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Image from "../../../assets/tv.png";
import api from "../../../config/URL";
import toast from "react-hot-toast";
import ImageURL from "../../../config/ImageURL";

function SliderView() {
  const { id } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.get(`admin/slider/${id}`);
        setData(response.data.data);
      } catch (error) {
        toast.error("Error Fetching Data ", error);
      }
    };
    getData();

  }, [id]);
  return (
    <section className="px-4">
      <div className="card shadow border-0 mb-3">
        <div className="row p-3">
          <div className="d-flex justify-content-between align-items-center">
            <h1 className="h4 ls-tight">View Slider</h1>
            <div>
              <Link to="/slider">
                <button type="button" className="btn btn-light btn-sm">
                  <span>Back</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div
        className="container card shadow border-0"
        style={{ minHeight: "60vh" }}
      >
        <div className="row mt-5 p-3">
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
              <div className="col-12 d-flex justify-content-start align-items-center">
                <p className="text-sm">
                  <b>Image</b>
                </p>
              </div>
              <div className="col-12 mt-3">
                {/* <p> */}
                {/* <img
                    src={Image}
                    alt="image"
                    className="img-fluid"
                    width={150}
                  /> */}
                <p className="text-muted text-sm">: <img src={`${ImageURL}${data.image_path}`}
                  alt="icon"
                  className="img-fluid"></img></p>
                {/* </p> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SliderView;
