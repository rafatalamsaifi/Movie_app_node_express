const express = require("express");
const movieData = require("./movieData.json");
const router = express.Router();
const Joi = require("joi");
const validator = require("express-joi-validation").createValidator({});

const bodySchema = Joi.object({
  title: Joi.string().required(),
  release_date: Joi.date().required(),
  vote_average: Joi.number().required(),
  movie_id: Joi.number().integer().required(),
});

router.get("/", (req, res) => {
  try {
    res.json(movieData);
  } catch (error) {
    const errorResponse = { err: error.message };
    res.status(500).json(errorResponse);
  }
});

router.get("/:id", (req, res) => {
  try {
    const movie_id = req.params.id;
    const movie = movieData.find((movie) => movie.movie_id == movie_id);
    res.json(movie);
  } catch (error) {
    const errorResponse = { err: error.message };
    res.status(500).json(errorResponse);
  }
});

router.post("/", validator.body(bodySchema), (req, res) => {
  try {
    const myBody = req.body;
    movieData.push(myBody);
    res.json({ message: "Data added sucessfully" });
  } catch (error) {
    const errorResponse = { err: error.message };
    res.status(500).json(errorResponse);
  }
});

module.exports = router;
