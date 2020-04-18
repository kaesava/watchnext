const router = require("express").Router();
const Search = require("../models.mongoose/search.model");

const api = require("../helpers/api");

router.get("/", function(req, res, next) {
  searchString = req.query.searchString;
  page = Number(req.query.page) || 1;

  if (searchString && page && page >= 1 && page < 100) {
    api.searchPerson(searchString, page)
      .then(response => {
        res.json(response);
      })
      .catch(error => {
        res.status(400).json("Error: " + error);
      });
  } else {
    res.status(400).json("Error: invalid request");
  }
});

router.get("/:id", function(req, res, next) {
  //if req.params.id
  Search.findOne({ movieId: { $eq: req.params.id } })
    .then(search => {
      if (search && search.movieName) {
        responseObject = {
          movieId: req.params.id,
          movieName: search.movieName
        };
        res.json(responseObject);
        console.log("retrieving locally: " + search.movieName);
      } else {
        try {
          console.log("retrieving remotely");
          api.getMovieName(req.params.id).then(response => {
            const newSearch = new Search(response);
            newSearch
              .save()
              .then(() => res.json(responseObject))
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
