import express from 'express'
import colors from 'colors'
import cors from 'cors'
import morgan from 'morgan'
import dotenv from 'dotenv'
import testRoutes from './routes/testRoutes.js'
import connectDB from './config/db.js'


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

app.get("/" , (req,res) => {
    return res.status(200).send(`<h1>Welcome to Restaurant Website</h1>`)
})

// PORT 
const PORT = process.env.PORT || 5000

//listen
app.listen(PORT, ()=>{
    console.log(`Server Running on ${PORT} `. bgCyan.white)
})
