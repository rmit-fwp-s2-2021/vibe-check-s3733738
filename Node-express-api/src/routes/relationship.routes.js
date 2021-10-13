module.exports = (express, app) => {
    const controller = require("../controllers/relationship.controller.js");
    const router = express.Router();

    // [get] all following users by a user
    router.get("/:username/following", controller.all);

    // [get] a list of 'not yet'followed users for a user (fetch that user's username)
    router.get("/:username/follow",controller.canFollow);

    // handle follow request by a user
    router.post("/:username/follow", controller.follow);

    // handle unfollow request by a user
    router.post("/:username/unfollow", controller.unfollow);


    // add routes to server
    // this app.user tells one how to call an API
    app.use("/api/relationship", router);
};











