import React, { useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import { Card, Button } from "react-bootstrap";
import { useFormik } from "formik";

function StoreHours() {
  const [loadIndicator, setLoadIndicator] = useState(false);

  const formik = useFormik({
    initialValues: {
      mondayOpening: "",
      mondayClosing: "",

      tuesdayOpening: "",
      tuesdayClosing: "",

      wednesdayOpening: "",
      wednesdayClosing: "",

      thursdayOpening: "",
      thursdayClosing: "",

      fridayOpening: "",
      fridayClosing: "",

      saturdayOpening: "",
      saturdayClosing: "",

      sundayOpening: "",
      sundayClosing: "",
    },
    onSubmit: (values) => {
      setLoadIndicator(true);
      console.log("Store Hours Data:", values);
    },
  });

  return (
    <div className="container mt-4">
      <h4 className="text-primary my-5">Daily Basis Opening & Closing Hours</h4>
      <form onSubmit={formik.handleSubmit}>
        <div className="row mb-4">
          <Card>
            <Card.Header>Monday Time Slots</Card.Header>
            <Card.Body>
              <div className="row">
              <div className="col-md-6 col-12">
                <div className="mb-3">
                  <label className="form-label">Opening</label>
                  <input
                    type="time"
                    className="form-control"
                    {...formik.getFieldProps("mondayOpening")}
                  />
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="mb-3">
                  <label className="form-label">Closing</label>
                  <input
                    type="time"
                    className="form-control"
                    {...formik.getFieldProps("mondayClosing")}
                  />
                </div>
              </div>
              </div>
            </Card.Body>
          </Card>
        </div>
        <div className="row mb-4">
          <Card>
            <Card.Header>Tuesday Time Slots</Card.Header>
            <Card.Body>
              <div className="row">
              <div className="col-md-6 col-12">
                <div className="mb-3">
                  <label className="form-label">Opening</label>
                  <input
                    type="time"
                    className="form-control"
                    {...formik.getFieldProps("tuesdayOpening")}
                  />
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="mb-3">
                  <label className="form-label">Closing</label>
                  <input
                    type="time"
                    className="form-control"
                    {...formik.getFieldProps("tuesdayClosing")}
                  />
                </div>
              </div>
              </div>
            </Card.Body>
          </Card>
        </div>
        <div className="row mb-4">
          <Card>
            <Card.Header>Wednesday Time Slots</Card.Header>
            <Card.Body>
              <div className="row">
              <div className="col-md-6 col-12">
                <div className="mb-3">
                  <label className="form-label">Opening</label>
                  <input
                    type="time"
                    className="form-control"
                    {...formik.getFieldProps("wednesdayOpening")}
                  />
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="mb-3">
                  <label className="form-label">Closing</label>
                  <input
                    type="time"
                    className="form-control"
                    {...formik.getFieldProps("wednesdayClosing")}
                  />
                </div>
              </div>
              </div>
            </Card.Body>
          </Card>
        </div>
        <div className="row mb-4">
          <Card>
            <Card.Header>Thursday Time Slots</Card.Header>
            <Card.Body>
              <div className="row">
              <div className="col-md-6 col-12">
                <div className="mb-3">
                  <label className="form-label">Opening</label>
                  <input
                    type="time"
                    className="form-control"
                    {...formik.getFieldProps("thursdayOpening")}
                  />
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="mb-3">
                  <label className="form-label">Closing</label>
                  <input
                    type="time"
                    className="form-control"
                    {...formik.getFieldProps("thursdayClosing")}
                  />
                </div>
              </div>
              </div>
            </Card.Body>
          </Card>
        </div>
        <div className="row mb-4">
          <Card>
            <Card.Header>Friday Time Slots</Card.Header>
            <Card.Body>
              <div className="row">
              <div className="col-md-6 col-12">
                <div className="mb-3">
                  <label className="form-label">Opening</label>
                  <input
                    type="time"
                    className="form-control"
                    {...formik.getFieldProps("fridayOpening")}
                  />
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="mb-3">
                  <label className="form-label">Closing</label>
                  <input
                    type="time"
                    className="form-control"
                    {...formik.getFieldProps("fridayClosing")}
                  />
                </div>
              </div>
              </div>
            </Card.Body>
          </Card>
        </div>
        <div className="row mb-4">
          <Card>
            <Card.Header>Saturday Time Slots</Card.Header>
            <Card.Body>
              <div className="row">
              <div className="col-md-6 col-12">
                <div className="mb-3">
                  <label className="form-label">Opening</label>
                  <input
                    type="time"
                    className="form-control"
                    {...formik.getFieldProps("saturdayOpening")}
                  />
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="mb-3">
                  <label className="form-label">Closing</label>
                  <input
                    type="time"
                    className="form-control"
                    {...formik.getFieldProps("saturdayClosing")}
                  />
                </div>
              </div>
              </div>
            </Card.Body>
          </Card>
        </div>
        <div className="row mb-4">
          <Card>
            <Card.Header>Sunday Time Slots</Card.Header>
            <Card.Body>
              <div className="row">
              <div className="col-md-6 col-12">
                <div className="mb-3">
                  <label className="form-label">Opening</label>
                  <input
                    type="time"
                    className="form-control"
                    {...formik.getFieldProps("sundayOpening")}
                  />
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="mb-3">
                  <label className="form-label">Closing</label>
                  <input
                    type="time"
                    className="form-control"
                    {...formik.getFieldProps("sundayClosing")}
                  />
                </div>
              </div>
              </div>
            </Card.Body>
          </Card>
        </div>
        <div className="text-end mt-4 mb-3">
          <button type="submit" className="btn btn-sm btn-outline-primary">
            {loadIndicator && (
              <span
                className="spinner-border spinner-border-sm me-2"
                aria-hidden="true"
              ></span>
            )}
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default StoreHours;
