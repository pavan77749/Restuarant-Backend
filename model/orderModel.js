import mongoose from "mongoose";

const orderModel = new mongoose.Schema(
  {
    foods: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Foods",
      },
    ],
    payment: {},
    buyer: 
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    
      status:{
          type:String,
          enum:['preparing','prepared','on the way' , 'delivered'],
          default:'preparing'
      }
  },
  
  
  { timestamps: true }
);

export default mongoose.model("Order", orderModel);
