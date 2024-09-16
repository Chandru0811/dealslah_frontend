import React from "react";
import { Card } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from 'yup';

const validationSchema = Yup.object({
  mondayOpening: Yup.string().notRequired('Opening time'),
  mondayClosing: Yup.string().notRequired('Closing time'),

  tuesdayOpening: Yup.string().notRequired('Opening time'),
  tuesdayClosing: Yup.string().notRequired('Closing time'),

  wednesdayOpening: Yup.string().notRequired('Opening time'),
  wednesdayClosing: Yup.string().notRequired('Closing time'),

  thursdayOpening: Yup.string().notRequired('Opening time'),
  thursdayClosing: Yup.string().notRequired('Closing time'),

  fridayOpening: Yup.string().notRequired('Opening time'),
  fridayClosing: Yup.string().notRequired('Closing time'),

  saturdayOpening: Yup.string().notRequired('Opening time'),
  saturdayClosing: Yup.string().notRequired('Closing time'),

  sundayOpening: Yup.string().notRequired('Opening time'),
  sundayClosing: Yup.string().notRequired('Closing time'),
});

function StoreHours() {

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
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("Store Hours Data:", values);
    },
  });

  return (
    <div className="container mt-4">
      <h4 className="text-primary my-5">Daily Basis Opening & Closing Hours</h4>
      <form onSubmit={formik.handleSubmit} className="w-100">
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
                    {formik.touched.mondayOpening && formik.errors.mondayOpening && (
                      <div className="error text-danger">
                        <small>{formik.errors.mondayOpening}</small>
                      </div>
                    )}
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
                    {formik.touched.mondayClosing && formik.errors.mondayClosing && (
                      <div className="error text-danger">
                        <small>{formik.errors.mondayClosing}</small>
                      </div>
                    )}
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
                    {formik.touched.tuesdayOpening && formik.errors.tuesdayOpening && (
                      <div className="error text-danger">
                        <small>{formik.errors.tuesdayOpening}</small>
                      </div>
                    )}
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
                    {formik.touched.tuesdayClosing && formik.errors.tuesdayClosing && (
                      <div className="error text-danger">
                        <small>{formik.errors.tuesdayClosing}</small>
                      </div>
                    )}
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
                    {formik.touched.wednesdayOpening && formik.errors.wednesdayOpening && (
                      <div className="error text-danger">
                        <small>{formik.errors.wednesdayOpening}</small>
                      </div>
                    )}
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
                    {formik.touched.wednesdayClosing && formik.errors.wednesdayClosing && (
                      <div className="error text-danger">
                        <small>{formik.errors.wednesdayClosing}</small>
                      </div>
                    )}
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
                    {formik.touched.thursdayOpening && formik.errors.thursdayOpening && (
                      <div className="error text-danger">
                        <small>{formik.errors.thursdayOpening}</small>
                      </div>
                    )}
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
                    {formik.touched.thursdayClosing && formik.errors.thursdayClosing && (
                      <div className="error text-danger">
                        <small>{formik.errors.thursdayClosing}</small>
                      </div>
                    )}
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
                    {formik.touched.fridayOpening && formik.errors.fridayOpening && (
                      <div className="error text-danger">
                        <small>{formik.errors.fridayOpening}</small>
                      </div>
                    )}
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
                    {formik.touched.fridayClosing && formik.errors.fridayClosing && (
                      <div className="error text-danger">
                        <small>{formik.errors.fridayClosing}</small>
                      </div>
                    )}
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
                    {formik.touched.saturdayOpening && formik.errors.saturdayOpening && (
                      <div className="error text-danger">
                        <small>{formik.errors.saturdayOpening}</small>
                      </div>
                    )}
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
                    {formik.touched.saturdayClosing && formik.errors.saturdayClosing && (
                      <div className="error text-danger">
                        <small>{formik.errors.saturdayClosing}</small>
                      </div>
                    )}
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
                    {formik.touched.sundayOpening && formik.errors.sundayOpening && (
                      <div className="error text-danger">
                        <small>{formik.errors.sundayOpening}</small>
                      </div>
                    )}
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
                    {formik.touched.sundayClosing && formik.errors.sundayClosing && (
                      <div className="error text-danger">
                        <small>{formik.errors.sundayClosing}</small>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </div>
        <div className="text-end mt-4 mb-3">
          <div className="text-end mt-4 mb-3">
            <button
              type="submit"
              className="btn btn-sm btn-outline-primary"
            // disabled={loadIndicator}
            >
              {/* {loadIndicator && (
                            <span
                                className="spinner-border spinner-border-sm me-2"
                                aria-hidden="true"
                            ></span>
                        )} */}
              Update
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default StoreHours;
