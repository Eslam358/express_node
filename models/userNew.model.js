import { Schema, model } from "mongoose";
import validator from "validator";

const newUserSchema = new Schema({
  name: {
    type: String,

    required: [true, "Name is required"],
     minlength: [3, "Name must be at least 3 characters long"],
     maxlength: [20, "Name must be at most 20 characters long"],
     trim: true,
     validate: {
      validator: function (value) {
        return /^[a-zA-Z\u0600-\u06FF\s]+$/.test(value);
      },
      message: "Name must contain only letters and use language Arabic or English",
    }

  },
  email: {
    type: String,
    required: true,
    unique: true,
        validate: {
      validator: function (value) {
        return validator.isEmail(value);
      },
      message: "Invalid email format",
    },
  },
  password: {
    type: String,
      required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters"],
  },
  role: {
    type: String,
       required: [true, "Role is required"],
      enum: {
      values: ["User", "Admin", "Manger"],
      message: "{VALUE} is not supported",
    },
    default: "User",
  },
  avatar: {
    type: String,
    default: "uploads/eslam.png",
  },
});

const user = model("newUser", newUserSchema);
export default user;
