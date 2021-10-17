import React, { useState , useContext } from 'react';
import Modal from 'react-bootstrap/Modal';
import { getUser, changeUserAvatar } from '../data/repository';
import { AvatarContext } from "../contexts/AvatarContext";

function AvatarChanger(props) {

    //set Modal show state
    const [visible, setVisible] = useState(false);
    //store all pics in an array 
    const [image, setImage] = useState("");

    const [loading, setLoading] = useState(false);

    const username = getUser().username;

    const { setAvatarImage } = useContext(AvatarContext);


    const handleFileUpload = async (event) => {
        const files = event.target.files;
        if (files[0]) {
            const data = new FormData();
            data.append("image", files[0]);
            setLoading(true);
            // free image hosting api
            const result = await fetch(
                "https://api.imgbb.com/1/upload?&key=46f55d39151e14d1eefd8420530fb11b",
                {
                    method: "POST",
                    body: data,
                }
            );
            const file = await result.json();
            const url = file.data.url;
            setImage(url);
            setLoading(false);

        } else {
            return;
        }
    };



    const showModal = () => setVisible(true);

    const handleOk = async() => {
        setVisible(false);
        const imagebody = {image_path: image}
        await changeUserAvatar(username, imagebody);
        setAvatarImage(image);
        return;
    }

    const handleCancel = () => setVisible(false);
 
    return (
        <>
            <div className="AvatarChanger">
                <button className="btn btn-secondary" onClick={showModal}>Change Avatar</button>
                <Modal show={visible}>
                    <Modal.Header>
                        <Modal.Title>Change Avatar</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <input type="file" name="file" onChange={handleFileUpload}></input>
                        {loading ? (
                            <p>Image uploading...</p>
                        ) : (
                            <div className="image-preview text-center my-3">
                                <img src={image} className="avatar-img rounded img-fluid" alt={image} height="100px"></img>
                            </div>
                        )}
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