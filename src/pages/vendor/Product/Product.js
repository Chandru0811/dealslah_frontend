import React, { useEffect, useRef, useState } from "react";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import $ from "jquery";
import { Link } from "react-router-dom";
import Image from "../../../assets/tv.png";
import DeleteModel from "../../../components/admin/DeleteModel";
import { PiIntersectSquareFill } from "react-icons/pi";
import api from "../../../config/URL";
import toast from "react-hot-toast";

const Product = () => {
  const tableRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const id = sessionStorage.getItem("shop_id");
  useEffect(() => {
    const table = $(tableRef.current).DataTable({
      // responsive: true,
      destroy: true,
      columnDefs: [{ targets: [0, 3], orderable: false }],
    });

    return () => {
      table.destroy();
    };
  }, []);
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const response = await api.get(`vendor/product/${id}`);
        setData(response.data.data);
        if (tableRef.current) {
          $(tableRef.current).DataTable();
        }
      } catch (error) {
        toast.error("Error Fetching Data ", error);
      } finally {
        setLoading(false);
      }
    };
    getData();
    return () => {
      if (tableRef.current) {
        $(tableRef.current).DataTable().destroy();
      }
    };
  }, []);

  return (
    <section className="px-4">
      <div className="card shadow border-0 mb-2 top-header">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col p-2">
              <div className="d-flex justify-content-between align-items-center">
                <h3 className="mb-0">Products</h3>
                <Link to="/product/add">
                  <button className="btn btn-sm btn-button shadow-none border-none py-3">
                    <PiIntersectSquareFill size={20} /> Add Product
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="container card shadow border-0"
        style={{ minHeight: "80vh" }}
      >
        {loading ? (
          <div className="loader-container">
            <div class="loading">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        ) : (
          <div className="table-responsive p-2">
            <table ref={tableRef} className="display" style={{ width: "100%" }}>
              <thead className="thead-light">
                <tr>
                  <th scope="col" style={{ whiteSpace: "nowrap" }}>
                    S.NO
                  </th>
                  <th className="text-center">Title</th>
                  <th className="text-center">Product</th>
                  <th className="text-center">Active</th>
                  <th className="text-center">ACTION</th>
                </tr>
              </thead>
              <tbody>
                {data.map((data, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    {/* <td>{data.centerName}</td> */}
                    <td>{data.name}</td>
                    <td>{data.product}</td>
                    <td>{data.active}</td>
                    <td className="d-flex">
                      <Link to={`/course/view/`}>
                        <button className="btn btn-sm">view</button>
                      </Link>
                      <Link to={`/course/edit/`}>
                        <button className="btn btn-sm">Edit</button>
                      </Link>
                      {/* <Delete  /> */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
};

export default Product;
