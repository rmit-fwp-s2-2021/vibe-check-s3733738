module.exports = (express, app) => {
    const controller = require("../controllers/comment.controller.js");
    const router = express.Router();

    // select one post 
    // router.get("/select/:post_id", controller.one);

    // create a new comment 
    router.post("/", controller.create);

    // edit user details
    //router.put("/update/:post_id", controller.update);

    // delete a post 
    //router.delete("/delete/:post_id", controller.delete);

    // add routes to server
    // this app.user tells one how to call an API
    app.use("/api/comments", router);
};