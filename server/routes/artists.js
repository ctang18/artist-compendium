var URL = require('url');

var Artist = require('../models/artist');

/* Helper Functions */
function getArtist(artist){
  return '/artists/' + encodeURIComponent(artist.name);
}

/* Middleware */
exports.list = function (req, res, next) {
  Artist.getAll(function (err, artists) {
    if (err) return next(err);
    //console.log(JSON.stringify(artists));
    res.json(artists);
    /*res.render('artists', {
      Artist: Artist,
      name: name
    });*/
  });
};

exports.show = function (req, res, next) {
  Artist.get(req.params.artist, function (err, artist) {
    if (err) return next(err);
    artist.getFollowingAndOthers(function (err, following, others) {
      if (err) return next(err);
      /*res.render('artist', {
        Artist: Artist,
        name: name
      });*/
    });
  });
};