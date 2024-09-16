import React, { useEffect, useRef } from "react";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import $ from "jquery";
import { Link } from "react-router-dom";
import Image from "../../../assets/tv.png";
import DeleteModel from '../../../components/admin/DeleteModel';
import { PiIntersectSquareFill } from "react-icons/pi";

const Shop = () => {
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
            <div className="card shadow border-0 mb-2 top-header">
                <div className="container-fluid">
                    <div className="row align-items-center">
                        <div className="col p-2">
                            <div className="d-flex justify-content-between align-items-center">
                                <h3 className="mb-0">Shop</h3>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div
                className="container card shadow border-0"

            >
                <div className="table-responsive p-2">
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
                                <th className="text-center">Logo</th>
                                <th className="text-center">Store Name</th>
                                <th className="text-center">Email</th>
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
                                <td className="text-center">admin@gmail.com</td>
                                <td className="text-center">
                                    <div className="d-flex justify-content-center">
                                        <Link to="/shop/view">
                                            <button className="button-btn btn-sm m-2">View</button>
                                        </Link>
                                        {/* <Link to="/products/edit">
                                            <button className="button-btn btn-sm m-2">Edit</button>
                                        </Link> */}
                                        <DeleteModel />
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

export default Shop;