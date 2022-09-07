const { Router } = require("express");
const { check } = require("express-validator");

const {
  validateFields,
  validateJWT,
  isAdminRole,
  haveRole,
} = require("../middlewares");

const {
  isRoleValid,
  emailExist,
  userExistById,
} = require("../helpers/db-validators");

const {
  usersGet,
  usersPost,
  usersPut,
  usersDelete,
  usersPatch,
} = require("../controllers/users");

const router = Router();

router.get("/", usersGet);

router.put(
  "/:id",
  [
    check("id", "Is not a valid id").isMongoId(),
    check("id").custom(userExistById),
    check("role").custom(isRoleValid),
    validateFields,
  ],
  usersPut
);

router.post(
  "/",
  [
    check("name", "Invalid name").notEmpty(),
    check("password", "Invalid password, min length 6").isLength({ min: 6 }),
    check("email", "Email is invalid").isEmail(),
    check("email").custom(emailExist),
    // check("rol", "Invalid role not allowed").isIn(["ADMIN_ROLE", "USER_ROLE"]),
    check("role").custom(isRoleValid),
    validateFields,
  ],
  usersPost
);

router.delete(
  "/:id",
  [
    validateJWT,
    // isAdminRole,
    haveRole("ADMIN_ROLE", "SALES_ROLE"),
    check("id", "Is not a valid id").isMongoId(),
    check("id").custom(userExistById),
    validateFields,
  ],
  usersDelete
);

router.patch("/", usersPatch);

module.exports = router;
