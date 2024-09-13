import React, { useState } from "react";
import { Step, StepLabel, Stepper } from "@mui/material";
import Form1 from "./Register/AddRegister/Form1";
import Form2 from "./Register/AddRegister/Form2";
import { Link } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";

const steps = ["", ""];

export default function VendorRegistration() {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({});
  const childRef = React.useRef();

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleButtonClick = () => {
    switch (activeStep.toString()) {
      case "0":
        if (childRef.current) {
          childRef.current.form1();
        }
        break;
      case "1":
        if (childRef.current) {
          childRef.current.form2();
        }
        break;
      default:
        break;
    }
  };

  return (
    <div
      className="container-fluid minHeight d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="container">
        <h2
          className="d-flex justify-content-center"
          style={{ color: "#771bf8" }}
        >
         Registration
        </h2>
        <Stepper className="mt-5" activeStep={activeStep} alternativeLabel>
          {steps.map((step, index) => (
            <Step key={index}>
              <StepLabel></StepLabel>
            </Step>
          ))}
        </Stepper>
        <div
          className="container-fluid card shadow border-0 mb-4 d-flex justify-content-center align-items-center"
          style={{ minHeight: "70vh" }}
        >
          <React.Fragment>
            {activeStep === 0 && (
              <Form1
                formData={formData}
                ref={childRef}
                setFormData={setFormData}
                handleNext={handleNext}
              />
            )}
            {activeStep === 1 && (
              <Form2
                formData={formData}
                ref={childRef}
                setFormData={setFormData}
                handleNext={handleNext}
              />
            )}
            <div className="container-fluid p-1 d-flex align-items-center justify-content-between">
              <Link to="/vendorLogin">
                <button
                  type="button"
                  onClick={handleButtonClick}
                  className="btn border-danger text-danger btn-sm mb-3"
                >
                 <IoMdArrowBack /> Login
                </button>
              </Link>

              <button
                type="submit"
                onClick={handleButtonClick}
                className="btn btn-button btn-sm mb-3"
              >
                {activeStep === steps.length - 1 ? "Submit" : "Save & Next"}
              </button>
            </div>
          </React.Fragment>
        </div>
      </div>
    </div>
  );
}
