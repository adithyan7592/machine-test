import express from "express";
import { createMenu, getMenus, getMenuById } from "../controllers/menucontroller.js";

const router = express.Router();

// Create a menu
router.post("/", createMenu);

// Get all menus
router.get("/", getMenus);

// Get a menu by ID
router.get("/:id", getMenuById);

export default router;
