//var Spotify = require('node-spotify-api');
require("dotenv").config();
//var node = require('node');
var keys = require('./keys');
var request = require('request');
var liri = require('./liri');
//request('npm');

// Includes the FS package for reading and writing packages
const fs = require('fs');

// Run this program by navigating to it in terminal/bash.
// Then run node liri.js
console.log("\nLiri\n");
let command = process.argv[2];
let media = process.argv[3];
console.log('Command is: '+command);
console.log('Media is: '+media);

//// REQUEST - Google
//request('http://www.google.com', function (error, response, body) {
//  console.log('Request - Returned...');
//  console.log('error:', error); // Print the error if one occurred
//  console.log('statusCode:', response.statusCode); // Print the response status code if a response was received
//  console.log('Response: ' + response );
////  console.log('body:', body); // Print the HTML for the Google homepage.
//});

    switch (command)
    {
        case 'my-tweets':
            console.log('my-tweets=tbd');
            // TWITTER
            var Twitter = require('twitter');
            var client = new Twitter( keys.twitter );
            var params = {screen_name: 'nodejs'};
            client.get('search/tweets', {q: 'node.js'}, function(error, tweets, response) {
              console.log(tweets);
            });
//            client.get('statuses/user_timeline', params, function(error, tweets, response)
//            {
//              if (!error) {
//                console.log(tweets);
//              }
//              else {
//                console.log('Twitter - Error occurred: ' + error);
//              }
//            });
        break;
        case 'spotify-this-song':

            let songName = "The Sign";
            if (media != undefined)
                songName = media;
            console.log('spotify-this-song ' + songName);
            // SPOTIFY
            var Spotify = require('node-spotify-api');
            var spotify = new Spotify( keys.spotify ); 
            spotify.search({ type: 'track', query: songName }, function(err, data)
            {
              if (err) {
                return console.log('Spotify - Error occurred: ' + err);
              }
              console.log('Spotify(' + media + ') - Returned...');
              console.log(data); 
              // TBD - Parse and display the data for the following...
              // * Artist(s)
              // * The song's name              
              // * A preview link of the song from Spotify
              // * The album that the song is from
            });
            break;
        case 'movie-this':
//            fs.appendFile(songFile,media);
            // Grab or assemble the movie name and store it in a variable called "movieName"
            var MovieName = "Mr. Nobody.";
            if (media != undefined)
              movieName = media;
            
            console.log('movie-this '+movieName);
            // REQUEST - OMDB
            let OMDBUrl = 'http://www.omdbapi.com/?apikey=' + process.env.OMD_APIKey + '&'
            console.log('Url: ' +OMDBUrl);
            request("http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy", function(error, response, body)
//            request(OMDBUrl, function (error, response, body)
            {
              console.log('Request-OMDB - Returned...');
              console.log('error:', error); // Print the error if one occurred
              console.log('statusCode:', response.statusCode); // Print the response status code if a response was received
              console.log('Response: ' + response );
              console.log('body:', body); // Print the HTML for the Google homepage.
              // Disply the following
              //* Title of the movie.
              //* Year the movie came out.
              //* IMDB Rating of the movie.
              //* Rotten Tomatoes Rating of the movie.
              //* Country where the movie was produced.
              //* Language of the movie.
              //* Plot of the movie.
              //* Actors in the movie.
              console.log("Title: :" + JSON.parse(body).Title);
              console.log("Release Year: " + JSON.parse(body).Year);
              console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
              console.log("Rotten Tomatoes: " + JSON.parse(body).Ratings['Rotten Tomatoes']);
              console.log("Where made: " + JSON.parse(body).Country);
              console.log("Language: " + JSON.parse(body).Language);
              console.log("Plot: " + JSON.parse(body).Plot);
              console.log("Actors: " + JSON.parse(body).Actors);
            });

            // Run a request to the OMDB API with the movie specified
            let ombdUrl = 'http://www.omdbapi.com/?i=' + process.env.OMD_ID + '&apikey=' + process.env.OMD_APIKey;
            // provide APIKey - trilogy
            var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=" + process.env.OMD_APIKey;

            // This line is just to help us debug against the actual URL.
            console.log(queryUrl);
            break;
        case 'do-what-it-says':
            console.log('did-what-it-said');
            let songFile = 'random.txt';
            console.log('Song File is: '+songFile);
              
            // Running the readFile module that's inside of fs.
            // Stores the read information into the variable "data"
            //fs.readFilreadFilerr, data) {
            fs.readFile(songFile, "utf8", function(err, data)
            {
              if (err) {
                return console.log(err);
              }
              console.log(data);
              'node'+'liri'+data;
            });
            break;
            case '?':
            case 'help':
        default:
            console.log('\nTry one of the following commands...\n');
            console.log('my-tweets');
            console.log('spotify-this-song <song title>');
            console.log('movie-this <movie title>');
            console.log('do-what-it-says\n');
    }
