import bin from '../media/bin.png';
import React, { useState, useContext } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useHistory } from "react-router-dom";
import '../style/MyProfile.css';
import { deleteUser, getUser } from '../data/repository';
import { UserContext } from '../contexts/UserContext';
//import { deleteAllPostByUser } from '../data/posts';


function DeleteAcc() {
    
    const history = useHistory();
    // Delete Acc opt to logout user after delete the user
    const { logoutUser } = useContext(UserContext);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    const handleShow = () => setShow(true);

    const handleCloseAndConfirm = () => {
        
        const user = getUser();
        //remove user key in local storage
        deleteUser(user.username);
        //remove all post belongs to user
        //deleteAllPostByUser(user.email);
        //logout and return to login page
        logoutUser();
        history.push("/login");
        return;

    }

    return (
        <>
            <img src={bin} className="bin-img" alt="bin-img" onClick={handleShow}></img>

            <Modal show={show} onHide={handleClose} animation={false} centered="true">
                <Modal.Header closeButton>
                    <Modal.Title>Delete Account</Modal.Title>
                </Modal.Header>
                <Modal.Body>Confirm to delete your account?</Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-secondary" onClick={handleClose}>
                        CANCEL
                    </button>
                    <button className="btn btn-warning" onClick={handleCloseAndConfirm}>
                        CONFIRM
                    </button>
                </Modal.Footer>
            </Modal>

        </>


    );
}

export default DeleteAcc;
