const express = require("express");
const router = express.Router();
const { Genres } = require("../models/genre");
const { validateMovie, Movie } = require("../models/movies");

router.get("/", async (req, res) => {
  try {
    const movies = await Movie.find();
    res.send(movies);
  } catch (error) {
    console.log(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const movie = await Movie.findById({ _id: req.params.id });
    if (!movie) res.status(400).send("Movie not found");
    res.send(movie);
  } catch (error) {
    console.log(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const genre = await Genres.findById(req.body.genreId);
    console.log("genre is :", genre);
    if (!genre) return res.status(404).send("Invalid Genre");

    const { error } = validateMovie(req.body);
    if (error) return res.send(error.details[0].message);

    let movie = new Movie({
      title: req.body.title,
      genre: genre,
      numberInStock: req.body.numberInStock,
      dailyRentalRate: req.body.dailyRentalRate,
    });
    const result = await movie.save();
    res.send(result);
  } catch (error) {
    console.log(error);
  }
});

router.put("/:id", async (req, res) => {
  const movie = Movie.findByIdAndUpdate(req.params.id, {});
});

router.delete("/:id", async (req, res) => {
  try {
    const movie = await Movie.findByIdAndRemove(req.params.id);
    if (!movie) return res.status(404).send("Movie  Not found");
    res.send(movie);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
