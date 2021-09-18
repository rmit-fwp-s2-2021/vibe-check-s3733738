import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';

function AvatarChanger(props) {

    //set Modal show state
    const [visible, setVisible] = useState(false);
    //store all pics in an array 
    const imagesArray = [props.pic1, props.pic2, props.pic3, props.pic4];

    const showModal = () => setVisible(true);

    const handleOk = () => {
        setVisible(false);
    }

    const handleCancel = () => setVisible(false);
    //loop through imagesArray and return img
    const imageMapper = imagesArray.map((image) => {
        return (
            <img src={image} alt="img" onClick={() => props.handleAvatarChange(image)} height="48px"></img>
        )
    })

    return (
        <>
            <div className="AvatarChanger">
                <button className="btn btn-secondary" onClick={showModal}>Change Avatar</button>
                <Modal show={visible}>
                    <Modal.Header>
                        <Modal.Title>Change Avatar</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {imageMapper}
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn btn-secondary" onClick={handleCancel} >
                            CANCEL
                        </button>
                        <button className="btn btn-warning" onClick={handleOk}>
                            OK
                        </button>
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    );
}

export default AvatarChanger;