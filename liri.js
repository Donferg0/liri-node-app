require("dotenv").config();

var keys = require("./keys");

var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);

var axios = require("axios");

var moment = require("moment");

var fs = require("fs");

function concert() {
  var artist = process.argv.slice(3).join(" ");
  if (artist === "") {
      artist = "DMX"
  }
  var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"
  axios.get(queryURL).then(function(response) {
    var events = response.data
    if (!events.length) {
            console.log("No events found for: "  + artist)
    }
    for (var i = 0; i < events.length; i++) {
            console.log("Name of Venue: " + events[i].venue.name)
            console.log("Venue Location: " + events[i].venue.city + ", " + events[i].venue.region + ", " + events[i].venue.country)
            console.log("Date of the Event: " + moment(events[i].datetime).format("MM/DD/YYYY"))
            console.log("")
    }
})
}
function spotifyhere() {
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

}
function moviethis() {
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

}
function dowhatitsays() {
        
  fs.readFile("random.txt", "utf8", function(error, data) {

    if (error) {
      return console.log(error)
    }

    var dataArr = data.split(",");
    if (dataArr[0] === "concert-this") {
                var artist = dataArr[1];
                if (artist === "") {
                    artist = "DMX"
                }
                var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"
                axios.get(queryURL).then(function(response) {
                  var events = response.data
                  if (!events.length) {
                          console.log("No events found for: "  + artist)
                  }
                  for (var i = 0; i < events.length; i++) {
                          console.log("Name of Venue: " + events[i].venue.name)
                          console.log("Venue Location: " + events[i].venue.city + ", " + events[i].venue.region + ", " + events[i].venue.country)
                          console.log("Date of the Event: " + moment(events[i].datetime).format("MM/DD/YYYY"))
                          console.log("")
                  }
              })
    } else if (dataArr[0] === "spotify-this-song") {
          var track = dataArr[1];
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
    } else if (dataArr[0] === "movie-this") {
        var movie = dataArr[1];
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
      }
    });
}

if (process.argv[2] === "concert-this") {
    concert()
  } else if (process.argv[2] === "spotify-this-song") {
    spotifyhere()
  } else if (process.argv[2] === "movie-this") {
    moviethis()
  } else if (process.argv[2] === "do-what-it-says") {
    dowhatitsays()
  } else {
      console.log("Please input what you are searching for!")
      }
      

      // var dataArr = data.split(",");
      // if (dataArr[0] === "concert-this") {
      //   concert();
      // } else if (dataArr[0] === "spotify-this-song") {
      //   spotifyhere()
      // } else if (dataArr[0] === "movie-this")
      //   moviethis()
      // });