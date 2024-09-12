import React, { useEffect, useRef } from "react";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import $ from "jquery";
import { Link } from "react-router-dom";
import Image from "../../../assets/tv.png";
import DeleteModel from '../../../components/admin/DeleteModel';

const Slider = () => {
  const tableRef = useRef(null);

  useEffect(() => {
    const table = $(tableRef.current).DataTable({
      responsive: true,
      destroy: true,
      columnDefs: [{ targets: [0, 3], orderable: false }],
    });

    return () => {
      table.destroy();
    };
  }, []);

  return (
    <section className="px-4">
      <div className="card shadow border-0" style={{ minHeight: "90vh" }}>
        <div className="card-header d-flex align-items-center">
          <h3 className="mb-0">Slider</h3>
          <div className="container-fluid d-flex justify-content-end">
            <Link to="/slider/add">
              <button className="btn btn-sm btn-button shadow-none border-none py-3">
                Add Slider
              </button>
            </Link>
          </div>
        </div>
        <div className="table-responsive minHeight p-2">
          <table
            ref={tableRef}
            className="display table nowrap"
            style={{ width: "100%" }}
          >
            <thead className="thead-light">
              <tr>
                <th scope="col" style={{ whiteSpace: "nowrap" }}>
                  S.NO
                </th>
                <th className="text-center">Image</th>
                <th className="text-center">Title</th>
                <th className="text-center">Order</th>
                <th className="text-center">
                  ACTION
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="text-center">1</td>
                <td className="text-center">
                  <img
                    src={Image}
                    alt="Image"
                    className="img-fluid"
                    width={50}
                  ></img>
                </td>
                <td className="text-center">title</td>
                <td className="text-center">2</td>
                <td className="text-center">
                  <div className="d-flex justify-content-center">
                    <Link to="/slider/view">
                      <button className="button-btn btn-sm m-2">View</button>
                    </Link>
                    <Link to="/slider/edit">
                      <button className="button-btn btn-sm m-2">Edit</button>
                    </Link>
                    {/* <DeleteModel
                        onSuccess={refreshData}
                      /> */}
                    <button className="button-btn btn-sm m-2">Delete</button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default Slider;
