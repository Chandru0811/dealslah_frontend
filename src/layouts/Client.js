import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Home from "../pages/client/Home";
// import Footer from "../components/client/Footer";
import "../styles/client.css";
// import Header from "../components/client/Header";
import ForgotPage from "../components/common/ForgotPage";
import Registration from "../components/auth/Registration";
import VendorLogin from "../components/auth/VendorLogin";
import VendorRegistration from "../components/auth/VendorRegistration";
import SignIn from "../components/auth/SignIn";
import AdminLogin from "../components/auth/AdminLogin";
import Wellcomepage from "../components/auth/Register/AddRegister/Wellcomepage";
// import NotFound from "../components/common/NotFound";

function Client({
  handleLogout,
  handleLogin,
  handleVendorLogin,
  handleClientLogin,
  isClientLogin,
}) {
  return (
    <div>
      <div style={{ background: "" }}>
        <BrowserRouter>
          {/* <Header /> */}
          <Routes>
            {/* <Route path="/" element={<Home  />} /> */}
            {/* <Route path="*" element={<NotFound />} /> */}
            <Route path="/" element={<Registration />} />
            {/* <Route path="/vendorregistration" element={<VendorRegistration />} /> */}
            <Route
              path="/login"
              element={
                <VendorLogin
                  handleVendorLogin={handleVendorLogin}
                  handleLogin={handleLogin}
                />
              }
            />
            <Route path="/wellcomepage" element={<Wellcomepage />} />
            <Route
              path="/vendorregistration"
              element={
                <VendorRegistration handleVendorLogin={handleVendorLogin} />
              }
            />
            <Route path="/forgot" element={<ForgotPage />} />
          </Routes>
          {/* <Footer /> */}
        </BrowserRouter>
      </div>
    </div>
  );
}

export default Client;
