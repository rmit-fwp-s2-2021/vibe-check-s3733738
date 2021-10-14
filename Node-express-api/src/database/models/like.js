module.exports = ( db, DataTypes) => 
        db.sequelize.define("like", {
        
            username: {
                type: DataTypes.STRING(32),
                primaryKey: true,
                allowNull: false,
                references: {
                    model: db.user,
                    key: "username"
                }
            },

            post_id: {

                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                references: {
                    model: db.post,
                    key: "post_id"
                }
            },

            like: {
                type: DataTypes.BOOLEAN,
                allowNull: false
            }
        },{
            // Don't add the timestamp attributes (updatedAt, createdAt)
            timestamps: false
});
