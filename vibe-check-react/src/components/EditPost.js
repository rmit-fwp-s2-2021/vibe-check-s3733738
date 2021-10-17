import React, { useEffect, useState } from 'react';
import editIcon from '../media/editing.png';
import { Modal, Form } from 'react-bootstrap';
import { getPost, editPost } from '../data/posts';


export default function EditPost({ postid, handleEdit }) {

    // field for editing post
    const [editPostField, setEditPostField] = useState({ "text": "" });
    // display error message if post is empty 
    const [errorMessage, setErrorMessage] = useState("");

    //set Modal show state
    const [visible, setVisible] = useState(false);


    // Load Post
    useEffect(() => {
        async function loadPost() {
            const currentPost = await getPost(postid);

            setEditPostField({ "text": currentPost.text });
        }
        loadPost();
    }, [visible, postid]);


    const showModal = () => setVisible(true);

    const handleCancel = () => {
        setVisible(false);
        setErrorMessage("");
    }

    const handleInputChange = (event) => {

        setEditPostField({ "text": event.target.value });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        // check if edited field  is  empty
        if (editPostField.text === "") {
            setErrorMessage("Post cannot be empty");
            return;
        }
        //update post in db
        await editPost(editPostField, postid);
        setVisible(false);
        handleEdit();
        return;
    }



    return (
        <>
            <div className="PostEditModal">
                <img src={editIcon} className="edit-img" alt="edit-img" onClick={showModal}></img>
                <Modal show={visible}>
                    <Modal.Header>
                        <Modal.Title>Edit Post</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group className="mb-3" controlId="formContent">
                            <Form.Control as="textarea" name="content" onChange={handleInputChange} value={editPostField.text} type="text" rows={6} />
                            <span className="text-danger">{errorMessage}</span>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn btn-secondary" onClick={handleCancel} >
                            CANCEL
                        </button>
                        <button className="btn btn-warning" onClick={handleSubmit}>
                            OK
                        </button>
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    );
}