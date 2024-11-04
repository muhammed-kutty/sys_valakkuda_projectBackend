import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { connectDB } from './confiq/DB.js'
connectDB()


import { authRoute } from './Routes/authRoutes.js'
import { categoryRoute } from './Routes/categoryRoute.js'
import { userRoute } from './Routes/userROute.js'


dotenv.config()
const Port = process.env.PORT || 3000 
const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/auth',authRoute)
app.use('/api',categoryRoute)
app.use('/api',userRoute)


app.listen(Port,()=>{
    console.log(`server running at localhost://${Port}`)
})
    