import React, { useState } from 'react'

function Location() {
    const [locatiion, setLocation] = useState(
        
    );
    const handleSave = () => {
        console.log("Location:", locatiion);
    };
    return (
        <section>
            <div className='container'>
                <h3 className='text-primary py-3'>Store Address</h3>

                <div className='row'>
                    <div className="col-md-6 col-12 mb-5 d-flex justify-content-center">
                        <label className="form-label fw-bold">
                            Street
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
                            Street2
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
                            City/Town
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
                            Postcode/Zip
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
                            Country
                        </label>
                    </div>
                    <div className="col-md-6 col-12 mb-5">
                        <select
                            type="text"
                            className='form-select'>
                            <option selected></option>
                            <option value="india">India</option>
                            <option value="singapore">Singapore</option>
                        </select>
                    </div>
                    <div className="col-md-6 col-12 mb-5 d-flex justify-content-center">
                        <label className="form-label fw-bold">
                            State/Country
                        </label>
                    </div>
                    <div className="col-md-6 col-12 mb-5">
                        <select
                            type="text"
                            className='form-select'>
                            <option selected></option>
                            <option value="TamilNadu">TamilNadu</option>
                            <option value="Karnataka">Krnataka</option>
                        </select>
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

export default Location