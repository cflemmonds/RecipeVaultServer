const { DataTypes } = require('sequelize');
const db = require('../db');

const UserModel = db.define("user", {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false
    },
    firstName: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    username: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING(1000),
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING(1000),
        allowNull: false,
        // unique: true
    }
})

module.exports = UserModel;