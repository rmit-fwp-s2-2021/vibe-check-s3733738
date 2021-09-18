import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../data/repository';
import '../style/Navbar.css';
import { UserContext } from '../contexts/UserContext';
import { AvatarContext } from '../contexts/AvatarContext';

function Navbar() {

    //  Navbar is opting-in to view and mutate userLogIn state 
    const { userLogIn, logoutUser } = useContext(UserContext);
    // update avatar image display on navbar
    const { avatarImage } = useContext(AvatarContext);


    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo" >
                    vibe čheck
                </Link>
                <ul className='nav-menu pull-right'>
                    {
                        userLogIn !== null ?
                            <>
                                <li className="nav-item">
                                    <Link className="nav-links" to="/forum">
                                        Forum
                                    </Link>
                                </li>

                                <li className="nav-item">

                                    <Link to='/profile' className='nav-links'>
                                        {getUser().username}
                                    </Link>
                                    <p>{getUser().email}</p>
                                    <p> Joined since: {getUser().date}</p>

                                </li>
                                <li><img src={avatarImage} alt="Avatar" className="avatar" /></li>
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
