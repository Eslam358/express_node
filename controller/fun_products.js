import Product from "../models/model.model.js";
import ErrorApp from "../utilities/apperror.js";

import asyncFun from "../middleware/asyncwrapper.js";

// .......................................................................................

const get_All_products = asyncFun(async (req, res) => {
  const limit = req.query.limit || 4;
  const skip = req.query.skip ? (req.query.skip - 1) * limit : 0;

  const posts = await Product.find( { __v: false }).limit(limit).skip(skip);
  res.json({
    status: "success",
    data: {
      posts,
    },
  });
});

const get_product = asyncFun(async (req, res, next) => {
  const user = await Product.findById(req.params.id);
  if (!user) {
    const error = ErrorApp.creat("not found project", 404, "false");
    return next(error);
  }
  res.json({
    status: "success",
    data: {
      user,
    },
  });
});

// .......................................................................................

const post_product = async (req, res) => {
  const newCorse = new Product(req.body);
  const AA = await newCorse.save();
  console.log("post_product2:::", AA);
  res.json(newCorse);
};

// .......................................................................................


const patch_product = asyncFun(async (req, res,next) => {
    const item = await Product.findById(req.params.id);
if (!item) {
    const error = ErrorApp.creat("not found project", 404, "false");
    return next(error);
}
  const AA = await Product.updateOne(
    { _id: req.params.id },
    {
      $set: { ...req.body },
    }
  );
  return res.send(AA);
});
// .......................................................................................

const delete_product = asyncFun(async (req, res,next) => {
   const product_id = req.params.id;
     const item = await Product.findById(product_id);
if (!item) {
    const error = ErrorApp.creat("not found project", 404, "false");
    return next(error);
}

 

  let products = await Product.deleteOne({ _id: product_id });

  return res.send(products);
});

// .......................................................................................

export {
  get_All_products,
  get_product,
  post_product,
  patch_product,
  delete_product,
};
