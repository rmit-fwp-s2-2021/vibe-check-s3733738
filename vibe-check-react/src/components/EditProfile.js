import React, { useContext, useState } from 'react'
import { UserContext } from '../contexts/UserContext';
import { editUser, getUser, setUser } from '../data/repository';
import { useHistory } from "react-router-dom";

function EditProfile(){

  const [fields, setFields] = useState({ username: getUser().username, email: getUser().email, password: getUser().password });

  const [errorMessage, setErrorMessage] = useState(null);

  // use setUserLogIn context to update USER in localStorage
  const { setUserLogIn } = useContext(UserContext);

  const history = useHistory();


  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    // use spread operator
    const temp = { ...fields };

    // Update field and state.
    temp[name] = value;
  
    setFields(temp);
  }

  const handleSaveChange = (event) => {
    //  dont submmit the form to the server so the page wont refresh
    event.preventDefault();
   
    //  if username field is empty return error
    if (fields.email === "") {
      setErrorMessage("Email cannot be empty");
      return;
    }

    // else if (!/\S+@\S+\.\S+/.test(user.email.trim)) {
    //   setErrorMessage("Email format must be example123@test.com");
    //   return;
    // }

    //  if password field entered does not match the requirement return error
    else if (fields.password.length < 6 || fields.password.trim === "" ||
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(fields.password)) {
      setErrorMessage("Pasword must be at least six characters should be a mix of upper and lowercase characters, numbers and punctuation")
      return;
    }

    const username = getUser().username;
    editUser(username);
    setUserLogIn(fields);
    history.push("/profile");

  }

  return (
    <div>
      <hr />
      <div className="row">

        <div className="col-lg-6 justify-content-center text-center align-content-center">
          <h1 className="text-center">Edit profile</h1>
          <form onSubmit={handleSaveChange} >
            <div className="form-group">
              <label htmlFor="username" className="control-label">Username</label>
              <input name="username" id="username" className="form-control"
                value={fields.username} disabled  />
            </div>
            <div className="form-group">
              <label htmlFor="email" className="control-label">Email</label>
              <input name="email" id="email" className="form-control"
                value={fields.email} onChange={handleChange} />

            </div>
            <div className="form-group">
              <label htmlFor="password" className="control-label">Password</label>
              <input type="password" name="password" id="password" className="form-control"
                value={fields.password} onChange={handleChange} />
            </div>
            {errorMessage !== null &&
              <div className="form-group">
                <span className="text-danger">{errorMessage}</span>
              </div>
            }
            <input type="submit" className="btn btn-primary" value="Save" />
          </form>
        </div>
      </div>
    </div>

  );
}

export default EditProfile;
