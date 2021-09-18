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

// Relate post and user.
// fk field to the post table name will be username
db.user.hasMany
db.post.belongsTo(db.user, { foreignKey: { name: "username", allowNull: false } });

// Learn more about associations here: https://sequelize.org/master/manual/assocs.html

// Include a sync option with seed data logic included.
// can call it db.createTheTable...
db.sync = async () => {
  // Sync schema.
  // create the tables
  // wait for the promise to finish then move to the next
  await db.sequelize.sync();

  // Can sync with force if the schema has become out of date - note that syncing with force is a destructive operation.
  // drop all tables firsty
  // await db.sequelize.sync({ force: true });
  
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

  let hash = await argon2.hash("abc123", { type: argon2.argon2id });
  await db.user.create({ username: "mbolger", password_hash: hash, email: "abc123@test.com"});

  hash = await argon2.hash("def456", { type: argon2.argon2id });
  await db.user.create({ username: "shekhar", password_hash: hash, email: "test123@test.com"});
}

module.exports = db;
