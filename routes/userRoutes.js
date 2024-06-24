import express from 'express'
import { getUserController } from '../controllers/userController.js'
import { requireSignIn } from '../middleware/authMiddleware.js'
import { updateUserController, updatePasswordController , resetPasswordController,deleteUserController} from '../controllers/userController.js'

//router object
const router = express.Router()

//routes
//Get USER || GET
router.get('/get-user',requireSignIn, getUserController)

//UPDATE USER
router.put('/updateUser', requireSignIn, updateUserController)

//password update
router.post('/updatePassword', requireSignIn, updatePasswordController)

//Reset Password
router.post('/resetPassword', requireSignIn,resetPasswordController)

//Delete User
router.delete('/deleteUser/:id', requireSignIn, deleteUserController)

export default router