import mongoose from 'mongoose'

//schema
const categorySchema = new mongoose.Schema({
  title:{
    type:String,
    required:[true, 'category title is required']
  },
  imageURL:{
    type:String,
    default:''
  }
},{timestamps:true})

export default mongoose.model('Category',categorySchema)