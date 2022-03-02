const {DataTypes} = require("sequelize");
const db = require("../db");

const Pantry = db.define("pantry", {
    meat: {
        type: DataTypes.STRING,
        allowNull: true
    },
    veggies: {
        type: DataTypes.STRING,
        allowNull: true
    },
    fruit: {
        type: DataTypes.STRING,
        allowNull: true
    },
    spices: {
        type: DataTypes.STRING,
        allowNull: true
    },
    servings: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    timeToCook: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    ownerID: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
})

module.exports = Pantry