import { Router } from "express";
import { getUsers, post_user, log_user } from "../controlles/fun_users.js";
import test_token from "../middleware/test_token.js";
import all_owed_token from "../middleware/alwed.js";
import ErrorApp from "../utilities/apperror.js";
// const multer  = require('multer')
import multer from "multer";
// const upload = multer({ dest: 'uploads/' })

// -----------------------------------------------------------------------------
const diskStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix =
      file.fieldname +
      "-" +
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      "." +
      file.mimetype.split("/")[1];

    req.filenamm = uniqueSuffix;

    cb(null, uniqueSuffix);
  },
});
const fileFilter = function (req, file, cb) {

  console.log("fileFilter-11", file.mimetype.split("/")[0]);
  if (file.mimetype.split("/")[0] === "image") {

    cb(null, true);
  } else {
    const error = ErrorApp.creat("not found !image, !email", 404, "false");
    cb(error, false);
  }
};
const upload = multer({ storage: diskStorage, fileFilter: fileFilter });

// -----------------------------------------------------------------------------

const usres_Router = Router();

usres_Router.get(
  "/",
  all_owed_token("Admin", "Manger"),

  
  test_token,
  getUsers
);
usres_Router.post("/user", post_user);
usres_Router.post("/user", upload.single("avatar"), post_user);
// usres_Router.post("/user", log_user);


export default usres_Router;
