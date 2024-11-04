import { Admin } from "../models/admin.js";
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';



const addAdmin = async (req , res)=>{
    try {
        console.log("calledddddddddddddddd",req.body)
        const {name , password} = req.body

        let error ={} 
        let haserr
    
        if(!name){
            error = "Name is Required!!"
            haserr = true
        }
    
        if(!password){
            error = "Password is Required!!"
            haserr = true
        }
    
        if(haserr){
           return res.status(400).json({status:false ,error})
        }
    
        const adminID = uuidv4();
        console.log("Generated UUID:", adminID);
        const hashedPassword = await bcrypt.hash(password, 10);

    
        const NewAdmin = await Admin.create({adminID,name,password:hashedPassword})

        res.status(200).json({message:"Admin User Added Success", NewAdmin})

    } catch (error) {
        res.status(500).json({err:"faild to load",errmsg:error})
    }
   
}

export {addAdmin}