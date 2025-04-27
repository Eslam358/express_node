import { Router } from "express";
import { body } from "express-validator";
import {get_All_products, get_product, post_product, patch_product, delete_product} from "../controlles/functons.js"

const Router_cor = Router();
// get
Router_cor.get("/", get_All_products);

Router_cor.get("/Api/product/:id", get_product);

// ------------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------------------
// post

Router_cor.post(
  "/product",
  [
    body("name")
      .notEmpty()
      .withMessage("not name")
      .isLength({ min: 3 })
      .withMessage("min name"),
    body("price")
      .notEmpty()
      .withMessage("not price")
      .isLength({ min: 3 })
      .withMessage("min price"),
  ],
post_product
);


// ------------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------------------
// patch

Router_cor.route("/product/:id").patch( patch_product ).delete( delete_product )

// ------------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------------------
// delete


export default Router_cor;