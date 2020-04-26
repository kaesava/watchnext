const router = require("express").Router();
const Movie = require("../models.mongoose/movie.model");

const Constants = require("../helpers/constants");

const api = require("../helpers/api");


router.get("/:id", function(req, res, next) {
  Movie.findOne({ tId: { $eq: req.params.id } })
    .then(movie => {
      if (movie) {
        res.json(movie);
        //console.log("retrieving locally: " + movie.title);
      } else {
        try {
          //console.log("retrieving remotely");
          api.getMovieDetails(req.params.id).then(response => {
            const newMovie = new Movie(response);
            newMovie
              .save()
              .then(() => res.json(newMovie))
              .catch(err => res.status(400).json("Error: " + err));
          });
        } catch (err) {
          console.log("Error: " + err);
          res.status(400).json("Error: " + err);
        }
      }
    })
    .catch(err => {
      console.log("Error: " + err);
      res.status(400).json("Error: " + err);
    });
});

module.exports = router;
