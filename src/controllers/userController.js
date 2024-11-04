import { Categories } from "../models/categories.js";
import { USers } from "../models/users.js";
import { v4 as uuidv4 } from 'uuid';


export const Add  = async (req ,res)=>{

    const {name ,phone_number ,categorie_ID } = req.body

    try {
        let error ={} 
        let haserr
    
        if(!name){
            error = "Name is Required!!"
            haserr = true
        }
    
        if(!phone_number){
            error = "phonenumber is Required!!"
            haserr = true
        }else{
            const user = await USers.findOne({
            where:{
                phone_number:phone_number
            }
            })

            if(user){
           return res.status(400).json({status:false ,message:"User phone number Already exist!!"})

            }
        }
    
        if(!categorie_ID){
            error = "phonenumber is Required!!"
            haserr = true
        }else{
            const category = await Categories.findByPk(categorie_ID)
            if(!category){
                error = "Not a valied Category!!"
                haserr = true
            }
        }
    
        if(haserr){
           return res.status(400).json({status:false ,error})
        }
        
        const usersID = uuidv4();

        const user = await USers.create({usersID ,name ,phone_number , categorie_ID})

        res.status(200).json({status:true, message:"user added successfully!!", user})

    } catch (error) {
        res.status(500).json({
            status:true,
            message:"faild",
            err:error
        })
    }
}


export const update = async (req ,res)=>{
    const {id} = req.params
    const {name ,phone_number ,categorie_ID } = req.body

    try {
        
        const user = await USers.findByPk(id)

        if(!user){
            return res.status(404).json({status:false , message:"User Not Found"})
        }

        if(name){
            user.name = name
        }

        if(phone_number){
            const user = await USers.findOne({
                where:{
                    phone_number:phone_number
                }
                })
    
                if(user){
               return res.status(400).json({status:false ,message:"User phone number Already exist!!"})
    
                }
            user.phone_number = phone_number
        }

        if(categorie_ID){
            const category = await Categories.findByPk(categorie_ID)
            if(!category){
                return res.status(404).json({status:false , message:"Category Not Found"})
            }
            user.categorie_ID = categorie_ID
        }

        await user.save()

        res.status(200).json({status:true, message:"user update successfully!!", user})


    } catch (error) {
        res.status(500).json({
            status:true,
            message:"faild",
            err:error
        })
    }

}

export const destroy  = async (req , res )=>{

    const {id} = req.params

    try {

        const user = await USers.findByPk(id)
        if(!user){
            res.status(404).json({message:"User Not Found",status:false})
        }

        await user.destroy();

        res.status(200).json({status:true , message:"User Delete Success!!"})
        
    } catch (error) {
        res.status(500).json({
            status:true,
            message:"faild",
            err:error
        })
    }

}

export const get = async (req ,res )=>{
    try {
        const users = await USers.findAll({
            include: [
                {
                    model: Categories,
                    as: 'category', 
                },
            ]
        }) 

        res.status(200).json({message:"data fetched", status:true , users})
    } catch (error) {
        res.status(500).json({
            status:true,
            message:"faild",
            err:error
        })
    }
}