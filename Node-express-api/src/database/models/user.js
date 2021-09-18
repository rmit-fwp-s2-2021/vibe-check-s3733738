module.exports = (sequelize, DataTypes) => 
    sequelize.define("user", {
        user_id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        username:{
            type: DataTypes.STRING(32),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(64),
            allowNull: false
        },
        password_hash: {
            type: DataTypes.STRING(96),
            allowNull: false

        }
    }, {
        // Don't add the timestamp attributes (updatedAt, createdAt)
        timestamps: false

    });
    