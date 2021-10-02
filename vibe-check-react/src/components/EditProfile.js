import React, { useContext, useState } from 'react'
import { UserContext } from '../contexts/UserContext';
import { editUser, getUser, setUser } from '../data/repository';
import { useHistory } from "react-router-dom";

function EditProfile(){

  const [fields, setFields] = useState({ "username": getUser().username, "email": getUser().email, "password": "" });

  const [errorMessage, setErrorMessage] = useState(null);

  // use setUserLogIn context to update USER in localStorage
  const { setUserLogIn } = useContext(UserContext);

  const history = useHistory();


  const handleChange = (event) => {
    setFields({ ...fields, [event.target.name]: event.target.value });
  }

    //  // Ensure null is not used when setting fields.
    //  const setFieldsNullToEmpty = (currentFields) => {
    //   // Make a copy of currentFields so the original parameter is not modified.
    //   currentFields = { ...currentFields };
  
    //   for(const [key, value] of Object.entries(currentFields)) {
    //     currentFields[key] = value !== null ? value : "";
    //   }
  
    //   setFields(currentFields);
    // };
  

  const handleSaveChange = (event) => {
    //  dont submmit the form to the server so the page wont refresh
    event.preventDefault();

    // Validate form and if invalid do not contact API.
    // const { trimmedFields, isValid } = handleValidation();
    // if(!isValid)
    //   return;



    // const user = fields;
   
    //if username field is empty return error
    if (fields.email.trim() === null) {
      setErrorMessage("Email cannot be empty");
      return;
    }

    else if (!/\S+@\S+\.\S+/.test(fields.email.trim())) {
      setErrorMessage("Email format must be example123@test.com");
      return;
    }

    // if password field entered does not match the requirement return error
    else if (fields.password.length < 6 || fields.password.trim === "" ||
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(fields.password)) {
      setErrorMessage("Pasword must be at least six characters should be a mix of upper and lowercase characters, numbers and punctuation")
      return;
    }

    const getUserInLocal = getUser();
    editUser(fields);
    setUser({ ...fields, date: getUserInLocal.date,image: getUserInLocal.image });
    setUserLogIn(fields);
    history.push("/profile");
    return;

  }

  // const handleValidation = () => {
  //   const trimmedFields = trimFieldsEmptyToNull();

  //   console.log(trimmedFields);
  //   const currentErrors = { };

  //   let key = "email";
  //   let field = trimmedFields[key];
  //   if(field === null)
  //     currentErrors[key] = "Email cannot be empty";
  //   else if(!/\S+@\S+\.\S+/.test.field)
  //     currentErrors[key] = "Email format must be example123@test.com";


  //   key = "password";
  //   field = trimmedFields[key];
  //   if(field !== null && field.length <6)
  //     currentErrors[key] = "Pasword must be at least six characters should be a mix of upper and lowercase characters, numbers and punctuation";

  //   setErrorMessage(currentErrors);


  //   return { trimmedFields, isValid: Object.keys(currentErrors).length === 0 };
  // };

  // // Note: Empty fields are converted to null.
  // const trimFieldsEmptyToNull = () => {
  //   const trimmedFields = { };

  //   for(const [key, value] of Object.entries(fields)) {
  //     let field = value;

  //     // If value is not null trim the field.
  //     if(field !== null) {
  //       field = field.trim();

  //       // If the trimmed field is empty make it null.
  //       if(field.length === 0)
  //         field = null;
  //     }

  //     trimmedFields[key] = field;
  //   }

  //   setFieldsNullToEmpty(trimmedFields);

  //   return trimmedFields;
  // };


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
