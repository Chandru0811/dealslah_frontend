import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../../../config/URL";
import toast from "react-hot-toast";
import ImageURL from "../../../config/ImageURL";
import Modal from 'react-bootstrap/Modal';

function DealCategoryView() {
    const { id } = useParams();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const [shopStatus, setShopStatus] = useState("");
    const [showModal, setShowModal] = useState(false);
    const handleOpenModal = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    const handleDeActive = async () => {
        setLoading(true);
        try {
            const response = await api.post(`admin/dealCategory/${id}/deactivate`);
            if (response.status === 200) {
                handleClose();
                getData();
                toast.success('dealCategory deactivated successfully!');
            } else {
                toast.error('Failed to deactivate dealCategory.');
            }
        } catch (error) {
            toast.error('An error occurred while deactivating the dealCategory.');
            console.error('Deactivation Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleActivate = async () => {
        setLoading(true);
        try {
            const response = await api.post(`admin/dealCategory/${id}/activate`);
            if (response.status === 200) {
                getData();
                toast.success("dealCategory activated successfully!");
            } else {
                toast.error("Failed to activate dealCategory.");
            }
        } catch (error) {
            toast.error("An error occurred while activating the dealCategory.");
            console.error("Activation Error:", error);
        } finally {
            setLoading(false);
        }
    };


    const getData = async () => {
        try {
            const response = await api.get(`admin/dealCategory/${id}`);
            setData(response.data.data);
            setShopStatus(response.data.data.active);
        } catch (error) {
            toast.error("Error Fetching Data ", error);
        }
    };

    useEffect(() => {
        getData();
    }, [id]);

    return (
        <div className="container-fluid minHeight">
            <div className="card shadow border-0 mb-3">
                <div className="row p-3">
                    <div className="d-flex justify-content-between align-items-center w-100">
                        <div>
                            <h3>View Deal Category</h3>
                        </div>
                        <div>
                            <Link to="/dealcategories">
                                <button type="button" className="btn btn-light btn-sm me-2">
                                    <span>Back</span>
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
                            ) : <></>}

                            {shopStatus == 1 ? (
                                <button
                                    onClick={handleOpenModal}
                                    className="btn btn-danger btn-sm me-2"
                                >
                                    Deactivate
                                </button>
                            ) : <></>}
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

                        {/* <div className="col-md-6 col-12">
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
                        </div> */}
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
                                <div className="col-6 d-flex justify-content-start align-items-center">
                                    <p className="text-sm">
                                        <b>Image</b>
                                    </p>
                                </div>
                                <div className="col-6 mt-3">
                                    <p className="text-muted text-sm">: <img
                                        src={`${ImageURL}${data.image_path}`}
                                        alt="Shop Logo"
                                        style={{ maxWidth: "100px", maxHeight: "100px" }}>
                                    </img>
                                    </p>
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
        </div >
    );
}

export default DealCategoryView;