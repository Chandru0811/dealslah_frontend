import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/client/Home";
import Footer from "../components/client/Footer";
import "../styles/client.css";
import Header from "../components/client/Header";
import ForgotPage from "../components/common/ForgotPage";
import Registration from "../components/auth/Registration";
import NotFound from "../components/common/NotFound";

function Client({
  handleLogout,
  handleLogin,
  handleClientLogin,
  isClientLogin,
}) {
  return (
    <div>
      <div>
        <BrowserRouter>
          {/* <Header /> */}
          <Routes>
            {/* <Route path="/" element={<Home  />} /> */}
            <Route path="*" element={<NotFound />} />
            <Route path="/" element={<Registration handleLogin={handleLogin} />} />
            <Route path="/forgot" element={<ForgotPage />} />
          </Routes>
          {/* <Footer /> */}
        </BrowserRouter>
      </div>
    </div>
  );
}

export default Client;
