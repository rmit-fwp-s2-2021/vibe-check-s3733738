import React, { useState, useContext } from "react";
import { verifyUser } from "../data/repository";
import img from "../media/priscilla-du-preez-XkKCui44iM0-unsplash.jpeg";
import '../style/Form.css';
import { UserContext } from "../contexts/UserContext";
import { useHistory } from "react-router-dom";

function Login() {

  const [fields, setFields] = useState({ username: "", password: "" });

  const [errorMessage, setErrorMessage] = useState(null);

  const { setUserLogIn } = useContext(UserContext);

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

    event.preventDefault();

    const user = await verifyUser(fields.username, fields.password);

    if( user === null){
       // Login failed, reset password field to blank and set error message.
       setFields({ ...fields, password: "" });
       setErrorMessage("Username and / or password invalid, please try again.");
       return;
    }
      
      setUserLogIn(user);
      // Navigate to the home page.
      history.push("/");
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
