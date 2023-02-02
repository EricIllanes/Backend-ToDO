const {sequelize}= require('../db');
const {DataTypes} = require('sequelize');
const Tasks = sequelize.define('tasks', {
    name:{
        type: DataTypes.STRING,
        allowNull: false,
    }, 
    content:{
        type: DataTypes.JSON,
    },
    done:{
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    }
})

module.exports={
    Tasks
}