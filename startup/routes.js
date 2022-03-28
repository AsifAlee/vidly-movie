const express = require("express");
const genres = require("../routes/genres");
const customers = require("../routes/customer");
const movies = require("../routes/movies");
const rentals = require("../routes/rental");
const user = require("../routes/user");
const auth = require("../routes/auth");
const error = require("../middlewares/error");

module.exports = function (app) {
  app.use(express.json());
  app.use("/api/auth", auth);
  app.use("/api/user", user);
  app.use("/api/genres", genres);
  app.use("/api/customers", customers);
  app.use("/api/movies", movies);
  app.use("/api/rentals", rentals);
  app.use(error);
};
