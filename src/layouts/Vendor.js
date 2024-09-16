import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "../styles/adminCDN.css";
import "../styles/admin.css";
import "../styles/Vendor.css";
import AdminFooter from "../components/admin/AdminFooter";
import Product from "../pages/vendor/Product/Product";
import ProductAdd from "../pages/vendor/Product/ProductAdd";
import ProductEdit from "../pages/vendor/Product/ProductEdit";
import ProductView from "../pages/vendor/Product/ProductView";
import DashboardV from "../pages/vendor/DashboardV";
import VendorSidebar from "../components/vendor/VendorSidebar";
import Settings from "../pages/vendor/Settings/Settings";
import StorePolicy from "../pages/vendor/Settings/StorePolicy";
import VendorHeader from "../components/vendor/VendorHeader";
import ApprovePopup from "../components/auth/ApprovePopup";

function Vendor({ handleLogout }) {
  return (
    <div>
      <BrowserRouter>
        <ApprovePopup />
        <div className="d-flex flex-column flex-lg-row h-lg-full bg-surface-secondary">
          <VendorSidebar handleLogout={handleLogout} />
          <div className="h-screen flex-grow-1 overflow-y-lg-auto">
            <VendorHeader />
            <main className="pt-3 bg-surface-secondary">
              <div style={{ minHeight: "90vh" }}>
                <Routes>
                  <Route path="/" element={<DashboardV />} />
                  <Route path="*" element={<DashboardV />} />

                  {/* {/ Slider /} */}
                  <Route path="/product" element={<Product />} />
                  <Route path="/product/add" element={<ProductAdd />} />
                  <Route path="/product/edit" element={<ProductEdit />} />
                  <Route path="/product/view" element={<ProductView />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/product/view" element={<StorePolicy />} />
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

export default Vendor;
