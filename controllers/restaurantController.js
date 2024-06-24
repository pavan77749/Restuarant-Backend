import restaurantModel from "../model/restaurantModel.js";

export const createRestaurantController = async (req, res) => {
  try {
    const {
      title,
      imageURL,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      code,
      coords,
    } = req.body;
    //validation
    if(!title || !coords){
        return res.status(500).send({
            success:false,
            message:'Please provide the title and address',
            
        })
    }
      //check user
      const exisitingRestaurant = await restaurantModel.findOne({ title });
      //existing user
      if (exisitingRestaurant) {
        return res.status(200).send({
          success: false,
          message: "Restaurant Already exists",
        });
      }
    const newRestaurant = new restaurantModel({
        title,
        imageURL,
        foods,
        time,
        pickup,
        delivery,
        isOpen,
        logoUrl,
        rating,
        ratingCount,
        code,
        coords,
    })
    await newRestaurant.save()
    res.status(201).send({
        success:true,
        message:"Restaurant Created Successfully",
        newRestaurant
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Creating Restaurant",
      error: error.message,
    });
  }
};

export const getRestaurantController = async(req,res) => {
    try {
        //get restaurant 
        const restaurants = await restaurantModel.find({})
        //validation
        if(!restaurants){
            res.status(404).send({
                success:false,
                message:'Restaurant not Found'
            })
        }
        res.status(200).send({
            success:true,
            totalCount:restaurants.length,
            restaurants
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in Getting Restaurant',
            error:error.message
        })
        
    }
}

// Get Single Restaurant 
export const getSingleRestaurantController = async(req,res) => {
    try {
        const restaurantId = req.params.id
        //find restaurant
        if(!restaurantId){
            return res.status(404).send({
                success:false,
                message:'Please Provide restaurant Id'
            })
        }
        const restaurant = await restaurantModel.findById(restaurantId)
        if(!restaurant){
            return res.status(404).send({
                success:false,
                message:'Restaurant not Found',
            })
        }
        res.status(200).send({
            success:true,
            message:'Restaurant found Successfully',
            restaurant
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in Finding Single Restaurant ',
            error:error.message
        })
        
    }
}

export const deleteRestaurantController = async(req,res) => {
    try {
        const restaurantId = req.params.rid
        console.log(restaurantId)
        if(!restaurantId ){
            return res.status(404).send({
                success:false,
                message:'Restaurant Not Found'
            })
        }
        await restaurantModel.findOneAndDelete(restaurantId)
        res.status(200).send({
            success:true,
            message:'Restaurant Deleted Successfully',
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Restaurant Deleted Successfully',
            error:error.message
        })
        
    }
}