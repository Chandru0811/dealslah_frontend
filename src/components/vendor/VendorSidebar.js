import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import deals from "../../assets/deals.png";
import { BsBarChartFill, BsHouseDoorFill } from "react-icons/bs";
import { BiSolidCategory, BiLogOut, BiCart } from "react-icons/bi";
import { MdCategory } from "react-icons/md";
import { IoSettings } from "react-icons/io5";
import ImageURL from "../../config/ImageURL";

function VendorSidebar({ handleLogout, logo }) {
  const navigate = useNavigate();
  const handelLogOutClick = () => {
    handleLogout();
    navigate("/");
  };

  const [leadMenuOpen] = useState(false);

  const [activeSubmenu] = useState(null);

  return (
    <nav
      className="navbar show navbar-vertical navbar-expand-lg p-0 navbar-light border-bottom h-screen border-bottom-lg-0 border-end-lg overflow-y-auto"
      id="navbarVertical"
    >
      <div className="container-fluid">
        <button
          className="navbar-toggler mx-2 p-1"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#sidebarCollapse"
          aria-controls="sidebarCollapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <NavLink
          className={`navbar-brand nav-logo logo_ats py-lg-2 px-lg-6 m-0 d-flex align-items-center justify-content-center gap-3 ${
            leadMenuOpen || activeSubmenu ? "active" : ""
          }`}
          to="/"
        >
          {logo !== null ? (
            <img
              src={`${ImageURL}${logo}`}
              alt="shop logo"
              className="img-fluid p-1"
              style={{
                background: "#fff",
                borderRadius: "5px",
              }}
            />
          ) : (
            <img
              src={deals}
              alt="deals"
              className="img-fluid sidebar-logo rounded-circle"
              style={{
                background: "#fff",
                borderRadius: "5px",
                width: "50px",
                height: "50px",
              }}
            />
          )}
          {logo === null && <p className="text-white">Dealslah</p>}
        </NavLink>
        <div
          className="collapse navbar-collapse"
          id="sidebarCollapse"
          style={{ marginTop: "5rem" }}
        >
          <ul className="navbar-nav">
            {/* Dashboard */}
            <li className="nav-item">
              <NavLink className="nav-link" to="/dashboard">
                <BsBarChartFill /> Dashboard
              </NavLink>
            </li>

            {/* Home */}
            {/* <li className="nav-item">
              <NavLink className="nav-link" to="/home">
                <BsHouseDoorFill /> Home
              </NavLink>
            </li> */}
            {/* Category */}
            {/* <li className="nav-item">
              <NavLink className="nav-link" to="/category">
                <MdCategory /> Category
              </NavLink>
            </li> */}
            {/* Products */}
            <li className="nav-item">
              <NavLink className="nav-link" to="/product">
                <BiSolidCategory /> Deals
              </NavLink>
            </li>

            {/* Orders */}
            {/* <li className="nav-item">
              <NavLink className="nav-link" to="/orders">
                <BiCart /> Orders
              </NavLink>
            </li> */}

            {/* <li className="nav-item">
              <NavLink className="nav-link" to="/dealcategory">
                <MdCategory /> Deal Category
              </NavLink>
            </li> */}

            {/* Settings */}
            {/* <li className="nav-item">
              <NavLink className="nav-link" to="/settings">
                <IoSettings /> Settings
              </NavLink>
            </li> */}
          </ul>
          <div className="ps-4 mt-auto w-100 mb-4">
            <div className="navbar-nav">
              <div className="nav-item">
                <button
                  to={"#"}
                  style={{ width: "100%" }}
                  className="nav-link ps-6"
                  onClick={handelLogOutClick}
                >
                  <BiLogOut />
                  &nbsp;&nbsp; Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default VendorSidebar;
