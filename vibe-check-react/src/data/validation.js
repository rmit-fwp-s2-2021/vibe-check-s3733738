const validation = (data) => {

    let error = {};

    //if name field is empty 
    if (!data.username) {
        error.username = "Name is required";
    }
    //if email field is empty
    if (!data.email) {
        error.email = "Email is required";

    }
    //if email format does not contain @/.
    //if password field empty or if length less than 6 and does contain lower UPPER case, number & punctiation
    else if (!/\S+@\S+\.\S+/.test(data.email)) {
        error.email = "Email format must be example123@test.com";
    }

    //At least one upper case English letter, (?=.*?[A-Z])
    // At least one lower case English letter, (?=.*?[a-z])
    // At least one digit, (?=.*?[0-9])
    // At least one special character, (?=.*?[#?!@$%^&*-])
    // Minimum eight in length .{8,} (with the anchors)
    if (!data.password) {
        error.password = "Password is required";
    } else if (data.password.length < 6) {
        error.password = "Password must be at leas 6 or more characters";

    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(data.password)) {
        error.password = "Pasword must be at least six characters should be a mix of upper and lowercase characters, numbers and punctuation";

    }
    return error;
}

export default validation;
