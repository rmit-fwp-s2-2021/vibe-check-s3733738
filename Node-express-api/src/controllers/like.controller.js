const db = require("../database");

// get like counts
exports.getLikeCount = async(req,res)=>{
    const likeCount = await db.like.count({
        where: { post_id: req.params.post_id,
                 like: true }

    });
    res.json(likeCount);
}

// get dislike count
exports.getDislikeCount = async(req,res)=>{
    const dislikeCount = await db.like.count({
        where: { post_id: req.params.post_id,
                 like: false }

    });
    res.json(dislikeCount);
}

// get post that user liked return as an array
exports.getUserLikedPost = async(req,res) =>{

    const userLiked = await db.like.findAll({
        where: { username: req.params.username,
                like: true}
    });

    let postArr = [];

    userLiked.map(post=>{
        postArr.push(post.post_id);
    })
    res.json(postArr);
}

// get post that user disliked return as an array
exports.getUserDislikedPost = async(req,res) =>{

    const userDisliked = await db.like.findAll({
        where: { username: req.params.username,
                like: false}
    });

    let postArr = [];

    userDisliked.map(post=>{
        postArr.push(post.post_id);
    })
    res.json(postArr);
}



// create like or dislike in db
exports.likeOrDislikePost = async(req, res) => {

    const like = await db.like.create({
        username: req.params.username,
        post_id : req.body.post_id,
        like:  req.body.like
    });

    res.json(like);
}


// destroy row in like db
exports.deleteLikeOrDislike = async(req,res) =>{
    
    const user = req.params.username;

    // request to unfollow a user
    const post = req.params.post_id;

    const deleteLikeOrDislike = await db.like.findOne({
        where:{
            username: user,
            post_id : post
        }
        
    });

    await deleteLikeOrDislike.destroy();

    res.json(deleteLikeOrDislike);
}



