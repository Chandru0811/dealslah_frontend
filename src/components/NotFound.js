import React from "react";
import NotFoundImg from "../assets/NotFound.png";

function NotFound() {
  return (
    <div>
      <div className="container d-flex flex-column justify-content-center align-items-center">
        <img src={NotFoundImg} alt="NotFoundImg" className="img-fluid" />
        <h5 className="py-2">OOPS! PAGE NOT FOUND</h5>
        <button className="btn btn-sm common-button">BACK TO HOME</button>
      </div>
    </div>
  );
}

export default NotFound;
