module.exports = (express, app) => {
    const controller = require("../controllers/user.controller.js");
    const router = express.Router();

    // select all users
    router.get("/", controller.all);

    // select a single user with is
    router.get("/select/:username", controller.one);

    // select one user from the databse if username and password are a match ,
    router.get("/login", controller.login);

    // create a new user 
    router.post("/", controller.create);

    // edit user details
    router.put("/update", controller.update);

    // delete a user account
    router.delete("/delete/:username", controller.delete);

    // add routes to server
    app.use("/api/users", router);
};