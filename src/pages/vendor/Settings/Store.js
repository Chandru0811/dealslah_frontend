import React from 'react'

function Store() {
    return (
        <section>
            <div className='container'>
                <h3 className='text-primary py-3'>Generat Settings</h3>

                <div className='row'>
                    <div className="col-md-6 col-12 mb-5 d-flex justify-content-center">
                        <label className="form-label">
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
                        <label className="form-label">
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
                        <label className="form-label">
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
                        <label className="form-label">
                            Store Phone<span className="text-danger">*</span>
                        </label>
                    </div>
                    <div className="col-md-6 col-12 mb-5">
                        <input
                            type="text"
                            className='form-control'>

                        </input>
                    </div>
                </div>
            </div>

        </section >
    )
}

export default Store