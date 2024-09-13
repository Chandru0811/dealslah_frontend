import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import VendorLogin from "./VendorLogin";
import VendorRegistration from "./VendorRegistration";
import Logo from "../../assets/Header_logo.png";

function Registration({ handleLogin ,handleVendorLogin}) {
  const location = useLocation();
  const initialSignInState = location.state?.showSignUp ? false : true;
  const [isSignIn, setIsSignIn] = useState(initialSignInState);
  const [selectedRole, setSelectedRole] = useState(null); // New state to track selected role

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
  };

  const handleBackClick = () => {
    setSelectedRole(null);
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100 my-5">
      <div
        className="card shadow-lg py-3 mb-5 bg-body rounded"
        style={{ width: "100%", maxWidth: "400px" }}
      >
        {!selectedRole ? (
          <div className="d-flex flex-column justify-content-around align-items-center">
            {/* Image Section */}
            <img
              src={Logo} // Replace with your image URL
              alt="centered-img"
              className="mb-3 p-3"
              // style={{ width: "150px", height: "150px" }} // Adjust size as needed
            />

            {/* Buttons Section */}
            <div className="d-flex justify-content-between w-100 px-2">
              <button
                className="btn common-button"
                onClick={() => handleRoleSelect("admin")}
              >
                Admin
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => handleRoleSelect("vendor")}
              >
                Vendor
              </button>
            </div>
          </div>
        ) : (
          <>
            <button
              className="btn btn-link mb-3 text-start shadow-none"
              onClick={handleBackClick}
            >
              &larr; Back
            </button>
            {selectedRole === "admin" ? (
              <>
                <div className="d-flex justify-content-around">
                  <h4
                    className={`cursor-pointer py-2 ${
                      isSignIn ? "text-dark" : "text-muted"
                    }`}
                    onClick={() => setIsSignIn(true)}
                    style={{
                      borderBottom: isSignIn ? "2px solid #9C54FF" : "none",
                      paddingBottom: "5px",
                      width: "100%",
                      textAlign: "center",
                    }}
                  >
                    Sign In
                  </h4>
                  <h4
                    className={`cursor-pointer py-2 ${
                      !isSignIn ? "text-dark" : "text-muted"
                    }`}
                    onClick={() => setIsSignIn(false)}
                    style={{
                      borderBottom: !isSignIn ? "2px solid #9C54FF" : "none",
                      paddingBottom: "5px",
                      width: "100%",
                      textAlign: "center",
                    }}
                  >
                    Sign Up
                  </h4>
                </div>
                <div className="p-3">
                  {isSignIn ? <SignIn handleLogin={handleLogin} /> : <SignUp />}
                </div>
              </>
            ) : (
              <>
                <div className="d-flex justify-content-around">
                  <h4
                    className={`cursor-pointer py-2 ${
                      isSignIn ? "text-dark" : "text-muted"
                    }`}
                    onClick={() => setIsSignIn(true)}
                    style={{
                      borderBottom: isSignIn ? "2px solid #9C54FF" : "none",
                      paddingBottom: "5px",
                      width: "100%",
                      textAlign: "center",
                    }}
                  >
                    Login
                  </h4>
                  {/* Uncomment the following section if you want to allow Vendor registration */}
                  {/* <h4
                    className={`cursor-pointer py-2 ${
                      !isSignIn ? "text-dark" : "text-muted"
                    }`}
                    onClick={() => setIsSignIn(false)}
                    style={{
                      borderBottom: !isSignIn ? "2px solid #9C54FF" : "none",
                      paddingBottom: "5px",
                      width: "100%",
                      textAlign: "center",
                    }}
                  >
                    Sign Up
                  </h4> */}
                </div>
                <div className="p-3">
                  {isSignIn ? (
                    <VendorLogin handleVendorLogin={handleVendorLogin} />
                  ) : (
                    <VendorRegistration />
                  )}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Registration;
