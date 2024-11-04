import express from 'express'
import { addAdmin } from '../controllers/adminController.js'

const Adminroute = express.Router()

Adminroute.post('/admin',addAdmin)


export {Adminroute}