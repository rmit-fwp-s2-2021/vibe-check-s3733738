import React, { useState, useContext } from "react";
import { Link } from 'react-router-dom';
import validation from '../data/validation';
import { setUser, createUser, findUser } from '../data/repository';
import '../style/Form.css';
import img from "../media/priscilla-du-preez-XkKCui44iM0-unsplash.jpeg";
import { UserContext } from "../contexts/UserContext";
import { useHistory } from "react-router-dom";
import sanitize from 'sanitize-html';


export default function Signup(props) {
  const history = useHistory();

  const [fields, setFields] = useState({ username: "", email: "", password: ""});

  const [errorMessage, setErrorMessage] = useState({  });

  const { setUserLogIn } = useContext(UserContext);

  // generic change handler
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    const temp = { ...fields};
    // Update field and state.
    temp[name] = value;
    setFields(temp);
  }


  const handleFormSubmit = async (event) => {

    //dont submmit the form to the server so the page wont refresh
    event.preventDefault();
    // Validate form and if invalid do not contact API.


   // const trimmedFields = { username: sanitizedUsername, email: sanitizedEmail, password: sanitizedPassword};

    const { trimmedFields, isValid } = await handleValidation();
    if(!isValid)
      return;
    
   

    // Create user. -- sends HTTP
    //request to API
    //assume api always works here
    
    const user = await createUser(trimmedFields);

    // set user state
    setUser(user);
    setUserLogIn(user);
   
    //navigate to the home 
    history.push("/");
    return;

  };

  //validation code
  const handleValidation = async () => {
    const trimmedFields = trimFields();
    const currentErrors = { };

   

    let key = "username";
    let field = trimmedFields[key];
    if(field.length === 0)
      currentErrors[key] = "Username is required.";
    else if(field.length > 32)
      currentErrors[key] = "Username length cannot be greater than 32.";
    else if(await findUser(trimmedFields.username) !== null)
      currentErrors[key] = "Username is already registered.";

    key = "email";
    field = trimmedFields[key];
    if(field.length === 0)
      currentErrors[key] = "Email is required.";
    else if(field.length > 40)
      currentErrors[key] = "Email length cannot be greater than 40.";
    else if (!/\S+@\S+\.\S+/.test(field)) 
      currentErrors[key]= "Email format must be example123@test.com";
    else if (await findUser(trimmedFields.username) !== null)
      currentErrors[key] = "This email address is already in use";


    key = "password";
    field = trimmedFields[key];
    if(field.length === 0)
      currentErrors[key] = "Password is required.";
    else if(field.length < 6)
      currentErrors[key] = "Password must contain at least 6 characters.";
     else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(field))
      currentErrors[key] = "Pasword must be at least six characters should be a mix of upper and lowercase characters, numbers and punctuation";

    setErrorMessage(currentErrors);

    return { trimmedFields, isValid: Object.keys(currentErrors).length === 0 };
  };

  const trimFields = () => {
    const trimmedFields = { };
    //object.keys() return array of given object's own property names
    Object.keys(fields).map(key => trimmedFields[key] = fields[key].trim());
    setFields(trimmedFields);

    return trimmedFields;
  };


  return (
    <div>

      <div className="row">
        <div className="col-xl">
          <form onSubmit={handleFormSubmit} className="form">
            <h2>Sign Up</h2>
            <div className="form-group">
              <label htmlFor="username" className="control-label">Username</label>
              <input name="username" id="username" className="form-control"
                value={fields.username} onChange={handleChange} />
              {errorMessage.username && <p className="text-danger">{errorMessage.username}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="email" className="control-label">Email</label>
              <input name="email" id="email" className="form-control"
                value={fields.email} onChange={handleChange} />
              {errorMessage.email && <p className="text-danger">{errorMessage.email}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="password" className="control-label">Password</label>
              <input type="password" name="password" id="password" className="form-control"
                value={fields.password} onChange={handleChange} />
              {errorMessage.password && <p className="text-danger">{errorMessage.password}</p>}
            </div>
            <div className="form-group text-center">
              <input type="submit" className="btn btn-lg " value="Create account" />
            </div>
            <div className="form-group mt-4 text-center">
                  <p>
                    Already have an account? <Link to="/login"> Log in</Link>
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

