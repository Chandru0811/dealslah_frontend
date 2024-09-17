import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import toast from "react-hot-toast";
import axios from "axios";

function VendorLogin({ handleVendorLogin, handleLogin }) {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          `https://sgitjobs.com/dealslah/public/api/login`,
          values
        );
        if (response.status === 200) {
          toast.success(response.data.message);

          sessionStorage.setItem("token", response.data.data.token);
          sessionStorage.setItem("name", response.data.data.userDetails.name);
          sessionStorage.setItem("id", response.data.data.userDetails.id);
          sessionStorage.setItem("email", response.data.data.userDetails.email);
          sessionStorage.setItem("role", response.data.data.userDetails.role);
          sessionStorage.setItem(
            "active",
            response.data.data.userDetails.active
          );
          navigate("/");
          if (response.data.data.userDetails.role === "1") {
            handleLogin(values);
          } else if (response.data.data.userDetails.role === "2") {
            handleVendorLogin(values);
          } else {
            toast(
              "Oops! You don't have access to this page, but feel free to check out our amazing website! 😊",
              {
                icon: "😊",
              }
            );
            setTimeout(() => {
              window.location.href = "https://ecsaio.com";
            }, 5000);
          }
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.error("error login");
      }
      handleVendorLogin(values);
    },
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div
      className="container-fluid d-flex justify-content-center align-items-center vh-100"
      style={{ backgroundColor: "#f2f2f2" }}
    >
      <div
        className="card shadow-lg p-3 mb-5 rounded"
        style={{ width: "100%", maxWidth: "400px" }}
      >
        <Link to="/" style={{ height: "25px" }}>
          <button className="btn btn-link text-start shadow-none h-0">
            <IoMdArrowBack />
          </button>
        </Link>
        <div className="d-flex justify-content-around ">
          <h3
            className={`cursor-pointer py-2`}
            style={{
              borderBottom: "2px solid #9C54FF",
              paddingBottom: "5px",
              width: "100%",
              textAlign: "center",
              color: "#771bf8",
            }}
          >
            Login
          </h3>
        </div>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group controlId="formEmail" className="mb-3 pt-4">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              {...formik.getFieldProps("email")}
              isInvalid={formik.touched.email && formik.errors.email}
            />
            {formik.touched.email && formik.errors.email ? (
              <Form.Control.Feedback type="invalid">
                {formik.errors.email}
              </Form.Control.Feedback>
            ) : null}
          </Form.Group>

          <div className="d-flex justify-content-between align-items-center py-2">
            <Form.Label>Password</Form.Label>
            <Link
              to="/forgot"
              className="ml-auto"
              style={{ fontSize: "0.9em", textDecoration: "none" }}
            >
              Forgot Password?
            </Link>
          </div>
          <Form.Group controlId="formPassword" className="mb-3">
            <div style={{ position: "relative" }}>
              <Form.Control
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                {...formik.getFieldProps("password")}
                isInvalid={formik.touched.password && formik.errors.password}
              />
              {formik.values.password && (
                <span
                  onClick={togglePasswordVisibility}
                  style={{
                    position: "absolute",
                    right: "10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                  }}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              )}
              {formik.touched.password && formik.errors.password ? (
                <Form.Control.Feedback type="invalid">
                  {formik.errors.password}
                </Form.Control.Feedback>
              ) : null}
            </div>
          </Form.Group>

          <Button type="submit" className="w-100 mt-4 common-button">
            Login
          </Button>

          <div className="text-center mt-4">
            <p className="mb-3">or</p>
            <Link to="/wellcomepage">
              <Button
                variant="light"
                className="w-100 border shadow-none"
                style={{
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                Became a Vendor
              </Button>
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default VendorLogin;
