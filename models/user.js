const { DataTypes } = require('sequelize');
const sequelize = require('../db/db')

const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

// sequelize.sync({ alter: false })
//     .then(() => console.log('User table has been created, if one doesn\'t exist'))
//     .catch(error => console.log('This error occurred:', error));

module.exports = User;