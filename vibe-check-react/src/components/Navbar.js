import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../data/repository';
import '../style/Navbar.css';
import { UserContext } from '../contexts/UserContext';
import profileIcon from '../media/profile.png';

function Navbar() {

    //  Navbar is opting-in to view and mutate userLogIn state 
    const { userLogIn, logoutUser } = useContext(UserContext);

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo" >
                    vibe čheck
                </Link>
                <ul className='nav-menu pull-right align-item-center'>
                    {
                        userLogIn !== null && getUser() !== null ?
                            <>

                                <li className="nav-item pt-2">

                                    <Link className="nav-links" to={`/profile/${getUser().username}`}>
                                        <img src={profileIcon} className="profile-img" alt="edit-img" width="35px" height="35x"></img>
                                    </Link>
                                </li>
                                <li className="nav-item pt-2">
                                    <Link className="nav-links" to="/forum">
                                        Forum
                                    </Link>
                                </li>

                                <li className="nav-item">
                                    <Link className="nav-button" to="/login" id='logout' onClick={logoutUser} >
                                        Logout
                                    </Link>
                                </li>


                            </>
                            :
                            <>
                                <li className='nav-item'>
                                    <Link to='/login' className='nav-button' id='login'>
                                        Login
                                    </Link>
                                </li>
                                <li className='nav-item'>
                                    <Link to='/signup' className='nav-button' id='signup'>
                                        Sign Up
                                    </Link>
                                </li>
                            </>

                    }

                </ul>
            </div>
        </nav>
    )
}

export default Navbar;
