import express from "express";
import cors from "cors";
import path from "path";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

import productRouter from "./routes/product.js";
import newUserRouter from "./routes/newuser.js";
import dotenv from "dotenv";

const __dirname = path.resolve();

dotenv.config();

const app = express();
// eslint-disable-next-line no-undef
 const port = process.env.PORT || 3000;

// eslint-disable-next-line no-undef
const url = process.env.Eslam_A;

mongoose
  .connect(url)
  .then(() => {
    console.log("mongodb...........");
  })

  .catch((err) => {
    console.log("err-mongodb---> ", err);
    // eslint-disable-next-line no-undef
    process.exit(1);
  });

app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/newUser", newUserRouter);
// app.use("/Api/users", users_Router);
app.use("/Api/corses", productRouter);
// eslint-disable-next-line no-unused-vars
app.all("*", (req, res) => {
  return res.send("ooooooooooooo All * not found");
});
// eslint-disable-next-line no-unused-vars
app.use((er, req, res, next) => {
  // console.log("error358", er);
  res
    .status(er.statuscode || 500)
    .json({ state: "End->->-Error", Data: er.statuscode, message: er.message ,error:er});
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
