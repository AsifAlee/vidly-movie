const Joi = require("joi");
const confiq = require("config");
const express = require("express");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models/user");

const router = express.Router();

router.get("/", async (req, res) => {});

router.get("/:id", async (req, res) => {});

router.post("/", async (req, res) => {
  const { error } = validateLogin(req.body);
  if (error) {
    return res.send(error.details[0].message);
  }
  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password");
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid email or password");
  const token = user.generateAuthToken();
  res.send(token);
});

router.put("/:id", async (req, res) => {});

router.delete("/", async (req, res) => {});

const validateLogin = (user) => {
  const schema = {
    email: Joi.string().required().min(5).max(255).email(),
    password: Joi.string().required().min(5).max(255),
  };

  return Joi.validate(user, schema);
};
module.exports = router;
