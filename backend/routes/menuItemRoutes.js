import express from "express";
import { createMenuItem, getItemsByMenuId } from "../controllers/menuItemController.js";

const router = express.Router();

// Create a menu item
router.post("/", createMenuItem);

// Get items for a specific menu
router.get("/:menuId", getItemsByMenuId);

export default router;
