import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

function Registration({ handleLogin }) {
  const location = useLocation();
  const initialSignInState = location.state?.showSignUp ? false : true;
  const [isSignIn, setIsSignIn] = useState(initialSignInState);

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100 my-5">
      <div
        className="card shadow-lg py-3 mb-5 bg-body rounded"
        style={{ width: "100%", maxWidth: "400px" }}
      >
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
      </div>
    </div>
  );
}

export default Registration;