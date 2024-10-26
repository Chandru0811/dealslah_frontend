import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import "./../../styles/Vendor.css";
import dashgraph from "../../assets/dashgraph.png";
import dashgraph2 from "../../assets/dashgraph2.png";
import graph5 from "../../assets/graph5.png";
import graph4 from "../../assets/graph4.png";
import graph6 from "../../assets/Graph1.png";
import graph7 from "../../assets/Graph2.png";
import { IoSettingsOutline } from "react-icons/io5";
import { IoMdArrowDropdown } from "react-icons/io";
import { Button, Card, Form } from "react-bootstrap";

function Dashboard() {
  const [currentWeek, setCurrentWeek] = useState("");
  const [state, setState] = useState({
    options: {
      colors: ["#9349ff", "#FFB63A", "#74aef0"],
      chart: {
        id: "basic-bar",
        toolbar: {
          show: true,
          tools: {
            download: true,
            selection: false,
            zoom: true,
            zoomin: true,
            zoomout: true,
            pan: true,
            reset: true,
            customIcons: [],
          },
        },
      },
      xaxis: {
        categories: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
      },
    },
    series: [
      {
        name: "series-1",
        data: [30, 40, 45, 50, 49, 60, 70],
      },
      {
        name: "series-2",
        data: [3, 70, 5, 30, 22, 50, 80],
      },
      {
        name: "series-3",
        data: [30, 40, 45, 30, 49, 60, 70],
      },
    ],
  });
  const [showProducts, setShowProducts] = useState(false);
  const [products, setProducts] = useState([
    { name: "Laptop", selected: true },
    { name: "Mobile", selected: true },
    { name: "TV", selected: true },
    { name: "Product 4", selected: true },
    { name: "Product 5", selected: true },
    { name: "Product 6", selected: true },
    { name: "Product 7", selected: true },
    { name: "Product 8", selected: true },
    { name: "Product 9", selected: true },
  ]);
  const [selectAll, setSelectAll] = useState(true);

  const toggleShowProducts = () => {
    setShowProducts(!showProducts);
  };

  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    setProducts(
      products.map((product) => ({ ...product, selected: newSelectAll }))
    );
  };

  const handleProductSelect = (index) => {
    const updatedProducts = [...products];
    updatedProducts[index].selected = !updatedProducts[index].selected;
    setProducts(updatedProducts);

    const allSelected = updatedProducts.every((product) => product.selected);
    setSelectAll(allSelected);
  };
  useEffect(() => {
    const getCurrentWeek = () => {
      const currentDate = new Date();
      const firstDayOfYear = new Date(currentDate.getFullYear(), 0, 1);
      const pastDaysOfYear =
        (currentDate - firstDayOfYear) / (24 * 60 * 60 * 1000);
      const weekNumber = Math.ceil(
        (pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7
      );
      return `${currentDate.getFullYear()}-W${String(weekNumber).padStart(
        2,
        "0"
      )}`;
    };

    setCurrentWeek(getCurrentWeek());
  }, []);

  return (
    <div className="card shadow border-0 mx-4" style={{ minHeight: "90vh" }}>
       <div className="row card-container p-5">
  <div className="col-12 col-md-6 col-lg-3 mb-4">
    <div className="card h-100 p-5" 
      style={{
        background: "#1A2E86",
        borderRadius: "8px",
        backgroundImage: `url(${dashgraph})`, 
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "bottom center"
      }}
    >
      <div className="card-content p-2">
        <div className="d-flex justify-content-between">
          <h2 className="text-white">9.823</h2>
          <div>
            <IoSettingsOutline className="text-white" />
            <IoMdArrowDropdown className="text-white" />
          </div>
        </div>
        <p className="text-white mt-3">Deal Clicks</p>
      </div>
    </div>
  </div>

  <div className="col-12 col-md-6 col-lg-3 mb-4">
    <div className="card h-100 p-5"
      style={{
        background: "#237BFF",
        borderRadius: "8px",
        backgroundImage: `url(${dashgraph2})`, 
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "bottom center"
      }}
    >
      <div className="card-content p-2">
        <div className="d-flex justify-content-between">
          <h2 className="text-white">9.823</h2>
          <div>
            <IoSettingsOutline className="text-white" />
            <IoMdArrowDropdown className="text-white" />
          </div>
        </div>
        <p className="text-white mt-3">Deal Views</p>
      </div>
    </div>
  </div>

  <div className="col-12 col-md-6 col-lg-3 mb-4">
    <div className="card h-100 p-5"
      style={{
        background: "#FFB63A",
        borderRadius: "8px",
        backgroundImage: `url(${graph5})`, 
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "bottom center"
      }}
    >
      <div className="card-content p-2">
        <div className="d-flex justify-content-between">
          <h2 className="text-white">9.823</h2>
          <div>
            <IoSettingsOutline className="text-white" />
            <IoMdArrowDropdown className="text-white" />
          </div>
        </div>
        <p className="text-white mt-3">Discount Copied</p>
      </div>
    </div>
  </div>

  <div className="col-12 col-md-6 col-lg-3 mb-4">
    <div className="card h-100 p-5"
      style={{
        background: "#eb4034",
        borderRadius: "8px",
        backgroundImage: `url(${graph4})`,
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "bottom center"
      }}
    >
      <div className="card-content p-2">
        <div className="d-flex justify-content-between">
          <h2 className="text-white">9.823</h2>
          <div>
            <IoSettingsOutline className="text-white" />
            <IoMdArrowDropdown className="text-white" />
          </div>
        </div>
        <p className="text-white mt-3">Deal Shares</p>
      </div>
    </div>
  </div>

  <div className="col-12 col-md-6 col-lg-3 mb-4">
    <div className="card h-100 p-5"
      style={{
        background: "#fb8b33",
        borderRadius: "8px",
        backgroundImage: `url(${graph6})`,
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "bottom center"
      }}
    >
      <div className="card-content p-2">
        <div className="d-flex justify-content-between">
          <h2 className="text-white">9.823</h2>
          <div>
            <IoSettingsOutline className="text-white" />
            <IoMdArrowDropdown className="text-white" />
          </div>
        </div>
        <p className="text-white mt-3">Deal Enquiries</p>
      </div>
    </div>
  </div>

  {/* Uncomment to add more cards */}
  {/* <div className="col-12 col-md-6 col-lg-3 mb-4">
    <Card
      style={{
        background: "#52ae55",
        borderRadius: "8px",
      }}
      className="h-100"
    >
      <div className="card-content p-2">
        <div className="d-flex justify-content-between">
          <h2 className="text-white">{data?.totalproductscount}</h2>
          <div>
            <IoSettingsOutline className="text-white" />
            <IoMdArrowDropdown className="text-white" />
          </div>
        </div>
        <p className="text-white mt-3">Active Products</p>
      </div>
    </Card>
  </div> */}
</div>
<div className="row">
        <input
          type="week"
          className="form-control week-input  ms-5"
          style={{ boxShadow: "none", width: "250px" }}
          value={currentWeek}
          onChange={(e) => setCurrentWeek(e.target.value)}
        />
        <div className="col-12">
          <Chart
            options={state.options}
            series={state.series}
            type="area"
            width="100%"
            height="350"
          />
        </div>
        <div className="col-12">
          <button onClick={toggleShowProducts} className="btn m-4" style={{background:"#ef4444",color:"#fff"}}>
            {showProducts ? "Hide Products" : "View Products"}
          </button>
          {showProducts && (
            <div className="m-3">
              <div className="mb-2">
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={handleSelectAll}
                  id="selectAll"
                />
                <label htmlFor="selectAll" className="ms-2 fw-medium">
                  Select All
                </label>
              </div>
              <div className="row">
                {products.map((product, index) => (
                  <div className="col-md-4 mb-2" key={index}>
                    <input
                      type="checkbox"
                      checked={product.selected}
                      onChange={() => handleProductSelect(index)}
                      id={`product-${index}`}
                    />
                    <label
                      htmlFor={`product-${index}`}
                      className="ms-3 fw-medium"
                    >
                      {product.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
