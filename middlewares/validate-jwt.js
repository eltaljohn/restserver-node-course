const { response, request } = require("express");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

const validateJWT = async (req = request, res = response, next) => {
  const token = req.header("x-token");
  if (!token) {
    return res.status(401).json({
      msg: "There is not token",
    });
  }

  try {
    const { uid: id } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

    const userAuth = await User.findById(id);

    if (!userAuth) {
      return res.status(401).json({
        msg: "Token not valid - user does not exist in DB",
      });
    }

    // Verify if user is not deleted
    if (!userAuth.state) {
      return res.status(401).json({
        msg: "Token not valid - user with state: false",
      });
    }

    req.userAuth = userAuth;

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ msg: "Invalid token" });
  }
};

module.exports = {
  validateJWT,
};
