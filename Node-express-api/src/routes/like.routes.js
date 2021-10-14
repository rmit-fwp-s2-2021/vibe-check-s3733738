module.exports = (express, app) => {
    const controller = require("../controllers/like.controller.js");
    const router = express.Router();

    // select likes and get count
    router.get("/getLikeCount/:post_id", controller.getLikeCount);

    // select dislikes and get count
    router.get("/getDislikeCount/:post_id", controller.getDislikeCount);

    // select user liked post 
    router.get("/getUserLikedPost/:username", controller.getUserLikedPost);

    // select user disliked post
    router.get("/getUserDislikedPost/:username", controller.getUserDislikedPost);

    // create like or dislike row 
    router.post("/likeDislike/:username", controller.likeOrDislikePost);

    // destroy 
    router.delete("/delete/:username", controller.deleteLikeOrDislike);

    // add routes to server
    // this app.user tells one how to call an API
    app.use("/api/like", router);
};