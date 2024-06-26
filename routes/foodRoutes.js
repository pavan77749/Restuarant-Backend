import express from "express";
import { requireSignIn } from "../middleware/authMiddleware.js";
import {
  createFoodController,
  getFoodsController,
  getSingleFoodController,
  getFoodRestaurantController,
  updateFoodController,
  deleteFoodController,
  placeOrderController,
  changeOrderStatusController
} from "../controllers/foodController.js";


//router object
const router = express.Router();

//Create food
router.post("/create-food", requireSignIn, createFoodController);

//get all food
router.get("/get-foods", getFoodsController);

//get Single food
router.get("/get-food/:id", getSingleFoodController);

//get food by restaurant
router.get("/get-food-restaurant/:id", getFoodRestaurantController);

//update food
router.put('/update-food/:id', requireSignIn, updateFoodController);

//delete food
router.delete('/delete-food/:id',requireSignIn,deleteFoodController);

//place order
router.post('/place-order', requireSignIn, placeOrderController)

//change the order status
router.post('/orderStatus/:id', requireSignIn,changeOrderStatusController)

export default router;
