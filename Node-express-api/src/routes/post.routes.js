module.exports = (express, app) => {
    const controller = require("../controllers/post.controller.js");
    const router = express.Router();

    // select all posts
    router.get("/", controller.all);

    // create a new post 
    router.post("/", controller.create);

    // add routes to server
    // this app.user tells one how to call an API
    app.use("/api/posts", router);
}