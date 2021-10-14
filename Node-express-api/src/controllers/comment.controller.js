const db = require("../database");
// create and save a comment in database
exports.create = async(req, res) => {
    const comment = await db.comment.create({
        comment_author: req.body.reply_author,
        message : req.body.message,
        replyTo_id: req.body.post_id
    });

    res.json(comment);
}

// find a single comment with an id 


// delete a single comment with an id
