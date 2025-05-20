 import newUser from "../models/userNew.model.js";
 import token from "../utilities/token_JWT.js";
 import hashPassword from "../utilities/hashPathword.js";
 import fs from "fs/promises";


 export const register = async (req, res) => {

 try {
    const { name, email, password:pass, role } = req.body;
    
    const password = await hashPassword(pass);

    
    const A = await newUser.create({
      name,
      email,
      password,
      role,
      avatar: req.file.filename,
    });
    
    const newToken = await token({
      name,
      email,
      role,
    },res); 

   
      res.json({ user: A, token: newToken });
  } catch (error) {
    if (req.file?.filename) {
      try {
        await fs.unlink(`uploads/${req.file.filename}`);
      } catch (err) {
        console.error("❌ Failed to delete uploaded file:", err.message);
      }
    }
    res.json(error);
  }
}