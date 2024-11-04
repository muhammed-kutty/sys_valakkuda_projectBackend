import jwt from 'jsonwebtoken';
import {config} from 'dotenv'

config()

const JWT_SECRET =process.env.JWT_SECRET; 


export const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  // console.log(req.headers) 
  if (!token) {
    return res.status(403).json({isValied:false, message: 'Token is required' });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({isValied:false, message: 'Token has expired' });
          }
      return res.status(401).json({isValied:false, message: 'Unauthorized' });
    }
    if(decoded.username !== 'sysVKD@gmail.com'){
      return res.status(401).json({isValied:false, message: 'Unauthorized' });
    }
    req.username = decoded.username;
    // console.log("imn middleware////")
    req.isValied = true // Save user ID for further use
    next();
  });
};
