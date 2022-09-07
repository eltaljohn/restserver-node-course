const { request, response } = require("express");

const isAdminRole = (req = request, res = response, next) => {
  if (!req.userAuth) {
    return res.status(500).json({
      msg: "Verify the token first before to check the role",
    });
  }

  const { role, name } = req.userAuth;
  if (role !== "ADMIN_ROLE") {
    return res.status(401).json({
      msg: `${name} is not admin - Could not do this`,
    });
  }

  next();
};

const haveRole = (...roles) => {
  return (req = request, res = response, next) => {
    if (!req.userAuth) {
      return res.status(500).json({
        msg: "Verify the token first before to check the role",
      });
    }

    if (!roles.includes(req.userAuth.role)) {
      return res.status(401).json({
        msg: `The service require one of these roles ${roles}`,
      });
    }

    next();
  };
};

module.exports = {
  isAdminRole,
  haveRole,
};
