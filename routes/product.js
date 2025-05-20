import { Router } from "express";

import {
  productValidator,
  productValidatorPatch,
  validationResult_fun,
} from "../utilities/validator.js";
import test_token from "../middleware/test_token.js";
import lawedRole from "../middleware/lawedRole.js";
import {
  get_All_products,
  get_product,
  post_product,
  patch_product,
  delete_product,
} from "../controller/fun_products.js"; //controllers

const Router_cor = Router();
// get
Router_cor.get("/", test_token, lawedRole("User", "Admin"), get_All_products);

Router_cor.get("/Api/product/:id", get_product);

// -------------------- creat new product -------------------------------------------

Router_cor.post(
  "/product",

  test_token,
  lawedRole("Admin"),
  productValidator,
  validationResult_fun,
  post_product
);

// patch


Router_cor.route("/product/:id")
  .all(test_token, lawedRole("Admin"))
  .patch(productValidatorPatch, validationResult_fun, patch_product)
  .delete(delete_product);

// ------------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------------------
// delete

export default Router_cor;
