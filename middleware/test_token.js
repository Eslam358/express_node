import jwt from "jsonwebtoken";
import asyncFun from "../middleware/asyncwrapper.js";
export default asyncFun(async (req, res, next) => {
  const header_token = req.headers.Authorization || req.headers.authorization;
  const token = header_token.split(" ")[1];

  const token_T = jwt.verify(token, process.env.Eslam_TOKEN);
  req.token_T = token_T;
  next();
});
