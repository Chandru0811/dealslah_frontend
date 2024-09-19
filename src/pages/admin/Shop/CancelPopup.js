import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import api from '../../../config/URL';
import toast from 'react-hot-toast';

function CancelPopup({ show, handleClose, id }) {
    const handleDeActive = async () => {
        try {
            const response = await api.post(`admin/shop/${id}/deactivate`);

            if (response.status === 200) {
                toast.success('Shop deactivated successfully!');
                handleClose();
            } else {
                toast.error('Failed to deactivate shop.');
            }
        } catch (error) {
            toast.error('An error occurred while deactivating the shop.');
            console.error('Deactivation Error:', error);
        }
    };

    return (
        <Modal show={show} backdrop="static" keyboard={false} onHide={handleClose}>
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
                <button className='btn btn-sm btn-button' onClick={handleDeActive}>
                    Deactivate
                </button>
            </Modal.Footer>
        </Modal>
    );
}

export default CancelPopup;