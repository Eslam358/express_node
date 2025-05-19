import { Schema, model } from "mongoose";
// "products";
const productSchema = new Schema({
  name: {
    type: String,

    required: [true, "Name is required"],
  },
  price: {
    type: String,
    required: [true, "price is required"],
  },
});

const mondo = model("productSchema", productSchema);
export default mondo;
