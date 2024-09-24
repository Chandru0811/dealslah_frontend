import React, { useEffect, useRef, useState } from "react";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import $ from "jquery";
import { Link } from "react-router-dom";
import DeleteModel from "../../../components/admin/DeleteModel";
import { PiPlusSquareFill } from "react-icons/pi";
import api from "../../../config/URL";

function CategoriesIndex() {
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(false);
  const tableRef = useRef(null);

  const initializeDataTable = () => {
    if ($.fn.DataTable.isDataTable(tableRef.current)) {
      return; // DataTable already initialized
    }
    $(tableRef.current).DataTable({
      responsive: true,
      pageLength: 10, // Set to show 10 entries per page
      columnDefs: [{ orderable: false, targets: -1 }],
      lengthChange: false, // Hide the page length change dropdown
      destroy: true, // Ensure DataTable can be re-initialized correctly
    });
  };

  const destroyDataTable = () => {
    if ($.fn.DataTable.isDataTable(tableRef.current)) {
      $(tableRef.current).DataTable().destroy();
    }
  };

  const refreshData = async () => {
    destroyDataTable(); // Clean up the old DataTable
    setLoading(true);
    try {
      // Fetch paginated data; adjust URL parameters if server supports pagination
      const response = await api.get('/admin/categories');
      setDatas(response.data.data); // Update data state
    } catch (error) {
      console.error('Error refreshing data:', error);
    }
    setLoading(false);
    initializeDataTable(); // Reinitialize DataTable after data update
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Initial data fetch with pagination
        const response = await api.get('/admin/categories');
        setDatas(response.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      setLoading(false);
      initializeDataTable(); // Initialize DataTable with fetched data
    };

    fetchData();

    return () => {
      destroyDataTable(); // Cleanup DataTable on component unmount
    };
  }, []);

  return (
    <section className="px-4">
      <div className="card shadow border-0 mb-2 top-header p-2">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 p-2 d-flex justify-content-between align-items-center">
              <h3 class="mb-0">Categories</h3>
              <div class="container-fluid d-flex justify-content-end">
                <Link to="/category/add">
                  <button
                    type="submit"
                    className="btn btn-sm btn-button shadow-none border-0 py-3"
                  >
                    <PiPlusSquareFill size={20} />
                    Add category
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container card shadow border-0" style={{ minHeight: "80vh" }}>
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
            <table
              ref={tableRef}
              className="display table"
              style={{ width: "100%" }}
            >
              <thead className="thead-light">
                <tr>
                  <th scope="col" style={{ whiteSpace: "nowrap" }}>
                    S.NO
                  </th>
                  {/* <th scope="col">Category Group Id</th> */}
                  <th scope="col">Name</th>
                  <th scope="col">Slug</th>
                  <th scope="col">Description</th>
                  <th scope="col">Active</th>
                  <th scope="col" className="text-center">
                    ACTION
                  </th>
                </tr>
              </thead>
              <tbody>
                {datas?.map((data, index) => (
                  <tr key={data.category_group_id}>
                    <td className="text-center">{index + 1}</td>
                    {/* <td>
                    <div className="word-wrap text-center">
                      {data.category_group_id}
                    </div>
                  </td> */}
                    <td>
                      <div className="word-wrap">{data.name}</div>
                    </td>
                    <td>
                      <div className="word-wrap">{data.slug}</div>
                    </td>
                    <td>
                      <div className="word-wrap">{data.description}</div>
                    </td>
                    <td className="align-middle">
                      {data.active ? (
                        <span className="dot" style={{ backgroundColor: 'green', width: '10px', height: '10px', display: 'inline-block', borderRadius: '50%' }}></span>
                      ) : (
                        <span className="dot" style={{ backgroundColor: 'red', width: '10px', height: '10px', display: 'inline-block', borderRadius: '50%' }}></span>
                      )}
                      {data.active ? ' Active' : ' Inactive'}
                    </td>


                    <td className="text-center">
                      <div>
                        <Link to={`/category/view/${data.id}`}>
                          <button className="button-btn btn-sm m-2">
                            View
                          </button>
                        </Link>
                        <Link to={`/category/edit/${data.id}`}>
                          <button className="button-btn btn-sm m-2">
                            Edit
                          </button>
                        </Link>
                        <DeleteModel
                          onSuccess={refreshData}
                          path={`admin/categories/${data.id}`}
                          style={{ display: "inline-block" }}
                        />
                      </div>
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

export default CategoriesIndex;
