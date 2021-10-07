const db = require("../database");

exports.all = async (req, res) => {

    const users = await db.post.findAll({
        include: { model: db.user, as:'user'}
    });

    res.json(users);
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

