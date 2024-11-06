import express from 'express'
import { Add, destroy, get, getbyCatID, update } from '../controllers/userController.js'
import { verifyToken } from '../middleware/Jwt.js'


export const userRoute = express.Router()

userRoute.get('/user',get)
userRoute.get('/user/:id',getbyCatID)
userRoute.post('/user',Add)
userRoute.put('/user/:id',verifyToken,update)
userRoute.delete('/user/:id',verifyToken,destroy)