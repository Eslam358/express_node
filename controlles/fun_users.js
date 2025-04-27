import users from "../models/users.model.js";
import bcrypt from "bcryptjs";
import asyncFun from "../middleware/asyncwrapper.js";
import ErrorApp from "../utilities/apperror.js";
import Token from "../utilities/token_JWT.js";

const getUsers = asyncFun(async (req, res) => {
  const A = await users.find();
  // console.log("uuuu",req.headers.ggg);
  res.json({
    status: "success",
    data: {
      A,
    },
  });
});

// ----------------------------------------------------------------------------------------

const post_user = asyncFun(async (req, res, next) => {
  console.log("kkkkkkkkkkkkkkkk");
  const password = await bcrypt.hash(req.body.password, 10);
  const token = await Token({
    user: req.body.firstName,
    email: req.body.email,
    role: req.body.role,
  });

  const newCorse = new users({
    ...req.body,
    password,
    avatar: req.file.filename,
  });
  // console.log("req.filenamm",req.filenamm);
  console.log("req.file", req.file.filename);
  newCorse.token = token;
  await newCorse.save();
  res.json(newCorse);
});
// ----------------------------------------------------------------------------------------

const log_user = asyncFun(async (req, res, next) => {
  console.log("uuuu", req.headers.ggg);
  const { password, email } = req.body;
  if ((!password, !email)) {
    const error = ErrorApp.creat("not found !password, !email", 404, "false");
    return next(error);
  }

  const user = await users.findOne({ email });

  if (!user) {
    const error = ErrorApp.creat("not found user", 404, "false");
    return next(error);
  }

  const password3 = await bcrypt.compare(password, user.password);

  if (!password3) {
    const error = ErrorApp.creat("not found password3", 404, "false");
    return next(error);
  }
  const token = await Token({
    user: user.firstName,
    role: user.role,
    email: req.body.email,
  });
  res.json(token);
});

// ----------------------------------------------------------------------------------------
export { getUsers, post_user, log_user };
