import React from "react";
import user from '../../assets/user.webp'

function AdminHeader() {
  return (
    <header class="border-bottom py-3 sticky-top-header">
      <div class="container-fluid">
        <div class="mb-npx">
          <div class="row align-items-center">
            <div class="col-sm-6 col-12 mb-4 mb-sm-0 admin-settings">    
              <span>
                <i class="bi bi-gear admin-icons"></i> Settings
              </span>
            </div>
            <div class="col-sm-6 col-12 text-sm-end">
              <div class="mx-n1">
                <span class="position-relative">
                  <i class="bi bi-bell admin-icons"></i>
                </span>{" "}
                &nbsp;&nbsp;&nbsp;
                <span>
                  <i class="bi bi-question-circle admin-icons"></i>
                </span>{" "}
                &nbsp;&nbsp;&nbsp;
                <span>
                <i class="bi bi-megaphone admin-icons"></i>

                </span>{" "}
                &nbsp;&nbsp;&nbsp;
                <span>
                  <i class="bi bi-journal admin-icons"></i>
                </span>{" "}
                &nbsp;&nbsp;&nbsp;
                <span style={{ fontSize: "24px" }}>
                  <img src={user} className="img-fluid header-user" alt="img" />
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
