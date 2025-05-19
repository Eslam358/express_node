import jwt from "jsonwebtoken";
import asyncFun from "../middleware/asyncwrapper.js";
import ErrorApp from "../utilities/apperror.js";


export default asyncFun(async (req, res, next) => {
  const header_token = req.headers.Authorization || req.headers.authorization;
  console.log("header_token", header_token);
  const token_cook = req.cookies.token;
  console.log("token_cook", token_cook);

  const token = header_token?.split(" ")[1] || token_cook;

  if (!token) {
    const error = ErrorApp.creat("not token token, !token", 404, "false");
    return next(error);
  }

  // eslint-disable-next-line no-undef
  const token_T = jwt.verify(token, process.env.Eslam_TOKEN);
  console.log(token_T)
  req.token_T = token_T;
  
  next();
});



