const router = require('express').Router();
const Search = require('../models.mongoose/search.model');
var request = require('request');

const api = require('../helpers/api');

router.get('/:id', function(req, res, next) {
    //if req.params.id
    Search.findOne({movieId: { $eq: req.params.id }})
    .then(async (search) => {
        if(search && search.movieName) {
            responseObject = {
                movieId: req.params.id,
                movieName: search.movieName
            }
            res.json(responseObject);
            //console.log("retrieving locally: " + search.movieName)
        } else {
            try {
                //console.log("retrieving remotely")
                response = await api.getMovieName(req.params.id);
                responseObject = {
                    movieId: req.params.id,
                    movieName: response.data.title
                }
                const newSearch = new Search(responseObject);
                newSearch.save()
                    .then(() => res.json(responseObject))
                    .catch(err => res.status(400).json('Error: ' + err));
                } catch(err) {
                console.log("Error: " + err);
                res.status(400).json('Error: ' + err)
            }    
        }
    })
    .catch(err => {
        console.log("Error: " + err);
        res.status(400).json('Error: ' + err)
    });  
  });

  router.route('/add').post((req, res) => {
    const movieId = req.body.movieId;
    const movieName = req.body.movieName;

    const newSearch = new Search({movieId, movieName});

    newSearch.save()
        .then(() => res.json('Search added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;

