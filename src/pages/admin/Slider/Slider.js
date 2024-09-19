import React, { useEffect, useRef, useState } from "react";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import $ from "jquery";
import { Link } from "react-router-dom";
import Image from "../../../assets/tv.png";
import DeleteModel from '../../../components/admin/DeleteModel';
import { PiPlusSquareFill } from "react-icons/pi";
import api from "../../../config/URL";

const Slider = () => {
  const tableRef = useRef(null);
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const response = await api.get('admin/sliders');
        setDatas(response.data.data);

        // Initialize DataTable
        if (tableRef.current) {
          $(tableRef.current).DataTable();
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      setLoading(false);
    };

    fetchData();

    // Cleanup DataTable on component unmount
    return () => {
      if (tableRef.current) {
        $(tableRef.current).DataTable().destroy();
      }
    };
  }, []);


  return (
    <section className="px-4">
      <div className="card shadow border-0 mb-2 top-header" >
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col p-2">
              <div className="d-flex justify-content-between align-items-center">
                <h3 className="mb-0">Slider</h3>
                <div className="container-fluid d-flex justify-content-end">
                  <Link to="/slider/add">
                    <button className="btn btn-sm btn-button shadow-none border-none py-3">
                      <PiPlusSquareFill size={20} /> Add Slider
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="container card shadow border-0"

      >
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
              {datas?.map((data, index) => (
                <tr key={data.id}>

                  <td className="text-start align-middle">{index + 1}</td>
                  <td
                    className="ms-2">{data.name}
                  </td>
                  <td className="align-middle">{data.slug}</td>


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
                      <DeleteModel />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </section>
  );
};

export default Slider;