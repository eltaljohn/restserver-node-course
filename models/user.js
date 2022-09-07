const { Schema, model } = require("mongoose");

const UserSchema = Schema({
  name: {
    type: String,
    required: [true, "Mandatory name"],
  },
  email: {
    type: String,
    required: [true, "Mandatory email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Mandatory password"],
  },
  img: {
    type: String,
  },
  role: {
    type: String,
    required: true,
  },
  state: {
    type: Boolean,
    required: true,
  },
  google: {
    type: Boolean,
    required: false,
  },
});

UserSchema.methods.toJSON = function () {
  const { __v, password, _id, ...user } = this.toObject();
  user.uid = _id;
  return user;
};

module.exports = model("User", UserSchema);
