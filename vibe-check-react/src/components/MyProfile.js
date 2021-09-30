import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
// import DeletePost from './DeletePost';
import { getUser } from '../data/repository';
// import { getPosts, editPost } from '../data/posts';
import '../style/MyProfile.css';
import DeleteAcc from './DeleteAcc';
import EditProfile from './EditProfile';
import AvatarChanger from './AvatarChanger';
import { AvatarContext } from "../contexts/AvatarContext";
//import edit from '../media/editing.png';
import Pic1 from '../media/Avatar/ben-parker-OhKElOkQ3RE-unsplash.jpeg';
import Pic2 from '../media/Avatar/luis-villasmil-6qf1uljGpU4-unsplash.jpeg';
import Pic3 from '../media/Avatar/sarah-brown-tTdC88_6a_I-unsplash.jpeg';
import Pic4 from '../media/Avatar/zhanarys-dakhiyev-WMlRkqt1vII-unsplash.jpeg';

function MyProfile() {

    //const [posts, setPosts] = useState(getPosts());

    //const [postField, setPostField] = useState("");

    // use AvatarContext to change display avatar image 
   const { avatarImage, setAvatarImage } = useContext(AvatarContext);


    // handle  avatar image change
    // const handleAvatarChange = (avatarImage) => {
    //     setAvatarImage(avatarImage);
    //     const user = {...getUser(), profileImg: avatarImage};
    //      editUser(user);

    // }   

 

    return (
        <>
            <div className="row">
                <div className="col-xl my-3 p-3 d-flex-column justify-content-center text-center align-content-center">
                    <h2>My Profile</h2>
                    <hr />
                    <img src={avatarImage} alt="Avatar" className="avatar my-3" />
                    <h3> {getUser().username} </h3>
                    <div className="user-info">
                        <p> {getUser().email}</p>
                        <p> {getUser().date}</p>
                    </div>
                    <AvatarChanger handleAvatarChange="" pic1={Pic1} pic2={Pic2} pic3={Pic3} pic4={Pic4} />
                    <div className="edit-column my-3">
                        <Link className="edit profile" to="/editProfile">Edit profile </Link>
                    </div>
                    {/* <EditProfile />
                     */}

                    <DeleteAcc />

                    {/* {
                        show === false &&

                        <div className="my-3 p-3">
                            <form onSubmit={handleSubmit}>
                                <h2>Edit Post</h2>
                                <fieldset>
                                    <div className="form-group">
                                        <textarea id="post" className="form-control" rows="3"
                                            value={postField} onChange={handleInputChange} />
                                    </div>
                                    {errorMessage !== null &&
                                        <div className="form-group">
                                            <span className="text-danger">{errorMessage}</span>
                                        </div>
                                    }
                                    <div className="form-group">
                                        <input type="submit" className="btn btn-primary" value="Save Changes" />
                                    </div>
                                </fieldset>
                            </form>
                        </div>

                    } */}

                    {/* <div>
                       
                        {postMapper}

                    </div> */}
                </div>
            </div>
        </>
    )
};


export default MyProfile;


