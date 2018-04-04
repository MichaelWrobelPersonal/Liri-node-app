//var Spotify = require('node-spotify-api');
require("dotenv").config();
var keys = require('./keys');
var request = require('request');
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
            let songName = media;
//            fs.appendFile(songFile,media);
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
            });
            break;
        case 'movie-this':
//            fs.appendFile(songFile,media);
            // Grab or assemble the movie name and store it in a variable called "movieName"
            var movieName = media;
 
            console.log('movie-this '+movieName);
            // REQUEST - OMDB
            let OMDBUrl = 'http://www.omdbapi.com/?apikey=' + process.env.OMD_APIKey + '&'
            request(OMDBUrl, function (error, response, body)
            {
              console.log('Request-OMDB - Returned...');
              console.log('error:', error); // Print the error if one occurred
              console.log('statusCode:', response.statusCode); // Print the response status code if a response was received
              console.log('Response: ' + response );
            //  console.log('body:', body); // Print the HTML for the Google homepage.
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
