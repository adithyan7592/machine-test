import MenuItem from "../models/Menuitem.js";

export const createMenuItem = async (req, res) => {
  try {
    const { menuId, name, description, price } = req.body;
    const newMenuItem = new MenuItem({ menuId, name, description, price });
    const savedMenuItem = await newMenuItem.save();
    res.status(201).json(savedMenuItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getItemsByMenuId = async (req, res) => {
    console.log("Fetching items for menuId:", req.params.menuId);
    try {
      const { menuId } = req.params;
      const items = await MenuItem.find({ menuId });
      res.status(200).json(items);
    } catch (error) {
      console.error("Error in getItemsByMenuId:", error);
      res.status(500).json({ error: error.message });
    }
  };
  
