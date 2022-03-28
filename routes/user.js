const express = require("express");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const { User, validateUser } = require("../models/user");
const auth = require("../middlewares/auth");
const router = express.Router();

router.get("/me", auth, async (req, res) => {
  const uid = req.user._id;
  const user = await User.findById(uid).select("-password");
  res.send(user);
});

router.get("/:id", async (req, res) => {});

router.post("/", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) {
    return res.send(error.details[0].message);
  }
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already exist with this email");
  user = new User(_.pick(req.body, ["name", "email", "password"]));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  const token = user.generateAuthToken();
  await user.save();
  res.header("x-auth-token", token).send(_.pick(user, ["name", "email"]));
});

router.put("/:id", async (req, res) => {});

router.delete("/", async (req, res) => {});

module.exports = router;
