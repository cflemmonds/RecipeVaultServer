const {Sequelize} = require('sequelize');

const sequelize = new Sequelize("postgres://postgres:cosmiclocal@localhost:5432/recipe-vault")

// const db = new Sequelize(process.env.DATABASE_URL, {
//     dialect: 'postgres',
//     ssl: process.env.ENVIRONMENT === 'production'
// })

module.exports = sequelize;