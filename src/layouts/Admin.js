import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "../pages/admin/Dashboard";
import Sidebar from "../components/admin/Sidebar";
import '../styles/adminCDN.css';
import '../styles/admin.css';
import AdminFooter from "../components/admin/AdminFooter";

function Admin({ handleLogout }) {
  return (
    <div>
      <BrowserRouter>
        <div className="d-flex flex-column flex-lg-row h-lg-full bg-surface-secondary">
          <Sidebar handleLogout={handleLogout} />
          <div className="h-screen flex-grow-1 overflow-y-lg-auto">
            <main className="pt-3 bg-surface-secondary">
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