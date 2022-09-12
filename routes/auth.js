const { Router } = require("express");
const { check } = require("express-validator");

const { login, googleSignIn } = require("../controllers/auth");
const { validateFields } = require("../middlewares");

const router = Router();

router.post(
  "/login",
  [
    check("email", "The email field is mandatory").isEmail(),
    check("password", "The password field is mandatory").notEmpty(),
    validateFields,
  ],
  login
);

router.post(
  "/google",
  [check("id_token", "id_token is required").notEmpty(), validateFields],
  googleSignIn
);

module.exports = router;
