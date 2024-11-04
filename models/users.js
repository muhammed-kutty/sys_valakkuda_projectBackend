import { DataTypes } from "sequelize";
import { sequelize } from "../confiq/DB.js";
import { Categories } from "./categories.js";


const USers = sequelize.define('users',{
    usersID:{
        type:DataTypes.STRING,
        primaryKey:true,
        allowNull:false
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    phone_number:{
        type:DataTypes.STRING,
        allowNull:false
    },
    categorie_ID:{
        type:DataTypes.STRING,
        references:{
            model:Categories,
            key:'categorieID'
        },
        allowNull:false,
        onDelete:'CASCADE',
        onUpdate:'CASCADE',
    },
})

USers.belongsTo(Categories,{
    foreignKey:"categorie_ID",
    targetKey:"categorieID",
    as:"category"
})


export {USers}