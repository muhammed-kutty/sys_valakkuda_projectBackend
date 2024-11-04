import express from 'express'
import { Add, destroy, get, update } from '../controllers/userController.js'
import { verifyToken } from '../middleware/Jwt.js'


export const userRoute = express.Router()

userRoute.get('/user',verifyToken,get)
userRoute.post('/user',verifyToken,Add)
userRoute.put('/user/:id',verifyToken,update)
userRoute.delete('/user/:id',verifyToken,destroy)