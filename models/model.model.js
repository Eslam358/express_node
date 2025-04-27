import { Schema, model } from "mongoose";

const kittySchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  price: {
    type: String,
    require: true,
  },
});

const mondo = model("mondo", kittySchema);
export default mondo;
