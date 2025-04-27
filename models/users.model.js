import { Schema, model } from "mongoose";
import validator from "validator";
const kittySchema = new Schema({
  firstName: {
    type: String,
    require: true,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    require: true,
    unique: true,
    validator: [validator.isEmail, "is not email"],
  },
  password: {
    type: String,
    require: true,
  },
  token: {
    type: String,
  },
  avatar: {
    type: String,
    default:"uploads/eslam.png"
  },
  role: {
    type: String,
    enum: ["User", "Admin", "Manger"],
    default: "User",
  },
});

const users = model("users", kittySchema);
export default users;
