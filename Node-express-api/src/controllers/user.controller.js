const db = require("../database");
const argon2 = require("argon2");

// Select all users from database
exports.all = async(req,res) => {
    const users = await db.user.findAll();

    // return json
    res.json(users);
};

// Select one user from the databse 
exports.one = async(req, res) => {
    const user = await db.user.findByPk(req.params.username);

    res.json(user);

};

// get username ->  verify hash password

// select one user from databse if username and password are a match
exports.login = async(req, res) => {
    //find the user with the username
    const username = req.query.username;
    const user = await db.user.findOne({
        where: {
             username: username
        }
       
    });

    // user must not be null and password must match
    if(user === null || await argon2.verify(user.password_hash, req.query.password) === false)
        // Login failed
        res.json(null);

    else   
        res.json(user);
};

// register
// create a user in database 
exports.create = async(req, res) => {
    const hash = await argon2.hash(req.body.password, { type: argon2.argon2id });
    
    const user = await db.user.create({
        username: req.body.username,
        password_hash : hash,
        email : req.body.email,
        date: new Date().toDateString()
    });

    res.json(user);
};

// update user details
exports.update = async(req, res) => {
    
    const email  = req.body.email;

    const hash = await argon2.hash(req.body.password, { type: argon2.argon2id });

    const user = await db.user.findByPk(req.body.username);

        user.email = email;
        user.password_hash = hash;

        // await user.update();
        await user.save();
        
    res.json(user);

};

// delete a post in the database
exports.delete = async(req, res)=> {

    const user = await db.user.findByPk(req.params.username);

    await user.destroy();

    res.json(user);

}


