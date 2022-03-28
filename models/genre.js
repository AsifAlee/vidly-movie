const mongoose = require("mongoose");
const Joi = require("joi");

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
});
const Genres = mongoose.model("Genres", genreSchema);

function validateGenre(body) {
  const schema = {
    name: Joi.string().min(3).max(50).required(),
  };
  return Joi.validate(body, schema);
}

module.exports.Genres = Genres;
module.exports.genreSchema = genreSchema;
module.exports.validateGenre = validateGenre;
