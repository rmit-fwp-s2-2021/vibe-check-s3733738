module.exports = (express, app) => {
    const controller = require("../controllers/forum.controller.js");
    const router = express.Router();

    // select all posts with post and comments
    router.get("/", controller.all);

    // add routes to server
    // this app.user tells one how to call an API
    app.use("/api/forum", router);
};