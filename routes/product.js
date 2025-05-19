import { Router } from "express";

import {
  productValidator,
  validationResult_fun,
} from "../utilities/validator.js";
import test_token from "../middleware/test_token.js";
import alwed from "../middleware/alwed.js";
import {
  get_All_products,
  get_product,
  post_product,
  patch_product,
  delete_product,
} from "../controlles/functons.js"; //controllers

const Router_cor = Router();
// get
Router_cor.get("/", test_token, alwed("User"), get_All_products);

Router_cor.get("/Api/product/:id", get_product);

// -------------------- creat new product -------------------------------------------

Router_cor.post(
 
  "/product",
  test_token,
  productValidator,
  validationResult_fun,
  post_product
);

// ------------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------------------
// patch

Router_cor.route("/product/:id").patch(patch_product).delete(delete_product);

// ------------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------------------
// delete

export default Router_cor;
