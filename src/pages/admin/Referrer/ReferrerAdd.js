import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import api from "../../../config/URL";
import fetchAllReferrerVendorWithIds from "../../List/ReferrerVendorList";
import fetchAllReferredVendorWithIds from "../../List/ReferedVendor";
import toast from "react-hot-toast";
import { FiAlertTriangle } from "react-icons/fi";

function ReferrerAdd() {
  const navigate = useNavigate();
  const [vendorvr, setVendorvr] = useState([]);
  const [referedv, setReferedv] = useState([]);
  const [loadIndicator, setLoadIndicator] = useState(false);

  const validationSchema = Yup.object({
    referrer_id: Yup.string().required("*Select a referrer name"),
    vendor_id: Yup.string().required("*Select a vendor name"),
    amount: Yup.string().required("*Amount is required"),
    commission_rate: Yup.number()
      .typeError("*Commission amount must be a number")
      .min(0, "*Commission amount cannot be negative")
      .required("*Commission amount is required")
      .test(
        "is-less-than-amount",
        "*Commission amount cannot exceed the total amount",
        function (value) {
          return value <= this.parent.amount;
        }
      ),
    date: Yup.string().required("*Date is required"),
  });

  const formik = useFormik({
    initialValues: {
      referrer_id: "",
      vendor_id: "",
      amount: "",
      referrer_name: "",
      date: "",
      referrer_number: "",
      vendor_name: "",
      commission_rate: "",
      year: "",
      month: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const selectedReferrer = vendorvr.find((v) => v.id == values.referrer_id);
      const selectedVendor = referedv.find((v) => v.id == values.vendor_id);
      const payload = {
        ...values,
        referrer_name: selectedReferrer?.name,
        referrer_number: `DLR500${selectedReferrer?.id}`,
        vendor_name: selectedVendor?.name,
      };

      delete payload.year;
      delete payload.month;

      setLoadIndicator(true);
      try {
        const response = await api.post(`admin/referrer`, payload);
        if (response.status === 200 || response.status === 201) {
          toast.success(response.data.message);
          navigate("/referrer");
        } else if (response.status === 422) {
          toast.error(response.data.message);
        }
      } catch (error) {
        if (error.response.status === 422) {
          const errors = error.response.data.errors;
          if (errors) {
            Object.keys(errors).forEach((key) => {
              errors[key].forEach((errorMsg) => {
                toast(errorMsg, {
                  icon: <FiAlertTriangle className="text-warning" />,
                });
              });
            });
          }
        } else {
          toast.error(
            error.response.data.message || "An unexpected error occurred."
          );
        }
      } finally {
        setLoadIndicator(false);
      }
    },
  });

  const handleReferrerChange = (event) => {
    const referrer = event.target.value;
    formik.setFieldValue("referrer_id", referrer);
    setReferedv([]);
    fetchReferredVendor(referrer);
  };

  const handleYearChange = (event) => {
    const year = event.target.value;
    formik.setFieldValue("year", year);
    if (formik.values.month) {
      formik.setFieldValue(
        "date",
        `${year}-${formik.values.month.padStart(2, "0")}`
      );
    }
  };

  const handleMonthChange = (event) => {
    const month = event.target.value;
    formik.setFieldValue("month", month);
    if (formik.values.year) {
      formik.setFieldValue(
        "date",
        `${formik.values.year}-${month.padStart(2, "0")}`
      );
    }
  };

  const fetchData = async () => {
    try {
      const vendorvrData = await fetchAllReferrerVendorWithIds();
      setVendorvr(vendorvrData);
    } catch (error) {
      toast.error(error);
    }
  };

  const fetchReferredVendor = async (referrer_id) => {
    try {
      const referedvendorData = await fetchAllReferredVendorWithIds(
        referrer_id
      );
      setReferedv(referedvendorData);
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const currentYear = new Date().getFullYear();
  const minDate = referedv
    .find((v) => v.id == formik.values.vendor_id)
    ?.created_at?.substring(0, 4);
  const minYear = minDate ? parseInt(minDate, 10) : 1999;
  const years = Array.from(
    { length: currentYear - minYear + 1 },
    (_, i) => minYear + i
  );

  const months = [
    { value: "1", label: "January" },
    { value: "2", label: "February" },
    { value: "3", label: "March" },
    { value: "4", label: "April" },
    { value: "5", label: "May" },
    { value: "6", label: "June" },
    { value: "7", label: "July" },
    { value: "8", label: "August" },
    { value: "9", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" },
  ];

  const filterMonths = () => {
    const selectedYear = formik.values.year;
    const maxMonth =
      selectedYear == currentYear ? new Date().getMonth() + 1 : 12;
    const minMonth =
      selectedYear == minYear && minDate
        ? parseInt(
            referedv
              .find((v) => v.id == formik.values.vendor_id)
              ?.created_at?.substring(5, 7),
            10
          )
        : 1;

    return months.filter((month) => {
      const monthNum = parseInt(month.value, 10);
      return monthNum >= minMonth && monthNum <= maxMonth;
    });
  };

  return (
    <section className="px-4">
      <form onSubmit={formik.handleSubmit}>
        <div className="card shadow border-0 mb-2 top-header">
          <div className="container-fluid py-1">
            <div className="row align-items-center">
              <div className="col">
                <h1 className="h4 ls-tight headingColor">
                  Add Referral Amount
                </h1>
              </div>
              <div className="col-auto">
                <div className="hstack gap-2 justify-content-end">
                  <Link to="/referrer">
                    <button type="button" className="btn btn-light btn-sm">
                      Back
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card shadow border-0 my-2">
          <div className="container mb-5">
            <div className="row py-4">
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  Referrer Name<span className="text-danger">*</span>
                </label>
                <select
                  aria-label="Default select example"
                  className={`form-select ${
                    formik.touched.referrer_id && formik.errors.referrer_id
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("referrer_id")}
                  onChange={handleReferrerChange}
                >
                  <option value="">Select Referrer</option>
                  {vendorvr &&
                    vendorvr.map((referrer_id) => (
                      <option key={referrer_id.id} value={referrer_id.id}>
                        {referrer_id.name} - DLR500{referrer_id.id}
                      </option>
                    ))}
                </select>
                {formik.touched.referrer_id && formik.errors.referrer_id && (
                  <div className="invalid-feedback">
                    {formik.errors.referrer_id}
                  </div>
                )}
              </div>
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  Vendor Name<span className="text-danger">*</span>
                </label>
                <select
                  aria-label="Default select example"
                  className={`form-select ${
                    formik.touched.vendor_id && formik.errors.vendor_id
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("vendor_id")}
                >
                  <option value="">Select Vendor</option>
                  {referedv &&
                    referedv.map((vendor_id) => (
                      <option key={vendor_id.id} value={vendor_id.id}>
                        {vendor_id.name}
                      </option>
                    ))}
                </select>
                {formik.touched.vendor_id && formik.errors.vendor_id && (
                  <div className="invalid-feedback">
                    {formik.errors.vendor_id}
                  </div>
                )}
              </div>
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  Date<span className="text-danger">*</span>
                </label>
                <div className="input-group">
                  <select
                    className={`form-select ${
                      formik.touched.date && formik.errors.date
                        ? "is-invalid"
                        : ""
                    }`}
                    name="year"
                    value={formik.values.year}
                    onChange={handleYearChange}
                    onBlur={formik.handleBlur}
                    style={{
                      borderTopRightRadius: 0,
                      borderBottomRightRadius: 0,
                    }}
                  >
                    <option value="">Year</option>
                    {years.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                  <select
                    className={`form-select ${
                      formik.touched.date && formik.errors.date
                        ? "is-invalid"
                        : ""
                    }`}
                    name="month"
                    value={formik.values.month}
                    onChange={handleMonthChange}
                    onBlur={formik.handleBlur}
                    disabled={!formik.values.year}
                    style={{
                      borderTopLeftRadius: 0,
                      borderBottomLeftRadius: 0,
                    }}
                  >
                    <option value="">Month</option>
                    {filterMonths().map((month) => (
                      <option key={month.value} value={month.value}>
                        {month.label}
                      </option>
                    ))}
                  </select>
                </div>
                {formik.touched.date && formik.errors.date && (
                  <div className="text-danger mt-1">{formik.errors.date}</div>
                )}
              </div>
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  Amount<span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  onInput={(event) => {
                    event.target.value = event.target.value
                      .replace(/[^0-9.]/g, "")
                      .replace(/^(\d*\.?\d{0,2}).*$/, "$1");
                  }}
                  className={`form-control ${
                    formik.touched.amount && formik.errors.amount
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("amount")}
                />
                {formik.touched.amount && formik.errors.amount && (
                  <div className="invalid-feedback">{formik.errors.amount}</div>
                )}
              </div>
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  Commission Rate<span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  onInput={(event) => {
                    event.target.value = event.target.value
                      .replace(/[^0-9.]/g, "")
                      .replace(/^(\d*\.?\d{0,2}).*$/, "$1");
                  }}
                  className={`form-control ${
                    formik.touched.commission_rate &&
                    formik.errors.commission_rate
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("commission_rate")}
                />
                {formik.touched.commission_rate &&
                  formik.errors.commission_rate && (
                    <div className="invalid-feedback">
                      {formik.errors.commission_rate}
                    </div>
                  )}
              </div>
            </div>
          </div>
          <div className="hstack p-2">
            <button
              type="submit"
              className="btn btn-sm btn-button"
              disabled={loadIndicator}
            >
              {loadIndicator && (
                <span
                  className="spinner-border spinner-border-sm me-2"
                  aria-hidden="true"
                ></span>
              )}
              Submit
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}

export default ReferrerAdd;
