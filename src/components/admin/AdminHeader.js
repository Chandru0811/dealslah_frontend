import React from "react";

function AdminHeader() {
  return (
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
  );
}

export default AdminHeader;
