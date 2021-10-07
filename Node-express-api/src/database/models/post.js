module.exports = (sequelize, DataTypes) =>
// can define model with classes or define with the sequelize.define(...);
 sequelize.define("post", {
     post_id: {
         type: DataTypes.INTEGER,
         autoIncrement: true,
         primaryKey: true
     },
     text:{
         type: DataTypes.STRING(600),
         allowNull: false
     },
     image_path:{
         type: DataTypes.STRING(255),
         allowNull: true
     }
 }, {
     // Don't add the timestamp attributes (updatedAt, createdAt)
     timestamps: false
 });
 