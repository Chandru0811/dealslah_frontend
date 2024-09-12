import React, { useEffect, useRef } from 'react';
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import $ from "jquery";
import { Link } from "react-router-dom";
import cat1 from "../../../assets/category5.png";
import cat2 from "../../../assets/category4.png";
import cat3 from "../../../assets/category8.png";
import DeleteModel from '../../../components/admin/DeleteModel';

function CategoryGroups() {

    const tableRef = useRef(null);

    const datas = [
        {
            id: 1,
            icon: cat1,
            name: "Electronics",
            slug: "electronics",
            order: 1,
            active: "Active",
        },
        {
            id: 2,
            icon: cat2,
            name: "Beauty",
            slug: "beauty",
            order: 2,
            active: "Inactive",
        },
        {
            id: 3,
            icon: cat3,
            name: "Logistics",
            slug: "logistics",
            order: 3,
            active: "Active",
        }
    ];

    useEffect(() => {
        const table = $(tableRef.current).DataTable();
        return () => {
            table.destroy();
        };
    }, []);

    return (
        <div className="card shadow border-0 mx-4" style={{ height: "92vh" }}>
            <div className="card-header d-flex align-items-center justify-content-between">
                <h3 className="mb-0">Category Groups</h3>
                <div>
                    <Link to="/categorygroup/add">
                        <button className="btn btn-sm btn-button shadow-none border-none py-3">
                            Add Category Group
                        </button>
                    </Link>
                </div>
            </div>
            <div className="table-responsive minHeight p-2">
                <table ref={tableRef} className="display table">
                    <thead className="thead-light">
                        <tr>
                            <th scope="col" className='text-start' style={{ whiteSpace: "nowrap" }}>
                                S.NO
                            </th>
                            <th scope="col">Name</th>
                            <th scope="col">Slug</th>
                            <th scope="col" className='text-start'>Order</th>
                            <th scope="col">Active</th>
                            <th scope="col" className="text-center">
                                ACTION
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {datas.map((data, index) => (
                            <tr key={data.id}>
                                <td className="text-start align-middle">{index + 1}</td>
                                <td className="align-middle">
                                    <img
                                        src={data.icon}
                                        alt={data.name}
                                        className="img-fluid"
                                        width={50}
                                        height={50}
                                    />
                                    <span className="ms-2">{data.name}</span>
                                </td>
                                <td className="align-middle">{data.slug}</td>
                                <td className="align-middle text-start">{data.order}</td>
                                <td className="align-middle">{data.active}</td>
                                <td className="align-middle text-center">
                                        <Link to={`/categorygroup/view`}>
                                            <button className="button-btn btn-sm m-2">View</button>
                                        </Link>
                                        <Link to={`/categorygroup/edit`}>
                                            <button className="button-btn btn-sm m-2">Edit</button>
                                        </Link>
                                        <DeleteModel />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default CategoryGroups;