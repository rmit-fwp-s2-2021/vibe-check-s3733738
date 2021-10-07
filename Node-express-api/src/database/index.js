const { Sequelize, DataTypes } = require("sequelize");
const config = require("./config.js");

//variable i want the outside world to have 
const db = {
  //op : operations, e.g: WHERE, ORDERBY,....
  Op: Sequelize.Op
};

// Create Sequelize.
db.sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.DIALECT
});

// Include models.
// models for the orm
// can be put in the same file but this file might get bigger 
db.user = require("./models/user.js")(db.sequelize, DataTypes);
db.post = require("./models/post.js")(db.sequelize, DataTypes);
db.comment = require("./models/comment.js")(db.sequelize, DataTypes);

// Relate post and user.
// fk field to the post table name will be username
// 'user' is an alias 
// ON DELETE option and hooks to delete child records 
db.user.hasMany(db.post, {foreignKey: "username", as:'user',  onDelete: 'cascade', hooks: true });
db.post.belongsTo(db.user, { foreignKey: { name: "username", allowNull: false } });

// 1 post has many comments 
// Relate post and comment and user
db.post.hasMany(db.comment, {foreignKey: "replyTo_id", as:'id'});
db.comment.belongsTo(db.post, { as: 'post', foreignKey: 'replyTo_id'});
db.comment.belongsTo(db.user, { as: 'commentAuthor', foreignKey: 'comment_author'});



// Learn more about associations here: https://sequelize.org/master/manual/assocs.html

// Include a sync option with seed data logic included.
// can call it db.createTheTable...
db.sync = async () => {
  // Sync schema.
  // create the tables
  // wait for the promise to finish then move to the next
  //await db.sequelize.sync();

  // Can sync with force if the schema has become out of date - note that syncing with force is a destructive operation.
  // drop all tables firsty
await db.sequelize.sync({ force: true });
  
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
  await db.user.create({ username: "tester1", password_hash: hash, email: "tester123@test.com", date: new Date().toDateString(), image: "/Avatar/ben-parker-OhKElOkQ3RE-unsplash.jpeg"});

  hash = await argon2.hash("Password2!", { type: argon2.argon2id });
  await db.user.create({ username: "tester2", password_hash: hash, email: "test321@test.com", date: new Date().toDateString()});



  const post_count = await db.post.count();

  if(count > 0)
    return;

  await db.post.create({ username: "tester1" ,text: "does anyone else have any mandatory classes on campus despite the covid stuff going around on campus? how does that make you feel and is there any way around it or do we have to suck it up and risk getting covid and such?", image_path: "../vibe-check-react/src/media/PostImage/947_large.png"});
  await db.post.create({ username: "tester2" ,text: "Hello, I was just wondering if there is any opportunities for scholarships for continuing international students, the website only seems to show scholarship opportunities for commencing international students", image_path: "../vibe-check-react/src/media/PostImage/947_large.png"});

  const comment_count = await db.comment.count();

  if(count > 0)
    return;
  
  await db.comment.create({ message: "comment on post 1", replyTo_id: 1, comment_author: "tester2"});
  await db.comment.create({ message: "2nd comment on post 1", replyTo_id: 1, comment_author: "tester2"});
  
}

module.exports = db;
