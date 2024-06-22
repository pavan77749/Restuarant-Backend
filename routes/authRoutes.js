import express from "express";
import { registerController,loginController } from "../controllers/authControllers.js";

//router object
const router = express.Router()

//routes
//Register || POST
router.post('/register', registerController)

router.post('/login',loginController)


export default router