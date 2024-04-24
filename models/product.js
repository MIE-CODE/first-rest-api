const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const GeometrySchema = new Schema({
  type: {
    type: String,
    default: "Point",
  },
  coordinates: {
    type: [Number],
    index: "2dsphere",
  },
});
const ProductSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name field is required"],
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
  },
  available: {
    type: Boolean,
    default: false,
  },
  geometry: {
    type: GeometrySchema,
    index: "2dsphere",
  },
});

const Product = mongoose.model("product", ProductSchema);
Product.createIndexes({ geometry: "2dsphere" });
module.exports = Product;
