const Joi = require("joi");

const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  customer: new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    isGold: {
      type: Boolean,
      required: true,
    },
  }),
  movie: new mongoose.Schema({
    title: {
      type: String,
      minlength: 3,
      maxlength: 255,
      required: true,
    },
    numberInStock: {
      type: Number,
      min: 0,
      max: 255,
      required: true,
    },
    dailyRentalRate: {
      type: Number,
      min: 0,
      max: 255,
      required: true,
    },
    dateOut: {
      type: Date,
      required: true,
      default: Date.now,
    },
    dateReturned: {
      type: Date,
    },
    rentalFee: {
      type: Number,
      min: 0,
    },
  }),
});

const Rental = mongoose.model("Rental", schema);
const validateRental = (rental) => {
  const schema = {
    movieId: Joi.objectId().required(),
    customerId: Joi.objectId().required(),
  };
  return Joi.validate(rental, schema);
};

module.exports.Rental = Rental;
module.exports.validateRental = validateRental;
