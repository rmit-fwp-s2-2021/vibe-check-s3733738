import bin from '../media/bin.png';
import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import '../style/MyProfile.css';
import { deletePost } from '../data/posts';
import '../style/Forum.css';
import { useHistory } from "react-router-dom";

function DeletePost({ postid, handleDelete }) {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    const handleShow = () => setShow(true);

    const history = useHistory();

    const handleCloseAndConfirm = async () => {

        //   delete post from database
        await deletePost(postid);
        //   change show  modal state
        setShow(false);

        handleDelete();

        history.push("/forum");

        return;
    }

    return (
        <>

            <img src={bin} className="bin-img" alt="bin-img" onClick={handleShow}></img>

            <Modal show={show} onHide={handleClose} animation={false} centered="true">
                <Modal.Header closeButton>
                    <Modal.Title>Delete Post</Modal.Title>
                </Modal.Header>
                <Modal.Body>Confirm to delete this post?</Modal.Body>
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

export default DeletePost;
