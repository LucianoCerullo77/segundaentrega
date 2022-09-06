const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  products: { type: Array, required: true },
  timestamp: { type: String, required: true },
});

const Cart = mongoose.model("carts", cartSchema);
module.exports = Cart;