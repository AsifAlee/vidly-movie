const mongoose = require("mongoose");
const Joi = require("joi");

const Customer = mongoose.model(
  "Customer",
  new mongoose.Schema({
    name: {
      type: String,
      isRequired: true,
    },
    isGold: {
      type: Boolean,
      isRequired: true,
    },
    phone: {
      type: String,
      isRequired: true,
    },
  })
);

function validateCustomer(customerObj) {
  const schema = {
    name: Joi.string().min(3).required(),
    isGold: Joi.boolean().required(),
    phone: Joi.string().min(3).required(),
  };
  return Joi.validate(customerObj, schema);
}

module.exports.Customer = Customer;
module.exports.validateCustomer = validateCustomer;
