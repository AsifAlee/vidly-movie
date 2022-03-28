const Joi = require("joi");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("config");

const schema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    minlength: 5,
    maxlength: 255,
  },
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
  },
  isAdmin: Boolean,
});
schema.methods.generateAuthToken = function () {
  return jwt.sign(
    { _id: this._id, name: this.name, isAdmin: this.isAdmin },
    config.get("jwt_PrivateKey")
  );
};

const User = mongoose.model("User", schema);
const validateUser = (user) => {
  const schema = {
    email: Joi.string().required().email().min(5).max(255),
    name: Joi.string().required().min(5).max(255),
    password: Joi.string().required().min(5).max(255),
  };

  return Joi.validate(user, schema);
};

module.exports.User = User;
module.exports.validateUser = validateUser;
