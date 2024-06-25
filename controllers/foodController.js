import foodModel from "../model/foodModel.js";
import orderModel from "../model/orderModel.js";

export const createFoodController = async (req, res) => {
  try {
    //get food info
    const {
      title,
      description,
      price,
      imageURL,
      foodTags,
      category,
      code,
      isAvailable,
      restaurant,
      rating,
      totalrating,
    } = req.body;
    if (!title || !description || !price || !restaurant) {
      return res.status(401).send({
        success: false,
        message: "Please provide All the fields",
      });
    }
    const food = new foodModel({
      title,
      description,
      price,
      imageURL,
      foodTags,
      category,
      code,
      isAvailable,
      restaurant,
      rating,
      totalrating,
    }).save();
    res.status(201).send({
      success: true,
      message: "Food created Successfully",
      food,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in creating Food",
      error: error.message,
    });
  }
};

//get all foods
export const getFoodsController = async (req, res) => {
  try {
    //get food id
    const food = await foodModel.find({});
    if (!food) {
      return res.status(404).send({
        success: false,
        message: "Food not found",
      });
    }
    res.status(200).send({
      success: true,
      message: "Food fetched Successfully",
      totalCount: food.length,
      food,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting foods",
      error: error.message,
    });
  }
};

export const getSingleFoodController = async (req, res) => {
  try {
    const foodId = req.params.id;
    if (!foodId) {
      return res.status(404).send({
        success: false,
        message: "Please provide food id",
      });
    }
    const food = await foodModel.findById(foodId);
    if (!food) {
      return res.status(404).send({
        success: false,
        message: "Food not found",
      });
    }
    res.status(200).send({
      success: true,
      message: "Food found Successfully",
      food,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting Single Food",
      error: error.message,
    });
  }
};

//get food by restaurant
export const getFoodRestaurantController = async (req, res) => {
  try {
    //get restaurant id
    const restaurantId = req.params.id;
    if (!restaurantId) {
      return res.status(401).send({
        success: false,
        message: "Please provide restaurantId",
      });
    }
    const food = await foodModel.find({ restaurant: restaurantId });
    if (!food) {
      return res.status(404).send({
        success: false,
        message: "Food not Found",
      });
    }
    res.status(200).send({
      success: true,
      message: "Food fetched by restaurant successfully",
      totalCount: food.length,
      food,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting food by Restaurant",
      error: error.message,
    });
  }
};

export const updateFoodController = async (req, res) => {
  try {
    //get food id
    const foodId = req.params.id;
    if (!foodId) {
      return res.status(401).send({
        success: false,
        message: "Please provide food id",
      });
    }
    const food = await foodModel.findById(foodId);
    if (!food) {
      return res.status(404).send({
        success: false,
        message: "Food not Found",
      });
    }
    const {
      title,
      description,
      price,
      imageURL,
      foodTags,
      category,
      code,
      isAvailable,
      restaurant,
      rating,
      totalrating,
    } = req.body;
    const updateFood = await foodModel.findByIdAndUpdate(foodId, {
      title,
      description,
      price,
      imageURL,
      foodTags,
      category,
      code,
      isAvailable,
      restaurant,
      rating,
      totalrating,
    });
    res.status(200).send({
      success: true,
      message: "Food updated successfully",
      updateFood,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in updating Food",
      error: error.message,
    });
  }
};

//delete food
export const deleteFoodController = async (req,res) => {
    try {
        //get food bby id
        const foodId = req.params.id
        if(!foodId){
            return res.status(401).send({
                success:false,
                message:'Please provide food id'
            })
        }
        const food = await foodModel.findById(foodId)
        if(!food){
            return res.status(404).send({
                success:false,
                message:'Food not Found'
            })
        }
        await foodModel.findByIdAndDelete(foodId)
        res.status(200).send({
            success:true,
            message:'Food deleted Successfully'            
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in deleting food',
            error:error.message
        })
        
    }
}

//place order
export const placeOrderController = async(req,res) => {
    try {
        const {cart} = req.body
        if(!cart){
            return res.status(401).send({
                success:false,
                message:'Cart Not found'
            })
        }
        let total = 0
        cart.map((i)=>{
            total += i.price
        })
        const newOrder = new orderModel({
            foods:cart,
            payment: total,
            buyer: req.body.id,
        })
        await newOrder.save()
        res.status(200).send({
            success:true,
            message:'Order Placed Successfully',
            newOrder
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in placing an Order',
            error:error.message
        })
    }
}

//change order status 
export const changeOrderStatusController = async(req,res) => {
    try {
        const orderId = req.params.id
        if(!orderId){
            return res.status(401).send({
                success:false,
                message:'Order not found'
            })
        }
        const {status} = req.body
        const order = await orderModel.findByIdAndUpdate(
            orderId,
            {status},
            {new:true}
        );
        res.status(200).send({
            success:true,
            message:'Order status changed successfully',
            order
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in changing the order Status',
            error:error.message
        })
    }
}