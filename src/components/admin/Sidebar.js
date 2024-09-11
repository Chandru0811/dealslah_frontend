import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Logo from "../../assets/Logo.png";

function Sidebar({ onLogout }) {
  const [studentMenuOpen, setStudentMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handelLogOutClick = () => {
    onLogout();
    navigate("/");
  };

  const toggleStudentMenu = () => {
    setStudentMenuOpen(!studentMenuOpen);
  };

  const handleNavLinkClick = () => {
    if (studentMenuOpen) {
      setStudentMenuOpen(false);
    }
  };

  return (
    <nav
      className="navbar show navbar-vertical h-lg-screen navbar-expand-lg p-0 navbar-light border-bottom border-bottom-lg-0 border-end-lg"
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
          className="navbar-brand logo_ats py-lg-2 px-lg-6 m-0 d-flex align-items-center justify-content-center"
          to="/"
          onClick={handleNavLinkClick}
        >
          <img src={Logo} alt="Logo" className="img-fluid sidebar-logo" />
        </NavLink>
        <div className="collapse navbar-collapse" id="sidebarCollapse">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/dashboard"
                onClick={handleNavLinkClick}
              >
                <i className="bi bi-bar-chart-fill"></i>Dashboard
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/brand"
                onClick={handleNavLinkClick}
              >
                <i className="bi bi-tags-fill"></i>Brands
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/categories"
                onClick={handleNavLinkClick}
              >
                <i className="bi bi-grid-fill"></i>Categories
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/customer"
                onClick={handleNavLinkClick}
              >
                <i className="bi bi-people-fill"></i> Customers
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/order"
                onClick={handleNavLinkClick}
              >
                <i className="bi bi-bag-fill"></i> Orders
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/product"
                onClick={handleNavLinkClick}
              >
                <i className="bi bi-cart-fill"></i>Products
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/banner"
                onClick={handleNavLinkClick}
              >
                <i className="bi bi-images"></i>Banners
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/inventory"
                onClick={handleNavLinkClick}
              >
                <i className="bi bi-archive-fill"></i>Inventories
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/contact"
                onClick={handleNavLinkClick}
              >
                <i className="bi bi-telephone-fill"></i>Contacted
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/notification"
                onClick={handleNavLinkClick}
              >
                <i className="bi bi-bell-fill"></i>Notification
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/about"
                onClick={handleNavLinkClick}
              >
                <i className="bi bi-info-circle-fill"></i>About
              </NavLink>
            </li>

            <li className="nav-item">
              <div
                className={`nav-link ${studentMenuOpen ? "active" : ""}`}
                onClick={toggleStudentMenu}
              >
                <i className="bi bi-gear-fill"></i>
                Setting
                {studentMenuOpen ? (
                  <i
                    className="bi bi-chevron-up"
                    style={{ marginLeft: "auto" }}
                  ></i>
                ) : (
                  <i
                    className="bi bi-chevron-down"
                    style={{ marginLeft: "auto" }}
                  ></i>
                )}
              </div>
              {studentMenuOpen && (
                <ul className="submenu " style={{ marginLeft: "2rem" }}>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/editcontact">
                      Contact Us
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/adminheader">
                      Header
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/adminfooter">
                      Footer
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/Payment">
                      Payment
                    </NavLink>
                  </li>
                </ul>
              )}
            </li>
          </ul>

          <hr className="navbar-divider my-5 opacity-20" />

          <div className="mt-auto logutBtn">
            <div className="navbar-nav">
              <div className="nav-item">{/* Account button can go here */}</div>
              <div className="nav-item">
                <button
                  to={"#"}
                  style={{ width: "100%" }}
                  className="nav-link ps-6"
                  onClick={handelLogOutClick}
                >
                  <i className="bi bi-box-arrow-left"></i>&nbsp;&nbsp; Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Sidebar;
