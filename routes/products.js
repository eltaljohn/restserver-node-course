const { Router } = require("express");
const { check } = require("express-validator");
const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/products");
const {
  productExistById,
  categoryExistById,
} = require("../helpers/db-validators");

const { validateFields, validateJWT, isAdminRole } = require("../middlewares");

const router = Router();

router.get("/", getProducts);

router.get(
  "/:id",
  [check("id", "it's not a valid mongo id").isMongoId(), validateFields],
  getProductById
);

router.post(
  "/",
  [
    validateJWT,
    check("name", "name field is mandatory").notEmpty(),
    check("category", "category field is mandatory").notEmpty(),
    check("category", "It's an inavalid Mongo Id").isMongoId(),
    check("category").custom(categoryExistById),
    validateFields,
  ],
  createProduct
);

router.put(
  "/:id",
  [
    validateJWT,
    check("id", "it's not a valid mongo id").isMongoId(),
    check("id").custom(productExistById),
    check("category", "It's an inavalid Mongo Id").isMongoId(),
    check("category").custom(categoryExistById),
    validateFields,
  ],
  updateProduct
);

router.delete(
  "/:id",
  [
    validateJWT,
    isAdminRole,
    check("id", "it's not a valid mongo id").isMongoId(),
    check("id").custom(productExistById),
    validateFields,
  ],
  deleteProduct
);

module.exports = router;
