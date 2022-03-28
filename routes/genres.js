const express = require("express");
const router = express.Router();
const { Genres, validateGenre } = require("../models/genre");
const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");

const validateObjectId = require("../middlewares/validateObjectId");

router.get("/", async (req, res, next) => {
  const result = await Genres.find();
  res.send(result);
});

router.get("/:id", validateObjectId, async (req, res) => {
  const result = await Genres.find({ _id: req.params.id });
  console.log("found result is:", result);
  res.send(result);
});

router.post("/", auth, async (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const newGenre = new Genres({
    name: req.body.name,
  });
  const result = await newGenre.save();
  res.send(result);
});

router.put("/:id", async (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) {
    return res.send(error.details[0].message);
  }
  const genre = await Genres.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );
  if (!genre) return res.status(404).send("Genre Not found");
  res.send(genre);
});

router.delete("/:id", [auth, admin], async (req, res) => {
  const genre = await Genres.findByIdAndRemove(req.params.id);
  if (!genre) return res.status(404).send("Genre Not found");

  res.send(genre);
});

module.exports = router;
