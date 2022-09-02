const Role = require("../models/role");
const User = require("../models/user");

const isRoleValid = async (role = "") => {
  const existRole = await Role.findOne({ role });
  if (!existRole) {
    throw new Error(`The role ${role} does not exist at DB`);
  }
};

const emailExist = async (email) => {
  const existEmail = await User.findOne({ email });
  if (existEmail) {
    throw new Error(`Email ${email} already exists`);
  }
};

const userExistById = async (id) => {
  const userExist = await User.findById(id);
  if (!userExist) {
    throw new Error(`The id ${id}: does not exist`);
  }
};

module.exports = {
  isRoleValid,
  emailExist,
  userExistById,
};