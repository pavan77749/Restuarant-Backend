import express from 'express'
import { getUserController } from '../controllers/userController.js'
import { requireSignIn } from '../middleware/authMiddleware.js'
import { updateUserController } from '../controllers/userController.js'

//router object
const router = express.Router()

//routes
//Get USER || GET
router.get('/get-user',requireSignIn, getUserController)

//UPDATE USER
router.put('/updateUser', requireSignIn, updateUserController)

export default router