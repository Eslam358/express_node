import mondo from "../models/model.model.js";
import ErrorApp from "../utilities/apperror.js";

import asyncFun from "../middleware/asyncwrapper.js";

// .......................................................................................

const get_All_products = asyncFun(async (req, res) => {
  const limit = req.query.limit || 4;
  const skip = req.query.skip ? (req.query.skip - 1) * limit : limit;
  const posts = await mondo.find({}, { __v: false }).limit(limit).skip(skip);
  res.json({
    status: "success",
    data: {
      posts,
    },
  });
});

const get_product = asyncFun(async (req, res, next) => {
  const user = await mondo.findById(req.params.id);
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

const post_product = asyncFun(async (req, res) => {
  const newCorse = new mondo(req.body);
  await newCorse.save();
  res.json(newCorse);
});

// .......................................................................................

const patch_product = asyncFun(async (req, res) => {
  const AA = await mondo.updateOne(
    { _id: req.params.id },
    {
      $set: { ...req.body },
    }
  );
  console.log("erroAAr", req.params.id);
  return res.send(AA);
});
// .......................................................................................

const delete_product = asyncFun(async (req, res) => {
  console.log("delete");
  const product_id = req.params.id;

  let products = await mondo.deleteOne({ _id: product_id });

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
