import express from "express";
import { requireSignIn } from "../middleware/authMiddleware.js";
import {
  createCategoryController,
  getAllCategoryController,
  updateCategoryController,
  deleteCategoryController
} from "../controllers/categoryController.js";

// router object
const router = express.Router();

//Create Category
router.post("/create-category", requireSignIn, createCategoryController);

//Get all Category
router.get("/get-category", requireSignIn, getAllCategoryController);

//Update Category
router.put("/update-category/:id", requireSignIn, updateCategoryController);

//Delete Category
router.delete('/delete-category/:id', requireSignIn, deleteCategoryController)

export default router;
