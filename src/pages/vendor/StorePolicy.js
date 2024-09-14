import React from "react";
import {
  FaBold,
  FaItalic,
  FaQuoteRight,
  FaAlignLeft,
  FaAlignCenter,
  FaAlignRight,
  FaListUl,
  FaListOl,
  FaLink,
  FaGripLines,
  FaThList,
} from "react-icons/fa";
import { Button } from "react-bootstrap";

function StorePolicy() {
  return (
    <div className="row m-0">
      <div className="col-md-3 col-12"></div>
      <div className="col-md-9 col-12 ">
        <h3 className="text-primary mb-4">Policies Setting</h3>

        <div className="form-group mb-3 d-flex justify-content-between ">
          <label htmlFor="policyTabLabel" className="fw-bold">
            Policy Tab Label
          </label>
          <textarea
            type="text"
            className="form-control w-50"
            id="policyTabLabel"
          />
        </div>

        <div className="mb-3">
          <h5 className="mb-4">Shipping Policy</h5>
          <Button variant="outline-primary" className="me-2">
            Add Media
          </Button>
        </div>
        <div className="toolbar align-items-center mb-3 p-2 border">
          <div className="row align-items-center">
            <div className="col-md-4 col-12 mb-3">
              <select className="form-select me-2">
                <option>Paragraph</option>
                <option>Heading 1</option>
                <option>Heading 2</option>
                <option>Heading 3</option>
              </select>
            </div>
            <div className="col-md-4 col-12">
              {" "}
              <Button variant="outline-secondary" className="me-2">
                <FaBold />
              </Button>
            </div>
            <div className="col-md-4 col-12">
              {" "}
              <Button variant="outline-secondary" className="me-2">
                <FaItalic />
              </Button>
            </div>
            <div className="col-md-4 col-12 mb-3">
              {" "}
              <Button variant="outline-secondary" className="me-2">
                <FaQuoteRight />
              </Button>
            </div>
            <div className="col-md-4 col-12">
              {" "}
              <Button variant="outline-secondary" className="me-2">
                <FaAlignLeft />
              </Button>
            </div>
            <div className="col-md-4 col-12">
              {" "}
              <Button variant="outline-secondary" className="me-2">
                <FaAlignCenter />
              </Button>
            </div>
            <div className="col-md-4 col-12">
              {" "}
              <Button variant="outline-secondary" className="me-2">
                <FaAlignRight />
              </Button>
            </div>
            <div className="col-md-4 col-12">
              {" "}
              <Button variant="outline-secondary" className="me-2">
                <FaListUl />
              </Button>
            </div>
            <div className="col-md-4 col-12 mb-4">
              {" "}
              <Button variant="outline-secondary" className="me-2">
                <FaListOl />
              </Button>
            </div>
            <div className="col-md-4 col-12 mb-4">
              <Button variant="outline-secondary" className="me-2">
                <FaLink />
              </Button>
            </div>
            <div className="col-md-4 col-12 mb-4">
              <Button variant="outline-secondary" className="me-2">
                <FaGripLines />
              </Button>
            </div>
            <div className="col-md-4 col-12 mb-4">
              <Button variant="outline-secondary" className="me-2">
                <FaThList />
              </Button>
            </div>
            <div className="col-12">
              <textarea
                className="form-control"
                id="shippingPolicy"
                rows="5"
                placeholder="Enter your shipping policy..."
              ></textarea>
            </div>
          </div>
        </div>
        <div className="mb-3">
          <h5 className="mb-4">Refund Policy</h5>
          <Button variant="outline-primary" className="me-2">
            Add Media
          </Button>
        </div>
        <div className="toolbar align-items-center mb-3 p-2 border">
          <div className="row align-items-center">
            <div className="col-md-4 col-12 mb-3">
              <select className="form-select me-2">
                <option>Paragraph</option>
                <option>Heading 1</option>
                <option>Heading 2</option>
                <option>Heading 3</option>
              </select>
            </div>
            <div className="col-md-4 col-12">
              {" "}
              <Button variant="outline-secondary" className="me-2">
                <FaBold />
              </Button>
            </div>
            <div className="col-md-4 col-12">
              {" "}
              <Button variant="outline-secondary" className="me-2">
                <FaItalic />
              </Button>
            </div>
            <div className="col-md-4 col-12 mb-3">
              {" "}
              <Button variant="outline-secondary" className="me-2">
                <FaQuoteRight />
              </Button>
            </div>
            <div className="col-md-4 col-12">
              {" "}
              <Button variant="outline-secondary" className="me-2">
                <FaAlignLeft />
              </Button>
            </div>
            <div className="col-md-4 col-12">
              {" "}
              <Button variant="outline-secondary" className="me-2">
                <FaAlignCenter />
              </Button>
            </div>
            <div className="col-md-4 col-12">
              {" "}
              <Button variant="outline-secondary" className="me-2">
                <FaAlignRight />
              </Button>
            </div>
            <div className="col-md-4 col-12">
              {" "}
              <Button variant="outline-secondary" className="me-2">
                <FaListUl />
              </Button>
            </div>
            <div className="col-md-4 col-12 mb-4">
              {" "}
              <Button variant="outline-secondary" className="me-2">
                <FaListOl />
              </Button>
            </div>
            <div className="col-md-4 col-12 mb-4">
              <Button variant="outline-secondary" className="me-2">
                <FaLink />
              </Button>
            </div>
            <div className="col-md-4 col-12 mb-4">
              <Button variant="outline-secondary" className="me-2">
                <FaGripLines />
              </Button>
            </div>
            <div className="col-md-4 col-12 mb-4">
              <Button variant="outline-secondary" className="me-2">
                <FaThList />
              </Button>
            </div>
            <div className="col-12">
              <textarea
                className="form-control"
                id="shippingPolicy"
                rows="5"
                placeholder="Enter your shipping policy..."
              ></textarea>
            </div>
          </div>
        </div>
        <div className="mb-3">
          <h5 className="mb-4">Cancellation/Return/Exchange Policy</h5>
          <Button variant="outline-primary" className="me-2">
            Add Media
          </Button>
        </div>
        <div className="toolbar align-items-center mb-3 p-2 border">
          <div className="row align-items-center">
            <div className="col-md-4 col-12 mb-3">
              <select className="form-select me-2">
                <option>Paragraph</option>
                <option>Heading 1</option>
                <option>Heading 2</option>
                <option>Heading 3</option>
              </select>
            </div>
            <div className="col-md-4 col-12">
              {" "}
              <Button variant="outline-secondary" className="me-2">
                <FaBold />
              </Button>
            </div>
            <div className="col-md-4 col-12">
              {" "}
              <Button variant="outline-secondary" className="me-2">
                <FaItalic />
              </Button>
            </div>
            <div className="col-md-4 col-12 mb-3">
              {" "}
              <Button variant="outline-secondary" className="me-2">
                <FaQuoteRight />
              </Button>
            </div>
            <div className="col-md-4 col-12">
              {" "}
              <Button variant="outline-secondary" className="me-2">
                <FaAlignLeft />
              </Button>
            </div>
            <div className="col-md-4 col-12">
              {" "}
              <Button variant="outline-secondary" className="me-2">
                <FaAlignCenter />
              </Button>
            </div>
            <div className="col-md-4 col-12">
              {" "}
              <Button variant="outline-secondary" className="me-2">
                <FaAlignRight />
              </Button>
            </div>
            <div className="col-md-4 col-12">
              {" "}
              <Button variant="outline-secondary" className="me-2">
                <FaListUl />
              </Button>
            </div>
            <div className="col-md-4 col-12 mb-4">
              {" "}
              <Button variant="outline-secondary" className="me-2">
                <FaListOl />
              </Button>
            </div>
            <div className="col-md-4 col-12 mb-4">
              <Button variant="outline-secondary" className="me-2">
                <FaLink />
              </Button>
            </div>
            <div className="col-md-4 col-12 mb-4">
              <Button variant="outline-secondary" className="me-2">
                <FaGripLines />
              </Button>
            </div>
            <div className="col-md-4 col-12 mb-4">
              <Button variant="outline-secondary" className="me-2">
                <FaThList />
              </Button>
            </div>
            <div className="col-12">
              <textarea
                className="form-control"
                id="shippingPolicy"
                rows="5"
                placeholder="Enter your shipping policy..."
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StorePolicy;
