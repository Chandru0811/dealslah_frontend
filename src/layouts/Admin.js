import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "../pages/admin/Dashboard";
import Sidebar from "../components/admin/Sidebar";
import "../styles/adminCDN.css";
import "../styles/admin.css";
import AdminFooter from "../components/admin/AdminFooter";
import CategoryGroups from "../pages/admin/CategoryGroups/CategoryGroups";
import CategoryGroupAdd from "../pages/admin/CategoryGroups/CategoryGroupAdd";
import CategoryGroupEdit from "../pages/admin/CategoryGroups/CategoryGroupEdit";
import CategoryGroupView from "../pages/admin/CategoryGroups/CategoryGroupView";
import Banner from "../pages/admin/Banner/Banner";
import BannerAdd from "../pages/admin/Banner/BannerAdd";
import BannerEdit from "../pages/admin/Banner/BannerEdit";
import BannerView from "../pages/admin/Banner/BannerView";
import Slider from "../pages/admin/Slider/Slider";
import SliderAdd from "../pages/admin/Slider/SliderAdd";
import SliderEdit from "../pages/admin/Slider/SliderEdit";
import SliderView from "../pages/admin/Slider/SliderView";
import CategoriesIndex from "../pages/admin/categories/CategoriesIndex";
import CategoriesAdd from "../pages/admin/categories/CategoriesAdd";
import CategoriesView from "../pages/admin/categories/CategoriesView";
import CategoriesEdits from "../pages/admin/categories/CategoriesEdits";

function Admin({ handleLogout }) {
  return (
    <div>
      <BrowserRouter>
        <div className="d-flex flex-column flex-lg-row h-lg-full bg-surface-secondary">
          <Sidebar handleLogout={handleLogout} />
          <div className="h-screen flex-grow-1 overflow-y-lg-auto">
            <header class="bg-surface-primary border-bottom py-3 sticky-top-header">
              <div class="container-fluid">
                <div class="mb-npx">
                  <div class="row align-items-center">
                    <div class="col-sm-6 col-12 mb-4 mb-sm-0">
                      <span>
                        <i class="bi bi-gear"></i> Settings
                      </span>
                    </div>
                    <div class="col-sm-6 col-12 text-sm-end">
                      <div class="mx-n1">
                        <span class="position-relative">
                          <i class="bi bi-bell"></i>
                        </span>{" "}
                        &nbsp;&nbsp;&nbsp;
                        <span>
                          <i class="bi bi-question-circle"></i>
                        </span>{" "}
                        &nbsp;&nbsp;&nbsp;
                        <span>
                          <i class="bi bi-journal"></i>
                        </span>{" "}
                        &nbsp;&nbsp;&nbsp;
                        <span style={{ fontSize: "24px" }}>
                          <i class="bi bi-person-circle"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </header>
            <main className="pt-3 bg-surface-secondary">
              <div style={{ minHeight: "90vh" }}>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="*" element={<Dashboard />} />

                  {/* Category Groups */}
                  <Route path="/categorygroup" element={<CategoryGroups />} />
                  <Route
                    path="/categorygroup/add"
                    element={<CategoryGroupAdd />}
                  />
                  <Route
                    path="/categorygroup/edit"
                    element={<CategoryGroupEdit />}
                  />
                  <Route
                    path="/categorygroup/view"
                    element={<CategoryGroupView />}
                  />

                  {/* Categories */}
                  <Route path="/categories" element={<CategoriesIndex />} />
                  <Route path="/category/add" element={<CategoriesAdd />} />
                  <Route path="/category/view" element={<CategoriesView />} />
                  <Route path="/category/edit" element={<CategoriesEdits />} />

                  {/* {/ Banner /} */}
                  <Route path="/banner" element={<Banner />} />
                  <Route path="/banner/add" element={<BannerAdd />} />
                  <Route path="/banner/edit" element={<BannerEdit />} />
                  <Route path="/banner/view" element={<BannerView />} />

                  {/* {/ Slider /} */}
                  <Route path="/slider" element={<Slider />} />
                  <Route path="/slider/add" element={<SliderAdd />} />
                  <Route path="/slider/edit" element={<SliderEdit />} />
                  <Route path="/slider/view" element={<SliderView />} />
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
