import mongoose from 'mongoose'

//schema
const foodSchema = new mongoose.Schema({
 title:{
    type:String,
    required:[true, 'Food title is required']
 },
 description:{
    type:String,
    required:[true, 'Food description is required']
 },
 price:{
    type:String,
    required:[true, 'Food price is required']
 },
 imageURL:{
    type:String,
    default:'https://image.similarpng.com/very-thumbnail/2021/09/Good-food-logo-design-on-transparent-background-PNG.png'
 },
 foodTags:{
    type:String
 },
 category:{
    type:String
 },
 code:{
    type:String
 },
 isAvailable:{
    type:Boolean,
    default:true
 },
 restaurant:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'restaurant'
 },
 rating:{
    type:Number,
    default:'5',
    min:'1',
    max:'5'
 },
 totalrating:{
    type:String,
 }

},{timestamps:true})

export default mongoose.model('Food',foodSchema)