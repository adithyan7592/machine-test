import Menu from "../models/Menu.js";

export const createMenu = async (req, res) => {
  try {
    const { name, description } = req.body;
    const newMenu = new Menu({ name, description });
    const savedMenu = await newMenu.save();
    res.status(201).json(savedMenu);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getMenus = async (req, res) => {
  try {
    const menus = await Menu.find();
    res.status(200).json(menus);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getMenuById = async (req, res) => {
  try {
    const { id } = req.params;
    const menu = await Menu.findById(id);
    if (!menu) {
      return res.status(404).json({ message: "Menu not found" });
    }
    res.status(200).json(menu);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
