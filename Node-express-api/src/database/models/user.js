module.exports = (sequelize, DataTypes) => 
    sequelize.define("user", {
        username:{
            type: DataTypes.STRING(32),
            allowNull: false,
            primaryKey: true,
            unique: true
        },
        email: {
            type: DataTypes.STRING(64),
            allowNull: false
        },
        password_hash: {
            type: DataTypes.STRING(96),
            allowNull: false

        },
        date: {
            type: DataTypes.STRING(96),
        
        },
        image_path: {
            type: DataTypes.STRING(600),
            allowNull: true,
            defaultValue:  'https://i.ibb.co/cykV2Vg/avatar.png'
        }
    }, {
        // Don't add the timestamp attributes (updatedAt, createdAt)
        timestamps: false

    });
    