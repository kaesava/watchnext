const router = require("express").Router();
const Search = require("../models.mongoose/search.model");
const Genre = require("../models.mongoose/genre.model");

const Constants = require("../helpers/constants");

const api = require("../helpers/api");

router.get("/filter", (req, res, next) => {
  searchString = req.query.searchString || "";
  page = Number(req.query.page) || 1;
  filterType = req.query.filterType || Constants.FILTER_TYPE_PERSON;
  
  apiFilterSearch = (searchString, page, filterType) => {
    api.filterSearch(searchString, page, filterType)
    .then(response => {
      res.json(response);
    })
    .catch(error => {
      res.status(400).json("Error: " + error);
    });
  }

  genreSearch = (searchString) => {
    return Genre.findOne().then((genre) => {
      returnGenres = []
      genre.genres.forEach((genre) => {
        if(genre.name.toLowerCase().indexOf(searchString.toLowerCase()) !== -1) {
          returnGenres.push({
            key: Constants.FILTER_TYPE_GENRE + "." + genre.tId,
            type: Constants.FILTER_TYPE_GENRE,
            tId: genre.tId,
            name: genre.name
          })
        }
      })
      return returnGenres;
    })
  } 

  refreshGenresFromAPI = () => {
    return (Genre.deleteOne({key: 1})
    .then(() => {
      return api.refreshGenresFromAPI();
    }, error => {console.log("Error: "+ error)})
    .then(apiGenres => {
      return Genre.create({key: 1, lastRefreshDatetime: Date.now(), genres: apiGenres})
    }, error => {console.log("Error: "+error); throw error})
    .then(() => {return null}, (error) => {return error}))
  }

  switch(filterType) {
    case Constants.FILTER_TYPE_PERSON:
      apiFilterSearch(searchString, page, filterType);
      break;
    case Constants.FILTER_TYPE_GENRE:
      Genre.findOne({ key: 1})
      .then(genres => {
        if(!genres || !genres.lastRefreshDatetime || Math.floor(Math.abs(Date.now() - genres.lastRefreshDatetime)/86400000) > 1) {
          refreshGenresFromAPI().then((error) => {
            if(!error) {
              genreSearch(searchString).then((result) => {
                res.json(result)
              }, () => {res.status(400).json("Error: " + error)})
            } else {
              res.status(400).json("Error: " + error)
            }
          })
        }
        else {
          genreSearch(searchString).then((result) => res.json(result), (error) => {res.status(400).json("Error: " + error)})
        }
      }, (error) => res.status(400).json("Error: " + error))
      break; 
    default:
  }

});

router.get("/discover", function(req, res, next) {
  personIds = req.query.personIds;
  genreIds = req.query.genreIds;
  page = Number(req.query.page) || 1;

  if (page && page >= 1 && page < 100) {
    api.discoverSearch(personIds, genreIds, page)
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
