import mongoose from 'mongoose'
import colors from 'colors'

const connectDB  = async() =>{
    try {
        const connect = await mongoose.connect(process.env.MONGO_URL)
        console.log(`Connected with MONGODB ${connect.connection.host}`. bgMagenta.white)
    } catch (error) {
        console.log(`Error in MongoDB ${error} Connection` .bgRed.white)
        
    }
}

export default connectDB