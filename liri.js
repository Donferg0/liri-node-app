require("dotenv").config();

var keys = require("./keys");

// var Spotify = require('node-spotify-api');

var spotify = new spotify(keys.spotify)
 
spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
 
console.log(data);
});