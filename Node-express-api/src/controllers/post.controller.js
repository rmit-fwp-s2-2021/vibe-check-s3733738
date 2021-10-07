const db = require("../database");

// select all posts from the database

exports.all = async(req, res) => {
  const posts = await db.post.findAll();

  // Can use eager loading to join tables if needed, for example:
  //const posts = await db.post.findAll({ include: db.user});

  // Learn more about eager loading here: https://sequelize.org/master/manual/eager-loading.html

  res.json(posts);

}

exports.one = async(req, res)=>{
    
    const post = await db.post.findByPk(req.params.post_id);
    res.json(post);
};

// create a post in the database
exports.create = async(req, res) => {
    const post = await db.post.create({
        text: req.body.text,
        username : req.body.username,
        image_path: req.body.image_path
    });

    res.json(post);
}

// update a post in the database
exports.update = async(req, res) => {
    
    const text = req.body.text;
    
    const post = await db.post.findByPk(req.params.post_id);
    if(text !== null){
        post.text = text;
        // await user.update();
        await post.save();
    }
       
    res.json(post);

};

// delete a post in the database
exports.delete = async(req, res)=> {

    const post = await db.post.findByPk(req.params.post_id);
    
    await post.destroy();

    res.json({message: "post has deleted"});

}

