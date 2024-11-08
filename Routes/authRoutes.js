import express from 'express'
import { login, verify } from "../controllers/authCOntroller.js";
import { verifyToken } from '../middleware/Jwt.js';

const authRoute = express.Router()

authRoute.post('/login',login)
authRoute.get('/verify',verifyToken,verify)

export {authRoute}