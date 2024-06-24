import express from 'express'
import colors from 'colors'
import cors from 'cors'
import morgan from 'morgan'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import testRoutes from './routes/testRoutes.js'
import authRoutes from './routes/authRoutes.js'
import userRoutes from './routes/userRoutes.js'
import restaurantRoutes from './routes/restaurantRoutes.js'
import categoryRoutes from './routes/categoryRoutes.js'


//rest object
const app = express()

//middlewares
app.use(cors())
app.use(express.json())
app.use(morgan('dev')) 

//dot env configuration
dotenv.config()

//connect database
connectDB()

//route
//URL => http:// localhost:8080
app.use('/api/v1/test' , testRoutes)
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/user', userRoutes)
app.use('/api/v1/restaurant', restaurantRoutes)
app.use('/api/v1/category', categoryRoutes)

app.get("/" , (req,res) => {
    return res.status(200).send(`<h1>Welcome to Restaurant Website</h1>`)
})

// PORT 
const PORT = process.env.PORT || 5000

//listen
app.listen(PORT, ()=>{
    console.log(`Server Running on ${PORT} `. bgCyan.white)
})
