import { body, validationResult } from "express-validator";
import fs from "fs/promises";

export const registerValidator = [
  body("name")
    .notEmpty()
    .withMessage("not name")
    .isLength({ min: 3 })
    .withMessage("min name"),
  body("email")
    .notEmpty()
    .withMessage("not email")
    .isEmail()
    .withMessage("not email"),
  body("password")
    .notEmpty()
    .withMessage("not password")
    .isLength({ min: 6 })
    .withMessage("min password"),
];

export const loginValidator = [
  body("email")
    .notEmpty()
    .withMessage("not email")
    .isEmail()
    .withMessage("not email"),
  body("password")
    .notEmpty()
    .withMessage("not password")
    .isLength({ min: 6 })
    .withMessage("min password"),
];

export const productValidator = [
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
];
export const productValidatorPatch = [
  body("name")
    .optional()

    .isLength({ min: 3 })
    .withMessage("min name"),
  body("price").optional().isLength({ min: 3 }).withMessage("min price"),
];

// ------------------- functionality -------------------
export async function validationResult_fun(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    if (req.file?.filename) {
      try {
        await fs.unlink(`uploads/${req.file.filename}`);
      } catch (err) {
        console.error("❌ Failed to delete uploaded file:", err.message);
      }
    }
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}
