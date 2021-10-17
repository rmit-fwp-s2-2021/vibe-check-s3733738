import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../data/repository'
import '../style/MyProfile.css';
import DeleteAcc from './DeleteAcc';
import Following from './FollowingList';
import AvatarChanger from './AvatarChanger';
import { AvatarContext } from "../contexts/AvatarContext";
import Pic1 from '../media/Avatar/ben-parker-OhKElOkQ3RE-unsplash.jpeg';
import Pic2 from '../media/Avatar/luis-villasmil-6qf1uljGpU4-unsplash.jpeg';
import Pic3 from '../media/Avatar/sarah-brown-tTdC88_6a_I-unsplash.jpeg';
import Pic4 from '../media/Avatar/zhanarys-dakhiyev-WMlRkqt1vII-unsplash.jpeg';

function MyProfile() {

    // use AvatarContext to change display avatar image 
   const { avatarImage } = useContext(AvatarContext);


    return (
        <>
            <div className="row">
                <div className="col-1"></div>
                <div className="col-6 border my-3 p-3 d-flex-column justify-content-center text-center align-content-center bg-light">
                    <h2>My Profile</h2>
                    <img src={avatarImage} alt="Avatar" width="80px" height="80px" className="avatar my-3" />
                    <h3> {getUser().username} </h3>
                    <div className="user-info">
                        <p> {getUser().email}</p>
                        <p> {getUser().date}</p>
                    </div>
                    <AvatarChanger handleAvatarChange="" pic1={Pic1} pic2={Pic2} pic3={Pic3} pic4={Pic4} />
                    <div className="edit-column my-3">
                        <Link className="edit profile" to="/editProfile">Edit profile </Link>
                    </div>
                    <DeleteAcc />

                </div>
                    <Following/>
           
            </div>
        </>
    )
};


export default MyProfile;


