import React, { useState, useContext } from "react";
import { Link } from 'react-router-dom';
import { verifyUser, findUser } from "../data/repository";
import img from "../media/priscilla-du-preez-XkKCui44iM0-unsplash.jpeg";
import '../style/Form.css';
import { UserContext } from "../contexts/UserContext";
import { useHistory } from "react-router-dom";
import { AvatarContext } from "../contexts/AvatarContext";
import sanitize from 'sanitize-html';


function Login() {

  const [fields, setFields] = useState({ username: "", password: "" });

  const [errorMessage, setErrorMessage] = useState(null);

  const { setUserLogIn } = useContext(UserContext);

  const { setAvatarImage } = useContext(AvatarContext);

  const history = useHistory();

  // Generic change handler.
  const handleInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    const temp = { ...fields };
    temp[name] = value;
    setFields(temp);
  }

  const handleSubmit = async (event) => {
    // stop page from refreshing
    event.preventDefault();

    const sanitizedUsername = sanitize(fields.username);

    // vertfiy user with API endpoint
    const user = await verifyUser(sanitizedUsername, fields.password);

    if (user === null) {
      // Login failed, reset password field to blank and set error message.
      setFields({ ...fields, password: "" });
      setErrorMessage("Username and / or password invalid, please try again.");
      return;
    }

    const loginUser = await findUser(fields.username);

    setAvatarImage(loginUser.image_path);

    setUserLogIn(user);
    // Navigate to the forum
    history.push("/forum");
    return;

  }


  return (
    <div>
      <div className="row">
        <div className="col-md-6">
          <form onSubmit={handleSubmit} className="form">
            <h2>Log In</h2>
            <div className="form-group">
              <label htmlFor="username" className="control-label">Username</label>
              <input name="username" id="username" className="form-control"
                value={fields.username} onChange={handleInputChange} />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="control-label">Password</label>
              <input type="password" name="password" id="password" className="form-control"
                value={fields.password} onChange={handleInputChange} />
            </div>
            <div className="form-group text-center">
              <input type="submit" className="btn btn-lg" value="Login" />
            </div>
            {errorMessage != null &&
              <div className="form-group text-center">
                <span className="text-danger">{errorMessage}</span>
              </div>
            }
            <div className="form-group mt-4 text-center">
              <p>
                Don't have an account?{" "}
                <Link to="/register"> Create account</Link>
              </p>
            </div>
          </form>
        </div>
        <div className="col-xl p-0">
          <img className="img" src={img} alt="img" width="100%" height="100%" />
        </div>
      </div>
    </div>
  );
}


export default Login;
