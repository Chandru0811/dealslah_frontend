import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/client/Home";
import Footer from "../components/client/Footer";
import '../styles/client.css';
import Header from "../components/client/Header";

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
        <Header />
          <Routes>
            <Route path="/" element={<Home handleLogin={handleLogin} />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </div>
    </div>
  );
}

export default Client;
