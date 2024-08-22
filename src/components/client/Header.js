import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Dropdown } from "react-bootstrap";
import Logo from "../../assets/Logo.png";
import { PiShoppingCartSimpleFill } from "react-icons/pi";
import { FiHeart } from "react-icons/fi";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { Form, FormControl, Button } from 'react-bootstrap';
import { FaSearch, FaMapMarkerAlt, FaStore } from 'react-icons/fa';
import { BiLogIn } from "react-icons/bi";
import { RiUserAddFill } from "react-icons/ri";

function Header() {
  const expand = "xl";

  const [showExpandedSearch, setShowExpandedSearch] = useState(false);

  const toggleSearchInput = () => {
    setShowExpandedSearch(!showExpandedSearch);
  };
  return (
    <section>
      {/* Topbar */}
      <div className="top-bar d-flex justify-content-between align-items-center bg-dark text-white p-2">
        <div className="d-flex align-items-center flex-grow-1">
          {!showExpandedSearch && (
            <div className="d-flex align-items-center flex-grow-1 ">
              <Form className="d-flex me-3 align-items-center flex-grow-1 w-100">
                <FaMapMarkerAlt className="me-2" style={{ color: "#676868" }} />
                <FormControl
                  type="text"
                  placeholder="Location (Alabama, Colorado...)"
                  className="search me-2"
                />
              </Form>
              <Form className="d-flex align-items-center flex-grow-1">
                <FaStore className="me-2" style={{ color: "#676868" }} />
                <FormControl
                  type="text"
                  placeholder="Store (Acerit, Drennus...)"
                  className="search me-2"
                />
              </Form>
            </div>
          )}

          <div className="d-flex align-items-center flex-grow-1">
            {showExpandedSearch && (
              <Form className="d-flex align-items-center flex-grow-1">
                <FormControl
                  type="text"
                  placeholder="Search for... (20% off, great deal,...)"
                  className="me-2 flex-grow-1"
                />
                <Button variant="bg-light" onClick={toggleSearchInput}>
                  <FaSearch style={{ color: "#676868", border: "none" }} />
                </Button>
              </Form>
            )}

            {!showExpandedSearch && (
              <Button variant="bg-light" onClick={toggleSearchInput} className="ms-3">
                <FaSearch style={{ color: "#676868", border: "none" }} />
              </Button>
            )}
          </div>
        </div>

        <div className="d-flex align-items-center">
          <div style={{ borderLeft: "1px solid #676868" }}>
            <Button variant="link" className="text-white" style={{ textDecoration: "none" }}>
              <BiLogIn style={{ color: "#676868", fontSize: "20px" }} /> <span style={{ color: "#676868" }}>LOGIN</span>
            </Button>
          </div>

          <div style={{ borderLeft: "1px solid #676868", borderRight: "1px solid #676868" }}>
            <Button variant="link" className="text-white ms-3" style={{ textDecoration: "none" }}>
              <RiUserAddFill style={{ color: "#676868", fontSize: "20px" }} /> <span style={{ color: "#676868" }}>REGISTER</span>
            </Button>
          </div>

          <Nav.Link as={NavLink} className="ms-3 d-flex align-items-center position-relative">
            <FiHeart size={25} style={{ color: "#676868" }} />
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-light" style={{ color: "black" }}>
              0
            </span>
          </Nav.Link>

          <Nav.Link as={NavLink} className="ms-3 d-flex align-items-center position-relative">
            <PiShoppingCartSimpleFill size={25} style={{ color: "#676868" }} />
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-light" style={{ color: "black" }}>
              0
            </span>
          </Nav.Link>

          <Nav.Link as={NavLink} className="ms-3 d-flex align-items-center position-relative">
            <HiOutlineShoppingBag size={25} style={{ color: "#676868" }} />
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-light" style={{ color: "black" }}>
              0
            </span>
          </Nav.Link>
        </div>
      </div>

      {/* Header */}
      <Navbar key={expand} expand={expand} className="header shadow-sm">
        <Container fluid>
          <Navbar.Brand as={NavLink} to="/">
            <img src={Logo} alt="Logo" className="img-fluid" width={150} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`}/>
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-${expand}`}
            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
            placement="top"
            className="bg-white"
          >
            <Offcanvas.Header>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                <img src={Logo} alt="Logo" className="img-fluid" width={150} />
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <div className="d-flex flex-column flex-lg-row justify-content-end w-100 align-items-stretch">
                <div className="col-lg-9 col-md-6 d-flex flex-column flex-lg-row justify-content-end align-items-stretch gap-4">
                  <Nav.Link className="d-flex align-items-center nav-link">
                    <Dropdown className="withoutDropdownArrow">
                      <Dropdown.Toggle
                        // className="withoutStyleButton"
                        id="dropdown-basic"
                        style={{ background: "none", border: "none", color: "#000" }}
                      >
                        Deals
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item>
                          <p className="fw-bold text-center">Top Categories</p>
                        </Dropdown.Item>
                        <Dropdown.Item>Computer & Laptop</Dropdown.Item>
                        <Dropdown.Item>Computer Accessories</Dropdown.Item>
                        <Dropdown.Item>SmartPhone</Dropdown.Item>
                        <Dropdown.Item>Headphone</Dropdown.Item>
                        <Dropdown.Item>Mobile Accessories</Dropdown.Item>
                        <Dropdown.Item>Gaming Console</Dropdown.Item>
                        <Dropdown.Item>Camera & Photo</Dropdown.Item>
                        <Dropdown.Item>TV & Homes Appliances</Dropdown.Item>
                        <Dropdown.Item>Watches & Accessories</Dropdown.Item>
                        <Dropdown.Item>Wearable Technology</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </Nav.Link>
                  <Nav.Link className="d-flex align-items-center nav-link">
                    Stores
                  </Nav.Link>
                  <Nav.Link className="d-flex align-items-center nav-link">
                    Categories
                  </Nav.Link>
                </div>
              </div>
            </Offcanvas.Body>

          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </section>
  );
}

export default Header;
