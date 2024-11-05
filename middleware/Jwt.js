import jwt from 'jsonwebtoken';
import {config} from 'dotenv'

config()

const JWT_SECRET =process.env.JWT_SECRET; 


export const verifyToken = (req, res, next) => {
  // const token = req.headers['authorization']?.split(' ')[1];
  // console.log("in jwt tttttttttttttttttttttttttttt",req.headers['authorization']) 
  const token = req.headers['authorization']?.split(' ')[1];
console.log("Authorization header:", req.headers['authorization']);
console.log("Extracted token:", token);
  if (!token) {
    return res.status(403).json({isValied:false, message: 'Token is required' });
  }
  if (token === "null") {
    return res.status(403).json({isValied:false, message: 'Token is Null' , token });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({isValied:false, message: 'Token has expired',err });
          }
      return res.status(401).json({isValied:false, message: 'Unauthorized',err,token });
    }
    if(decoded.username !== 'sysVKD@gmail.com'){
      return res.status(401).json({isValied:false, message: 'username Not match , unautherised', token });
    }
    req.username = decoded.username;
    // console.log("imn middleware////")
    req.isValied = true // Save user ID for further use
    next();
  });
};
