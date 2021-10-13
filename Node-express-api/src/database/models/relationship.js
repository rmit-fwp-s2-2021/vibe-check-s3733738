module.exports = (db, DataTypes) =>
    db.sequelize.define("relationship", {

        follower_name: {
            type: DataTypes.STRING(32),
            primaryKey: true,
            unique: false,
            allowNull: false,
            references: {
                model: db.user,
                key: "username"
              }
        },
        following_name: {
            type: DataTypes.STRING(32),
            primaryKey: true,
            unique: false,
            allowNull: false,
            references: {
                model: db.user,
                key: "username"
              }
        }
        },{
            // Don't add the timestamp attributes (updatedAt, createdAt)
            timestamps: false
});
