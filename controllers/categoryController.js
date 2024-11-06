import { Categories } from "../models/categories.js";
import { v4 as uuidv4 } from 'uuid';


export const addCategory = async (req , res)=>{
try {
    
    const {name } = req.body

    if(!name){
        return res.status(400).json({status:false,message:"Name is required !!"})
    }else{
        const category = await Categories.findOne({
            where:{
                name:name
            }
        })
        if(category){
           return res.status(400).json({status:false,message:"category already exist!!"})
        }
    }

    const categorieID = uuidv4(); 

    const category = await Categories.create({categorieID , name})
    res.status(200).json({status:true,message:"categry added successfully",category})

} catch (error) {
    res.status(500).json({
        message:"faild",
        err:error
    })
}
}


export const updateCategory = async (req,res)=>{
    const {id} = req.params
    const {name} = req.body

    try {
        const editcategory = await Categories.findByPk(id)
        console.log("api at cate update",editcategory)
        
        if(!editcategory){
          return  res.status(404).json({status:false,message:"Category Not Found"})
        }
        
        if(name){
            const category = await Categories.findOne({
                where:{
                    name:name
                }
            })
            if(category){
              return  res.status(400).json({status:false,message:"category already exist!!"})
            }
            
            editcategory.name = name
            await editcategory.save();
            console.log("updated")
            res.status(200).json({status:true,message:"category updated successfully!!", editcategory})
        }

    } catch (error) { 
        console.error("Error occurred:", error); // Log the error on the server side for debugging
        res.status(500).json({
        message: "Failed to process the request",
        error: error.message || "Internal Server Error"
        })
    }
}

export const deleteCategory = async (req, res)=>{
    const {id} = req.params

    try {
        const category = await Categories.findByPk(id)
        
        if(!category){
          return  res.status(404).json({status:false , message:"Category Not Found"})
        }
        
        await category.destroy();

        res.status(200).json({ status:true,message:"category deleted successfully!!", category})
    } catch (error) {
        res.status(500).json({
            message:"faild",
            err:error
        })
    }
}

export const getAllcategory = async (req, res)=>{

    try {
        console.log("api called")
        const categories = await Categories.findAll();
     
        res.status(200).json({message:"all getegories",categories})

    } catch (error) {
        res.status(500).json({
            message:"faild",
            err:error
        })
    }
}