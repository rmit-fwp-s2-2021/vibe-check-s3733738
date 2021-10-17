const { Sequelize, DataTypes } = require("sequelize");
const config = require("./config.js");

//op : operations, e.g: WHERE, ORDERBY,....
const db = {
  Op: Sequelize.Op
};

// Create Sequelize.
db.sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.DIALECT
});

// Include models.
db.user = require("./models/user.js")(db.sequelize, DataTypes);
db.post = require("./models/post.js")(db.sequelize, DataTypes);
db.comment = require("./models/comment.js")(db.sequelize, DataTypes);
db.relationship = require("./models/relationship.js")(db, DataTypes);
db.like = require("./models/like.js")(db, DataTypes);

// Relate post and user.
// fk field to the post table name will be username
// 'user' is an alias 
// ON DELETE option and hooks to delete child records 
db.user.hasMany(db.post, {foreignKey: "username", as:'user',  onDelete: 'cascade', hooks: true });
db.post.belongsTo(db.user, { foreignKey: { name: "username", allowNull: false } });

// 1 post has many comments 
// Relate post and comment and user
db.post.hasMany(db.comment, {foreignKey: "replyTo_id", as:'comments', onDelete: 'cascade', hooks: true });
db.comment.belongsTo(db.post, { as: 'post', foreignKey: 'replyTo_id'});
db.comment.belongsTo(db.user, { as: 'commentAuthor', foreignKey: 'comment_author'});


// // POST_LIKES_USER
db.post.hasMany(db.like, { foreignKey: "post_id", as:"like", onDelete: 'cascade', hooks: true });
db.like.belongsTo(db.user, {foreignKey:'username'});
db.like.belongsTo(db.post, {as: "post", foreignKey:'post_id'});

// relationship
// -------------
//| follower | following |
//db.relationship.belongsTo(db.user, {foreignKey:'username'});
//db.relationship.belongsTo(db.user, {as: 'follower', foreignKey:'username'});



// Include a sync option with seed data logic included
db.sync = async () => {
  await db.sequelize.sync({});

  await seedData();
};

//inserts data into database
async function seedData() {
  //count the number of users
  const count = await db.user.count();
  // Only seed data if necessary.
  if(count > 0)
    return;

  // insert users
  const argon2 = require("argon2");

  let hash = await argon2.hash("Password1!", { type: argon2.argon2id });
  await db.user.create({ username: "jason123", password_hash: hash, email: "tester123@test.com", date: new Date().toDateString(), image_path: "https://i.ibb.co/p278PJM/ben-parker-Oh-KEl-Ok-Q3-RE-unsplash.jpg"});

  hash = await argon2.hash("Password2!", { type: argon2.argon2id });
  await db.user.create({ username: "Wansi06", password_hash: hash, email: "test321@test.com", date: new Date().toDateString()});

  hash = await argon2.hash("Password3!", { type: argon2.argon2id });
  await db.user.create({ username: "Lizzy", password_hash: hash, email: "test1234@test.com", date: new Date().toDateString(), image_path: "https://i.ibb.co/7tpGLCG/sarah-brown-t-Td-C88-6a-I-unsplash.jpg"});

  hash = await argon2.hash("Password4!", { type: argon2.argon2id });
  await db.user.create({ username: "Thomascool", password_hash: hash, email: "test12345@test.com", date: new Date().toDateString(), image_path: "https://i.ibb.co/f20RPzs/zhanarys-dakhiyev-WMl-Rkqt1v-II-unsplash.jpg"});

  hash = await argon2.hash("Password4!", { type: argon2.argon2id });
  await db.user.create({ username: "Hall", password_hash: hash, email: "test12345@test.com", date: new Date().toDateString()});

  hash = await argon2.hash("Password4!", { type: argon2.argon2id });
  await db.user.create({ username: "Collins", password_hash: hash, email: "test12345@test.com", date: new Date().toDateString()});

  hash = await argon2.hash("Password4!", { type: argon2.argon2id });
  await db.user.create({ username: "Charmaineee", password_hash: hash, email: "test12345@test.com", date: new Date().toDateString(), image_path: "https://i.ibb.co/3CfNz78/luis-villasmil-6qf1ulj-Gp-U4-unsplash.jpg"});




  const post_count = await db.post.count();

  if(post_count > 0)
    return;

  await db.post.create({ username: "jason123" ,text: "does anyone else have any mandatory classes on campus despite the covid stuff going around on campus? how does that make you feel and is there any way around it or do we have to suck it up and risk getting covid and such?"});
  await db.post.create({ username: "Wansi06" ,text: "I am planning on moving to Melbourne next year, and continuing my degree and am just wondering which uni to choose. Currently thinking of Unimelb, Monash, and RMIT, particularly RMIT as Masters of Medical Physics is only offered at RMIT in VIC and I figure might as well get my physics degree there. "+
                                                    "So basically i’m kinda just asking for advice on what my preferences should be based on my situation and also… do you think Melbourne will even be open by next year?", 
  image_path: "https://i.ibb.co/r78sbBj/cover1.jpg"});

  const comment_count = await db.comment.count();

  if(comment_count > 0)
    return;
  
  await db.comment.create({ message: "You should be able to enrol in a bachelors program using the completed units you already have as the prerequisites. ", replyTo_id: 2, comment_author: "Wansi06"});
  await db.comment.create({ message: "Been to both Melb Uni and RMIT. Would pick the latter any day of the week. Kind of same area as you (did bachelor of science at melb uni). I'll just say that Melb uni definitely does have the reputation and prestigiousness, "+
                                      "but I felt way more engaged and motivated at RMIT. There are a number of experiences that made me prefer RMIT", image_path:"https://i.ibb.co/x5H2Yvb/rmit-university.jpg",
                                      replyTo_id: 2, comment_author: "Charmaineee"});

  const relationship_count = await db.relationship.count();

  if(relationship_count > 0)
    return;
  
  await db.relationship.create({ follower_name: "Wansi06" , following_name: "jason123"});
  await db.relationship.create({ follower_name: "Wansi06" , following_name: "Charmaineee"});

  const like_count = await db.like.count();

  if(like_count > 0)

  return;

  await db.like.create({ username: "Wansi06" , post_id: 1, like: true});
  await db.like.create({ username: "Wansi06" , post_id: 2, like: true});
  await db.like.create({ username: "jason123" , post_id: 2, like: true});
  await db.like.create({ username: "Lizzy" , post_id: 2, like: true});
  await db.like.create({ username: "Thomascool" , post_id: 2, like: false});

  
  
}

module.exports = db;
