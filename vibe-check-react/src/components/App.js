import React, { useState } from 'react';
import Navbar from './Navbar';
import Login from './Login';
import Signup from './Signup';
import Home from './Home';
import Footer from './Footer';
import MyProfile from './MyProfile';
import EditProfile from './EditProfile';
import Forum from './Forum';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import '../App.css';
import { removeUser } from '../data/repository';
import { UserContext } from '../contexts/UserContext';
import { AvatarContext } from '../contexts/AvatarContext';
import avatar from '../media/Avatar/avatar.png';

function App() {

  const [userLogIn, setUserLogIn] = useState(null);
  const [avatarImage, setAvatarImage] = useState(avatar);

  //logout function 
  const logoutUser = () => {
    removeUser();
    setUserLogIn(null);
  }

  return (

    <div className="d-flex flex-column">
      <UserContext.Provider value={{ userLogIn, logoutUser, setUserLogIn }}>
        {/* pass current user avatar to componets */}
        <AvatarContext.Provider value={{ avatarImage, setAvatarImage }}>
          <Router>
            <Navbar />
            <main className="main min-vh-100">
              <div className="container-fluid my-3 p-3 ">
                <Switch>
                  {/* to pass down the history props to Login component */}
                  <Route path="/signup">
                    <Signup />
                  </Route>
                  <Route path="/login">
                    <Login />
                  </Route>
                  <Route path="/profile" >
                    <MyProfile />
                  </Route>
                  <Route path="/editProfile" >
                    <EditProfile />
                  </Route>
                  <Route path="/forum">
                    <Forum />
                  </Route>
                  <Route path="/">
                    <Home />
                  </Route>
                </Switch>
                <Footer />
              </div>
            </main>
          </Router>
        </AvatarContext.Provider >
      </UserContext.Provider>
    </div>

  );
}

export default App;
