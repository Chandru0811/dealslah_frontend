import React from "react";
import Logo from "../../assets/Logo.png";
import { FaWhatsapp, FaInstagram } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { IoLocationOutline, IoCallOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { RiFacebookCircleLine } from "react-icons/ri";
import { FiYoutube } from "react-icons/fi";
import { AiOutlineLinkedin } from "react-icons/ai";
import { TfiTwitter } from "react-icons/tfi";

function Footer() {
  return (
    <section>
      <div className="container-fluid footer-bg">
        <div className="row p-5">
          <div className="col-md-4 col-12">
            <div className="">
              <img
                src={Logo}
                alt="logo"
                className="img-fluid mb-3"
                style={{ height: "3rem" }}
              ></img>
              <p className="fonts-color">
                Etoshi is an exciting contemporary brand which focuses on
                high-quality products graphics with a British style
              </p>
            </div>
            <div className="">
              <h5 className="mb-3">Connect with us</h5>
              <div className="d-flex align-items-center">
                <Link to="#" className="fonts-color">
                  <p>
                    <FaWhatsapp size={25} />
                  </p>
                </Link>
                <Link to="#" className="fonts-color">
                  <p className="ms-3">
                    <FaInstagram size={25} />
                  </p>
                </Link>
                <Link to="#" className="fonts-color">
                  <p className="ms-3">
                    <RiFacebookCircleLine size={25} />
                  </p>
                </Link>
                <Link to="#" className="fonts-color">
                  <p className="ms-3">
                    <FiYoutube size={25} />
                  </p>
                </Link>
                <Link to="#" className="fonts-color">
                  <p className="ms-3">
                    <AiOutlineLinkedin size={25} />
                  </p>
                </Link>
                <Link to="#" className="fonts-color">
                  <p className="ms-3">
                    <TfiTwitter size={25} />
                  </p>
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-2 col-12">
            <div className="">
              <h5 className="mb-3">Get to Know Us</h5>
              <div className="row">
                <Link
                  to="#"
                  className="fonts-color"
                  style={{ textDecoration: "none" }}
                >
                  <p className="">Home</p>
                </Link>
                <Link
                  to="#"
                  className="fonts-color"
                  style={{ textDecoration: "none" }}
                >
                  <p className="">About</p>
                </Link>
                <Link
                  to="#"
                  className="fonts-color"
                  style={{ textDecoration: "none" }}
                >
                  <p className="">Shop</p>
                </Link>
                <Link
                  to="#"
                  className="fonts-color"
                  style={{ textDecoration: "none" }}
                >
                  <p className="">Contact</p>
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-2 col-12">
            <div className="">
              <h5 className="mb-3">Quick Link</h5>
              <div className="row">
                <Link
                  to="#"
                  className="fonts-color"
                  style={{ textDecoration: "none" }}
                >
                  <p className="">Terms Of Use</p>
                </Link>
                <Link
                  to="#"
                  className="fonts-color"
                  style={{ textDecoration: "none" }}
                >
                  <p className="">Privacy Policy</p>
                </Link>
                <Link
                  to="#"
                  className="fonts-color"
                  style={{ textDecoration: "none" }}
                >
                  <p className="">FAQ</p>
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-4 col-12">
            <div className="">
              <h5 className="mb-3">Contact Us</h5>
              <div className="row d-flex">
                <div className="col-md-1 col-1 fonts-color">
                  <IoCallOutline size={25} />
                </div>
                <div className="col-md-11 col-11">
                  <p className="fonts-color">9187338281</p>
                </div>
              </div>
              <div className="row d-flex">
                <div className="col-md-1 col-1 fonts-color">
                  <MdOutlineEmail size={25} />
                </div>
                <div className="col-md-11 col-11">
                  <p className="fonts-color">ecommerce@gmail.com</p>
                </div>
              </div>
              <div className="row d-flex">
                <div className="col-md-1 col-1 fonts-color">
                  <IoLocationOutline size={25} />
                </div>
                <div className="col-md-11 col-11">
                  <p className="fonts-color">4517 Washington Ave. Manchester,Road, 234 Kentucky USA</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Footer;
