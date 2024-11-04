// db.js
import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'


dotenv.config()

const DB_NAME = process.env.DB_NAME
const DB_USERNAME = process.env.DB_USERNAME
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_HOST = process.env.DB_HOST
const DB_PORT = process.env.DB_PORT

const sequelize = new Sequelize(
  DB_NAME, 
  DB_USERNAME,  
  DB_PASSWORD,    
  {
    host: DB_HOST,  
    port:DB_PORT,  
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
          require: true, // Enforce SSL connection
          rejectUnauthorized: false // Allow self-signed certificates
        }
      },
      logging: false, // Disable logging if you don’t want SQL statements in the console
    // }
  }
); 


const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    // Sync all models
    await sequelize.sync({ alter: true });  
    console.log('Database synchronized.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};



export {sequelize , connectDB};
