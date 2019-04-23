require("dotenv").config();

var keys = require("./keys");

var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);

var axios = require("axios");


if (process.argv[2] === "concert-this") {
  var artist 
  var queryURL = "https://rest.bandsintown.com/artists/DMX/events?app_id=codingbootcamp"
  axios.get(queryURL).then(function(response) {
    var events = response.data
    console.log(events)
  })

  } else if (process.argv[2] === "spotify-this-song") {
    spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
        if (err) {
        return console.log('Error occurred: ' + err);
  }
 
      console.log(data);
      });

  } else if (process.argv[2] === "movie-this") {
    var movie 
    var qURL = "http://www.omdbapi.com/?t=remember+the+titans&y=&plot=short&apikey=trilogy"
    axios.get(qURL).then(function(response) {
    var movieInfo = response.data
    console.log("Title: " + movieInfo.Title);
    console.log("Year: " + movieInfo.Year);
    console.log("IMDB Rating: " + movieInfo.imdbRating);
    console.log("Rotten Tomatoes Rating: " + movieInfo.Ratings[1].Value);
    console.log("Country: " + movieInfo.Country);
    console.log("Language: " + movieInfo.Language);
    console.log("Plot: " + movieInfo.Plot);
    console.log("Actors: " + movieInfo.Actors);
  })
} else {
  console.log("Please input what you are searching for!")
}