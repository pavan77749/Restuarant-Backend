import express from 'express'
import { requireSignIn } from '../middleware/authMiddleware.js'
import { createRestaurantController } from '../controllers/restaurantController.js'


//router Object
const router = express.Router()

//routes
//CREATE RESTAURANT
router.post('/create-restaurant' , requireSignIn, createRestaurantController)


export default router