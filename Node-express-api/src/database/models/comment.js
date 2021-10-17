module.exports = (sequelize, DataTypes) =>
    sequelize.define("comment", {

        comment_author: {
            type: DataTypes.STRING(32),
            allowNull: false
        },
        message: {
            type: DataTypes.STRING(600),
            allowNull: false
        },
        image_path:{
            type: DataTypes.STRING(255),
            allowNull: true
        },
        replyTo_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        },{
            // Don't add the timestamp attributes (updatedAt, createdAt)
            timestamps: false
});
