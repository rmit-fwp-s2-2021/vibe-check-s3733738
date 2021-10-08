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

    const followable = await db.user.findAll({
        where: {
            username: {
                [Op.ne] : follower
            }
        }

    });

    res.json(followable);
}



// [post] - handle data for a request to follow someone
exports.follow = async (req, res) => {

    const follower = req.params.username;

    // request to follow a user
    const following = req.body.username;

    const follow = await db.relationship.create({
        follwer_name: follower,
        following_name: following
    })

    res.json()

    // response follow successful

}

// [delete] - handle data for a request to unfollow someone 