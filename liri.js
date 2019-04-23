require("dotenv").config();

var keys = require("./keys");

var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);

var axios = require("axios");

var moment = require("moment");


if (process.argv[2] === "concert-this") {
    var artist = process.argv.slice(3).join(" ");
    if (artist === "") {
        artist = "DMX"
    }
    var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"
    axios.get(queryURL).then(function(response) {
      var events = response.data
      for (var i = 0; i < events.length; i++) {
      console.log("Name of Venue: " + events[i].venue.name)
      console.log("Venue Location: " + events[i].venue.city + ", " + events[i].venue.region + ", " + events[i].venue.country)
      console.log("Date of the Event: " + moment(events[i].datetime).format("MM/DD/YYYY"))
      console.log("")
      }
  })

  } else if (process.argv[2] === "spotify-this-song") {
      var track = process.argv.slice(3).join(" ");
      if (track === "") {
          track =  "Ignition"
      }

      spotify.search({ type: 'track' , query: track , limit: 5 }, function(err, data) {
          if (err) {
          return console.log('Error occurred: ' + err);
          }
          var song = data.tracks.items

          for (var i = 0; i < song.length; i++) {
          console.log("Artists: " + song[i].artists[0].name)
          console.log("Song Name: " + song[i].name)
          console.log("Preview: " + song[i].preview_url)
          console.log("Album: " + song[i].album.name)
          console.log("")
          }
        });

  } else if (process.argv[2] === "movie-this") {
      var movie = process.argv.slice(3).join(" ");
      if (movie === "") {
          movie = "Underworld"
      }
      var qURL = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy"
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