const { Router } = require("express");
const { check } = require("express-validator");
const {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categories");
const { categoryExistById } = require("../helpers/db-validators");

const { validateFields, validateJWT, isAdminRole } = require("../middlewares");

const router = Router();

router.get("/", getCategories);

router.get(
  "/:id",
  [
    check("id", "Is not a Mongo's valid id").isMongoId(),
    check("id").custom(categoryExistById),
    validateFields,
  ],
  getCategory
);

router.post(
  "/",
  [
    validateJWT,
    check("name", "The name is mandatory").notEmpty(),
    validateFields,
  ],
  createCategory
);

router.put(
  "/:id",
  [
    validateJWT,
    check("id", "Is not a Mongo's valid id").isMongoId(),
    check("id").custom(categoryExistById),
    validateFields,
  ],
  updateCategory
);

router.delete(
  "/:id",
  [
    validateJWT,
    isAdminRole,
    check("id", "Is not a Mongo's valid id").isMongoId(),
    check("id").custom(categoryExistById),
    validateFields,
  ],
  deleteCategory
);

module.exports = router;
