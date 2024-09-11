import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sidebar from "../components/admin/Sidebar";
import AdminFooter from "../components/admin/AdminFooter";
import Dashboard from "../pages/admin/Dashboard";
import "../styles/adminCDN.css";
import "../styles/admin.css";

function Admin({ handleLogout }) {
  return (
    <div>
      <BrowserRouter>
        <div className="d-flex flex-column flex-lg-row h-lg-full bg-surface-secondary">
          <Sidebar onLogout={handleLogout} />
          <div className="h-screen flex-grow-1 overflow-y-lg-auto">
            <main className="py-3 bg-surface-secondary">
              <div style={{ minHeight: "90vh" }}>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="*" element={<Dashboard />} />
                </Routes>
              </div>
              <AdminFooter />
            </main>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default Admin;
