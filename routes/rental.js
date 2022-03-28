const express = require("express");
const router = express.Router();
const { Movie } = require("../models/movies");
const { Customer } = require("../models/customer");
const { Rental, validateRental } = require("../models/rental");

// const Fawn = require("fawn");
// const mongoose = require("mongoose");

// Fawn.init(mongoose);
router.get("/", async (req, res) => {});

router.get("/:id", async (req, res) => {});

router.post("/", async (req, res) => {
  try {
    const { error } = validateRental(req.body);
    if (error) {
      return res.send(error.details[0].message);
    }
    const movie = await Movie.findById({ _id: req.body.movieId });
    if (!movie) return res.status(400).send("Movie not found");
    const customer = await Customer.findById({ _id: req.body.customerId });
    if (!customer) return res.status(400).send("Customer not found");

    if (movie.numberInStock === 0)
      return res.status(400).send("Movie out of stock");

    const rental = new Rental({
      customer: {
        _id: customer._id,
        name: customer.name,
        isGold: customer.isGold,
        phone: customer.phone,
      },
      movie: {
        _id: movie_id,
        title: movie.title,
        numberInStock: movie.numberInStock,
        dailyRentalRate: movie.dailyRentalRate,
      },
    });
    //transaction
    // new Fawn.Task()
    //   .save("rentals", rental)
    //   .update("movies", { _id: movie._id }, { $inc: { numberInStock: -1 } })
    //   .run();
    await rental.save();
    movie.numberInStock--;
    await movie.save();
    res.send(result);
  } catch (error) {
    console.log(error);
  }
});

router.delete("/", async (req, res) => {});

router.put("/", async (req, res) => {});

module.exports = router;
