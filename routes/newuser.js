import newUser from "../models/userNew.model.js";
import { Router } from "express";
import error from "../utilities/apperror.js";
import token from "../utilities/token_JWT.js";
import bcrypt from "bcryptjs";
import multer from "multer";
import { register } from "../controller/fu_new_user.js";
import { registerValidator,loginValidator, validationResult_fun } from "../utilities/validator.js";

const newUserRouter = Router();


// newUserRouter.get("/", async (req, res) => {
//   const A = await newUser.find();
//   console.log(A);

//   res.send("hi new User");
// });

// -------------------- login -------------------------------------------
newUserRouter.post("/logIn",loginValidator,validationResult_fun, async (req, res) => {
  const { password, email } = req.body;
  const user = await newUser.findOne({ email });

  if (!user) {
    return res.send("no user");
  }

  const password3 = await bcrypt.compare(password, user.password);

  if (!password3) {
    return res.send("something wrong");
  }
  const newToken = await token({
    name: user.name,
    email: user.email,
    role: user.role,
  },res);

  res.json({ user, st: password3, pas: password3, token: newToken });
});

// -------------------- register -------------------------------------------

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + file.originalname);
  },
});
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(error.creat("Only images are allowed", 400, "error"), false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

newUserRouter.post("/register", upload.single("avatar"),registerValidator,validationResult_fun, register);



export default newUserRouter;
