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
