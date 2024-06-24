import express from "express";
import { requireSignIn } from "../middleware/authMiddleware.js";
import {
  createRestaurantController,
  getRestaurantController,
  getSingleRestaurantController,
  deleteRestaurantController
} from "../controllers/restaurantController.js";

//router Object
const router = express.Router();

//routes
//CREATE RESTAURANT
router.post("/create-restaurant", requireSignIn, createRestaurantController);

//GET ALL RESTAURANT
router.get("/get-restaurants", getRestaurantController);

//GET RESTAURANT BY ID
router.get("/get-restaurant/:id", getSingleRestaurantController);

//DELETE RESTAURANT
router.delete('/delete-restaurant/:rid', requireSignIn, deleteRestaurantController)

export default router;
