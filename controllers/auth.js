const { response } = require("express");
const bcryptjs = require("bcryptjs");

const User = require("../models/user");
const { generateJWT } = require("../helpers/generate-jwt");
const { googleVerify } = require("../helpers/google-verify");

const login = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    // Verify if the email exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        msg: "User / Password are invalid - email",
      });
    }

    // Is active user
    if (!user.state) {
      return res.status(400).json({
        msg: "User / Password are invalid - state: false",
      });
    }

    // Validate password
    const validPassword = bcryptjs.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        msg: "User / Password are invalid - password",
      });
    }

    // Generate JWT
    const token = await generateJWT(user.id);

    res.json({
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Contact the system administrator",
    });
  }
};

const googleSignIn = async (req, res = response) => {
  const { id_token } = req.body;

  try {
    const { name, img, email } = await googleVerify(id_token);

    // Verify if the email exists
    let user = await User.findOne({ email });
    if (!user) {
      const data = {
        name,
        email,
        password: ":P",
        google: true,
        img,
      };

      user = new User(data);
      await user.save();
    }

    if (!user.state) {
      return res.status(401).json({
        msg: "Contact the system administrator, user blocked",
      });
    }

    const token = await generateJWT(user.id);

    res.json({
      user,
      token,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: "Couldn't verify token",
      error,
    });
  }
};

module.exports = {
  login,
  googleSignIn,
};
