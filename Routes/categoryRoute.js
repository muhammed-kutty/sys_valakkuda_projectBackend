import express from "express";
import { addCategory, deleteCategory, getAllcategory, updateCategory } from "../controllers/categoryController.js";
import { verifyToken } from "../middleware/Jwt.js";

export const categoryRoute = express.Router()

categoryRoute.post('/category',verifyToken,addCategory)
categoryRoute.put('/category/:id',verifyToken,updateCategory)
categoryRoute.delete('/category/:id',verifyToken,deleteCategory)
categoryRoute.get('/category' , getAllcategory)


 