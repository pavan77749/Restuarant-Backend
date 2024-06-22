import mongoose from 'mongoose'

//schema
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true, "User Name is required"]
    },
    email:{
        type:String,
        required:[true, "Email is required"]
    },
    phone:{
        type:String,
        required:[true, "Phone is required"]
    },
    password:{
        type:String,
        required:[true, "Password is required"]
    },
    address:{
        type:String,
        required:[true, "Address is required"]
    },
    usertype:{
        type:String,
        required:[true, "UserType is required"],
        default:'client',
        enum:['client','admin','vendor','driver']
    },
    profile:{
        type:String,
        default:'https://imgs.search.brave.com/vwimYLUDcAbT_ZWKjz9DlBVRoovzdUlB7dl-L8ZFB78/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by91/c2VyLXByb2ZpbGUt/ZnJvbnQtc2lkZV8x/ODcyOTktMzk1OTUu/anBnP3NpemU9NjI2/JmV4dD1qcGc'
    }
},{timestamps:true})

export default mongoose.model('User',userSchema)