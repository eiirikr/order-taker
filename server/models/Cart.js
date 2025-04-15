const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    products: [
      {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
      name: {
        type: String,
        required: [true, "Product name is required"]
      },
      description: {
        type: String,
        required: [true, "Description name is required"]
      },
      quantity :{
        type: Number,
        // required: [true, "Quantity is required"]
      },
      price: {
        type: Number,
        required: [true, "Price is required"]
      },
      addedOn :{
        type: Date,
        default: new Date()
      }
    }
    ],
    orderedProducts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "OrderedProduct",
      },
    ]
});

module.exports = mongoose.model("Cart", cartSchema);