import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import cat1 from "../../../assets/category5.png";
import api from "../../../config/URL";
import toast from "react-hot-toast";
import ImageURL from "../../../config/ImageURL";
import { Modal } from "react-bootstrap";

function DealCategoryView() {
    const { id } = useParams();
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const [shopStatus, setShopStatus] = useState("");
    const [loading, setLoading] = useState(false);

    const [showModal, setShowModal] = useState(false);
    const handleOpenModal = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    console.log("first", data.icon)


    const handleDeActive = async () => {
        setLoading(true);
        try {
            const response = await api.delete(`admin/dealCategory/remove/${id}`);
            if (response.status === 200) {
                // handleClose();
                getData();
                toast.success('Deal deactivated successfully!');
                navigate("/dealcategories");
            } else {
                toast.error('Failed to deactivate Deal.');
            }
        } catch (error) {
            toast.error('An error occurred while deactivating the Deal.');
            console.error('Deactivation Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleActivate = async () => {
        setLoading(true);
        try {
            const response = await api.post(`admin/deal/${id}/approve`);
            if (response.status === 200) {
                getData(); // Fetch updated data
                setShopStatus(1); // Set status to 1 (Inactive) after activation
                toast.success("Deal activated successfully!");

            } else {
                toast.error("Failed to activate Deal.");
            }
        } catch (error) {
            toast.error("An error occurred while activating the Deal.");
            console.error("Activation Error:", error);
        } finally {
            setLoading(false);
        }
    };


    const getData = async () => {
        if (id) {
            try {
                const response = await api.get(`admin/dealCategory/${id}`);
                setData(response.data.data);
            } catch (error) {
                toast.error("Error Fetching Data ", error);
            }
        }
    };
    useEffect(() => {
        getData();

    }, [id]);
    // useEffect(() => {
    //   const getData = async () => {
    //     try {
    //       const response = await api.get(`admin/categoryGroup/${id}`);
    //       formik.setValues(response.data.data);
    //     } catch (error) {
    //       toast.error("Error Fetching Data", error.message);
    //     }
    //   };
    //   getData();
    // }, [id]);
    return (
        <section className="px-4">
            <div className="container-fluid minHeight">
                <div className="card shadow border-0 mb-2 top-header">
                    <div className="container-fluid py-4">
                        <div className="row align-items-center">
                            <div className="row align-items-center">
                                <div className="col">
                                    <div className="d-flex align-items-center gap-4">
                                        <h1 className="h4 ls-tight headingColor">View Deal Category</h1>
                                    </div>
                                </div>
                                <div className="col-auto">
                                    <div className="hstack gap-2 justify-content-start">
                                        <Link to="/dealcategories">
                                            <button type="button" className="btn btn-sm btn-light">
                                                Back
                                            </button>
                                        </Link>
                                        {shopStatus == 0 ? (
                                            <button
                                                type="button"
                                                onClick={handleActivate}
                                                className="btn btn-success btn-sm me-2" disabled={loading}
                                            >
                                                {loading && (
                                                    <span
                                                        className="spinner-border spinner-border-sm me-2"
                                                        aria-hidden="true"
                                                    ></span>
                                                )}
                                                Activate
                                            </button>
                                        ) : null}

                                        {shopStatus == 1 ? (
                                            <button
                                                onClick={handleOpenModal}
                                                className="btn btn-danger btn-sm me-2"
                                            >
                                                Deactivate
                                            </button>
                                        ) : null}

                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
                <div className="card shadow border-0 my-2" style={{ height: "80vh" }}>
                    <div className="container">
                        <div className="row mt-5 p-3">
                            <div className="col-md-6 col-12">
                                <div className="row mb-3">
                                    <div className="col-6 d-flex justify-content-start align-items-center">
                                        <p className="text-sm">
                                            <b>Name</b>
                                        </p>
                                    </div>
                                    <div className="col-6">
                                        <p className="text-muted text-sm">: {data.name}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 col-12">
                                <div className="row mb-3">
                                    <div className="col-6 d-flex justify-content-start align-items-center">
                                        <p className="text-sm">
                                            <b>Slug</b>
                                        </p>
                                    </div>
                                    <div className="col-6">
                                        <p className="text-muted text-sm">: {data.slug}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-6 col-12">
                                <div className="row mb-3">
                                    <div className="col-6 d-flex justify-content-start align-items-center">
                                        <p className="text-sm">
                                            <b>Active</b>
                                        </p>
                                    </div>
                                    <div className="col-6">
                                        <p className="text-muted text-sm">:  {data.active == 0 ? 'Active' : data.active == 1 ? 'Inactive' : ''}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 col-12">
                                <div className="row mb-3">
                                    <div className="col-6 d-flex justify-content-start align-items-center">
                                        <p className="text-sm">
                                            <b>Description</b>
                                        </p>
                                    </div>
                                    <div className="col-6">
                                        <p className="text-muted text-sm">:  {data.description}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 col-12">
                                <div className="row mb-3">
                                    <div className="col-12 d-flex justify-content-start align-items-center">
                                        <p className="text-sm">
                                            <b>Image</b>
                                        </p>
                                    </div>
                                    <div className="col-12 mt-3">
                                        {/* <p> */}
                                        {/* <img
                    src={Image}
                    alt="image"
                    className="img-fluid"
                    width={150}
                  /> */}
                                        <p className="text-muted text-sm">: <img src={`${ImageURL}${data.image_path}`}
                                            alt="icon"
                                            className="img-fluid"></img></p>
                                        {/* </p> */}
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <Modal show={showModal} backdrop="static" keyboard={false} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Deactivate Shop</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to deactivate this shop?
                </Modal.Body>
                <Modal.Footer>
                    <button className='btn btn-sm btn-button' onClick={handleClose}>
                        Close
                    </button>
                    <button className='btn-sm btn-danger'
                        type="submit" onClick={handleDeActive}
                        disabled={loading}
                    >
                        {loading && (
                            <span
                                className="spinner-border spinner-border-sm me-2"
                                aria-hidden="true"
                            ></span>
                        )}
                        Deactivate
                    </button>
                </Modal.Footer>
            </Modal>
        </section>

    );
}

export default DealCategoryView;