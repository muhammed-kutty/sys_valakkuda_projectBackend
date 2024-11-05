import jwt from 'jsonwebtoken';
import {config} from 'dotenv'

config()

const JWT_SECRET =process.env.JWT_SECRET; 


// Login user
export const login = async (req, res) => {
  console.log("inside Loginddddddddddddddd",req.username)
  try {
    const { username, password } = req.body;

    if (username != 'sysVKD@gmail.com') {
      return res.status(404).json({ message: 'UserName not found' });
    }

    if (password !== 'sysvkd123') {
      return res.status(401).json({ message: 'Invalid password' });
    }

    const token = jwt.sign({ username: username }, JWT_SECRET, { expiresIn: '24h' });

    res.status(200).json({status:true,message:"login success", token });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
};

export const verify = async(req ,res)=>{
  if(req.isValied)
  res.status(200).json({messsage:"token is valied",isValied:req.isValied})
}
