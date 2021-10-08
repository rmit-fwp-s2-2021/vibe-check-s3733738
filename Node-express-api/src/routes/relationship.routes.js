module.exports = (express, app) => {
    const controller = require("../controllers/relationship.controller.js");
    const router = express.Router();

    // [get] all following users by a user
    router.get("/:username/following", controller.all);

    // [get] a list of 'not yet'followed users for a user (fetch that user's username)
    router.get("/:username/follow",controller.canFollow)

    // add routes to server
    // this app.user tells one how to call an API
    app.use("/api/relationship", router);
};








// [post] - follow insert a user followed another user in relationshsip model



// [delete] -unfollow meaning delete a row of user from following certain user









