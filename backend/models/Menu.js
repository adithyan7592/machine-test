import mongoose from "mongoose";

const menuSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
});

export default mongoose.model("Menu", menuSchema);
