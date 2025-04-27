
import express from "express";
import cors from "cors";
import path from "path";

import Router_cor from "./routes/medawar.js";
import users_Router from "./routes/users.js"

import dotenv from "dotenv";
dotenv.config();


// const __dirname = path.resolve();



import mongoose from "mongoose";
const app = express();
const port = 3000;

// app.use("/uploads", express.static(path.join(__dirname, "uploads")))


const url = process.env.Eslam_A;

mongoose.connect(url).then((a) => {
  console.log("mongodb");
}).catch((err)=>{
  console.log("err",err);
  
})


// app.use(cors());
// app.use(express.json());
app.use("/", Router_cor);
// app.use("/", users_Router);



// app.all("*", (req, res, next) => {

//   return res.send("ooooooooooooo All * not found");
// });

// app.use((er, req, res, next) => {
//   console.log("error358")

//   res.status(er.statecode || 500).json({state:"Error", Data:er.statetext, message: er.message})
// });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
