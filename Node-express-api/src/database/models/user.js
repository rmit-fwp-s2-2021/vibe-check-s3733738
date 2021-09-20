module.exports = (sequelize, DataTypes) => 
    sequelize.define("user", {
        user_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true
        },
        username:{
            type: DataTypes.STRING(32),
            unique: true,
            allowNull: false,
            primaryKey: true
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
    