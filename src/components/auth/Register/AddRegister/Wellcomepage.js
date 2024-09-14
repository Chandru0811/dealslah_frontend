import React from "react";
import { Link } from "react-router-dom";

function WelcomeWizard() {
  return (
    <section className=""style={{marginTop:"40px"}}>
      <h2
        className="d-flex justify-content-center mb-5"
        style={{ color: "#771bf8" }}
      >
        Dealslah - Deals that's Matter !
      </h2>
      <div className="wizard-container">
        <h2>Welcome to the Marketplace!</h2>
        <p>
          Thank you for choosing The Marketplace to power your online store!
          This quick setup wizard will help you configure the basic settings.{" "}
          <strong>
            It’s completely optional and shouldn’t take longer than two minutes.
          </strong>
        </p>
        <p>
          No time right now? If you don’t want to go through the wizard, you can
          skip and return to the Store!
        </p>
        <div className="button-group">
          <Link to="/vendorregistration">
            <button className="wellcome-btn">Let's Go!</button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default WelcomeWizard;
