const db = require("../database");
const user = require("../database/models/user");
const Op = require('sequelize').Op

// [get] all user's following
exports.all = async (req, res) => {

    // get the follower req
    const follower = req.params.username;
    const following = await db.relationship.findAll({
        where: {
            follower_name: follower
        }
    });

    res.json(following);

}

// [get] a list of 'not yet'followed users for a user (fetch that user's username)
exports.canFollow = async (req, res) =>{
    
     // get the follower req
     const follower = req.params.username;

    // return a list of users
    // except for user 
    const following = await db.relationship.findAll({
        where: {
            follower_name: follower
        }
    });

    let followingArray =[];
    following.map(user=>{
        followingArray.push(user.following_name);
    });

    const followable = await db.user.findAll({
        where: {
            username: {
                [Op.notIn] : [follower,  followingArray.toString().split(",")]
            }
        }

    });

    let canFollow = [];
    followable.map(user=>{
        canFollow.push(user.username);
    });
    res.json(canFollow);
   

    // let canFollow =[];

    // if(following.length === 0){
    //     followable.forEach(user=>{
    //         canFollow.push(user.username);
    //     });
    //     res.json(canFollow);
    // }

    // else{
   
    //     followable.map(user => {
    //         following.map(following=>{
    //             if(user.username !== following.following_name){
    //                 canFollow.push(user.username);
    //             }
    //         })
    //     })
    //     res.json(canFollow);

    // }
    //res.json(followable);
    
}



// [post] - handle data for a request to follow someone
exports.follow = async (req, res) => {

    const follower = req.params.username;

    // request to follow a user
    const following = req.body.targetUser;

    const follow = await db.relationship.create({
        follower_name: follower,
        following_name: following
    });

    res.json(follow);

    // response follow successful

}

// [delete] - handle data for a request to unfollow someone 
exports.unfollow = async (req, res) => {

    const follower = req.params.username;

    // request to unfollow a user
    const unfollow = req.body.username;

    const unfollowUser = await db.relationship.findOne({
        follower_name: follower,
        following_name: unfollow
    });

    await unfollowUser.destroy();

    res.json(unfollowUser);

}
