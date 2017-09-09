//The Various NPM and API keys
var keys = require("./keys.js");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var OMDBRequest = require('request');

//The new API constructors
var spotify = new Spotify({
  id: "35d7a11eb9784eada6d1a2b8acc44c35",
  secret: "9f13772076d142a99ee7e5ef1fa673fb"
});

var client = new Twitter({
  consumer_key: process.env.keys.consumer_key,
  consumer_secret: process.env.keys.consumer_secret,
  access_token_key: process.env.keys.access_token_key,
  access_token_secret: process.env.keys.access_token_secret
});
//input variables
var programUsed = process.argv[2];
var whatCalled = process.argv[3];






function twitterCall(){
//uses twitter API to Get Last twenty Tweets
  console.log("Twiter");
  twitter.stream('statuses/filter', {track: 'twitter'},  function(stream) {
  stream.on('data', function(tweet) {
    console.log(tweet.text);
  });

  stream.on('error', function(error) {
    console.log(error);
  });
});

}

function spotifyCall(songy){
//uses Spotify API to get the details on the song then print them out
  console.log("Spotify");
  if (songy) {
    spotify.search({ type: 'track', query: songy }, function(err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }
      console.log("the song choosen was " + songy);
    });
  }
  else {
    spotify.search({ type: 'track', query: 'The Sign' }, function(err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }
      console.log(data);
      console.log("No song choosen")
    });
  }
};

function OMDBCall(movie){
//Uses OMDB to get the details on the song then print them out
  if (movie) {
    //omdb api
  }
  else{
    //omdb with mr. nobody
  }
  console.log("movies")
};


function doinIt(){
  console.log("doing it");
//Uses the spotifyCall on the stong stored in random.txt
  fs.readFile("random.txt", "utf8", function(err, data) {
    if (err) {
      return console.log(err);
    }
    //This will pull the song name from the random file to be used as the Data variable
    var songy = data;
  });
  spotify.search({ type: 'track', query: songy }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }

  console.log(data);
  });
}

switch (programUsed) {
  case "my-tweets":
    twitterCall();
    break;

  case "spotify-this-song":
    spotifyCall(whatCalled);
    break;

  case "movie-this":
    OMDBCall(whatCalled);
    break;

  case "do-what-it-says":
    doinIt();
    break;
}
