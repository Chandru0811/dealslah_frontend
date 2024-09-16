import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function SignIn({ handleLogin }) {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values) => {
      console.log("SignIn Values:", values);
      // handleLogin(values);
      // navigate('/')
      const payload = {
        ...values,
        password: parseInt(values.password),
      };
      try {
        const response = await axios.post(
          `https://sgitjobs.com/dealslah/public/api/login`,
          payload,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.status === 200) {
          handleLogin(values);
          navigate("/")
        } else {
          console.error(response.data.message);
        }
      } catch (error) {
        console.error("error login");
      }
    },
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto" }}>
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
          SIGN IN
        </Button>

        {/* <div className="text-center mt-4">
          <p className="mb-3">or</p>

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
            <div
              style={{
                position: "absolute",
                left: "15px",
              }}
            >
              <FcGoogle />
            </div>
            Sign In with Google
          </Button>
        </div> */}
      </Form>
    </div>
  );
}

export default SignIn;
