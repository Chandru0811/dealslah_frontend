import React, { useState } from 'react'
import {
    FaBold, FaItalic, FaQuoteRight, FaAlignLeft,
    FaAlignCenter, FaAlignRight, FaListUl, FaListOl,
    FaLink, FaGripLines, FaThList,
} from "react-icons/fa";
import { Button } from "react-bootstrap";

function Store() {
    const [store, setStore] = useState(
        
    );
    const handleSave = () => {
        console.log("Store:", store);
    };
    return (
        <section>
            <div className='container'>
                <h3 className='text-primary py-3'>Generat Settings</h3>

                <div className='row'>
                    <div className="col-md-6 col-12 mb-5 d-flex justify-content-center">
                        <label className="form-label fw-bold">
                            Store Name<span className="text-danger">*</span>
                        </label>
                    </div>
                    <div className="col-md-6 col-12 mb-5">
                        <input
                            type="text"
                            className='form-control'>

                        </input>
                    </div>
                    <div className="col-md-6 col-12 mb-5 d-flex justify-content-center">
                        <label className="form-label fw-bold">
                            Store Slug<span className="text-danger">*</span>
                        </label>
                    </div>
                    <div className="col-md-6 col-12 mb-5">
                        <input
                            type="text"
                            className='form-control'>

                        </input>
                    </div>
                    <div className="col-md-6 col-12 mb-5 d-flex justify-content-center">
                        <label className="form-label fw-bold">
                            Store Email<span className="text-danger">*</span>
                        </label>
                    </div>
                    <div className="col-md-6 col-12 mb-5">
                        <input
                            type="text"
                            className='form-control'>

                        </input>
                    </div>
                    <div className="col-md-6 col-12 mb-5 d-flex justify-content-center">
                        <label className="form-label fw-bold">
                            Store Phone<span className="text-danger">*</span>
                        </label>
                    </div>
                    <div className="col-md-6 col-12 mb-5">
                        <input
                            type="text"
                            className='form-control'>

                        </input>
                    </div>

                    <h3 className='text-primary py-3'>Store Brand Setup</h3>
                    <div className="col-md-6 col-12 mb-5 d-flex justify-content-center">
                        <label className="form-label fw-bold">
                            Store Shop Type<span className="text-danger">*</span>
                        </label>
                    </div>
                    <div className="col-md-6 col-12 mb-5">
                        <select
                            type="text"
                            className='form-select'>
                            <option selected></option>
                            <option value="Servicebased">Service based</option>
                            <option value="Productbased">Product based</option>
                        </select>
                    </div>
                    <div className="col-md-6 col-12 mb-5 d-flex justify-content-center">
                        <label className="form-label fw-bold">
                            Store Logo<span className="text-danger">*</span>
                        </label>
                    </div>
                    <div className="col-md-6 col-12 mb-5">
                        <input
                            type="file"
                            className='form-control'>

                        </input>
                    </div>
                    <div className="col-md-6 col-12 mb-5 d-flex justify-content-center">
                        <label className="form-label fw-bold">
                            Store Banner Type<span className="text-danger">*</span>
                        </label>
                    </div>
                    <div className="col-md-6 col-12 mb-5">
                        <select
                            type="text"
                            className='form-select'>
                            <option selected></option>
                            <option value="LogoIamge">Logo Iamge</option>
                            <option value="StaticImage">Static Image</option>
                        </select>
                    </div>
                    <div className="col-md-6 col-12 mb-5 d-flex justify-content-center">
                        <label className="form-label fw-bold">
                            Store Bannenr
                        </label>
                    </div>
                    <div className="col-md-6 col-12 mb-5">
                        <input
                            type="file"
                            className='form-control'>
                        </input>
                    </div>

                    <div className="mb-3">
                        <h5 className="mb-4 fw-bold">Shop Description</h5>
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
            <div className="text-end mt-4 mb-3">
                <button onClick={handleSave} className="btn btn-sm btn-outline-primary" >
                    Save
                </button>
            </div>
        </section >
    )
}

export default Store