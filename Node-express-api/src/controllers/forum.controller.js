const db = require("../database");
const { Sequelize } = require("sequelize");
const Op = require('sequelize').Op

// get all posts with comments
exports.all = async (req, res) => {

    const posts = await db.post.findAll({
        include: { model: db.comment, as:'comments'},
        //         { model: db.like, as:"like"}],
        // where:[{ 'like' : 1}]
        // attributes: { 
        //     include: [ [ Sequelize.fn("COUNT", Sequelize.col("like")), "like_count"] ] 
        // },
        // include: [
        //     {
        //     model: db.like, 
        //     as: 'like', 
        //     attributes: [],
        //     // where: {[Op.or] :{like: true, dislike: true}}
        //      }
        // ] ,
    });

    res.json(posts);
};


// create comment
// exports.createComment = async (req, res) => {
//    const comments = await db.comment.create({
//         text: req.body.text,
//         user_id = req.body.user_id,
//         post_id = req.body.post_id
//     });

//     res.json(comments);

// };

