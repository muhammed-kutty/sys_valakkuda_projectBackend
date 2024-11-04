import {DataTypes} from 'sequelize'
import { sequelize } from '../confiq/DB.js'


const Admin = sequelize.define('admin',{
    adminID:{
        type:DataTypes.STRING,
        primaryKey:true,
        allowNull:false
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    }
},{
    timestamps:true
})

export {Admin}