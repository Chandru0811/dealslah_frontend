import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';

function ApprovePopup() {
    const [show, setShow] = useState(true);

    return (
        <Modal show={show} keyboard={false}>
            <Modal.Header>
                <Modal.Title>Approval Restricted</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                You cannot approve on the vendor page at the moment. Please wait or refresh the page.
            </Modal.Body>

        </Modal>
    );
}

export default ApprovePopup;
