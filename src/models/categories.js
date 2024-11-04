import { DataTypes } from "sequelize";
import { sequelize } from "../confiq/DB.js";


const Categories = sequelize.define('categories',{
    categorieID:{
        type:DataTypes.STRING,
        primaryKey:true,
        allowNull:false
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
},{
    timestamps:true
})

export {Categories}