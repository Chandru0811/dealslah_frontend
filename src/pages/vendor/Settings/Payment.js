import React, { useState } from 'react'

function Payment() {
    const [payment, setStore] = useState(

    );
    const handleSave = () => {
        console.log("Payment:", payment);
    };
    return (
        <section>
            <div className='container'>
                <div className='row'>
                    <div className="col-md-6 col-12 mb-5 d-flex justify-content-center">
                        <label className="form-labe fw-bold">
                            Preferred Payment Method
                        </label>
                    </div>
                    <div className="col-md-6 col-12 mb-5">
                        <select
                            type="text"
                            className='form-select'>
                            <option selected></option>
                            <option value="Paypal">Pay Pal</option>
                            <option value="Upi">UPI</option>
                        </select>
                    </div>
                    <div className="col-md-6 col-12 mb-5 d-flex justify-content-center">
                        <label className="form-label fw-bold">
                            Paypal Email
                        </label>
                    </div>
                    <div className="col-md-6 co
                    l-12 mb-5">
                        <input
                            type="text"
                            className='form-control'>

                        </input>
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

export default Payment