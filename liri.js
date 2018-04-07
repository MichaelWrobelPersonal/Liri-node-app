var Spotify = require('node-spotify-api');
require("dotenv").config();
var keys = require('./keys');
var request = require('request');

// Includes the FS package for reading and writing packages
const fs = require('fs');

// Run this program by navigating to it in terminal/bash.
// Then run node liri.js
console.log("\nLiri\n");
let command = process.argv[2];
let media = process.argv[3];
console.log('Command is: '+command);
console.log('Media is: '+media);
console.log('\n-------------------------------------------------------------\n');

processCommand( command, media );

function processCommand(operation, argument)
{
    switch (operation)
    {
        case 'my-tweets':
            console.log('my-tweets\n');
            // TWITTER
            var Twitter = require('twitter');
            var client = new Twitter( keys.twitter );
            var params = {screen_name: 'nodejs'};
            client.get('search/tweets', {q: 'node.js'}, function(error, tweets, response) {
              console.log('Twitter returned...\n' );
              tweets.statuses.forEach(element => {
                console.log( element.text );
                console.log( '\n' );
              });
            });
        break;
        case 'spotify-this-song':

            let songName = "The Sign";
            if (argument != undefined)
                songName = argument;
            console.log('spotify-this-song ' + songName +'\n');
            // SPOTIFY
            var Spotify = require('node-spotify-api');
            var spotify = new Spotify( keys.spotify ); 
            spotify.search({ type: 'track', query: songName }, function(err, data)
            {
              if (err) {
                return console.log('Spotify - Error occurred: ' + err);
              }
              console.log('Spotify(' + argument + ') - Returned...\n');
//              console.log(data); 
              // Parse and display the data for the following...
              // * Artist(s)
              // * The song's name              
              // * A preview link of the song from Spotify
              // * The album that the song is from
              data.tracks.items.forEach(element => {
                if (element.type == 'track')
                {
//                  console.log( element );
                  console.log( 'Album: ' + element.album.name );
                  console.log( 'Song: ' + element.name );
                  let artists = "";
                  element.artists.forEach(artist => {
                    artists += " - " + artist.name;
                  });
                  console.log( 'Artist(s):' + artists );
                  let previewUrl = element.preview_url;
                  if ((previewUrl == undefined) || (previewUrl == 'null'))
                     previewUrl = "Not available"
                  console.log( 'Preview: ' + previewUrl);
                  console.log( '\n' );
                }
              });
            });
            break;
        case 'movie-this':
//            fs.appendFile(songFile,media);
            // Grab or assemble the movie name and store it in a variable called "movieName"
            var movieName = "Mr. Nobody.";
            if (argument != undefined)
              movieName = argument;
            
            console.log('movie-this ' + movieName + '\n');
            // REQUEST - OMDB
            let OMDBUrl = 'http://www.omdbapi.com/?apikey=' + process.env.OMD_APIKey + '&'
//            console.log('Url: ' +OMDBUrl);
            request("http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy", function(error, response, body)
//            request(OMDBUrl, function (error, response, body)
            {
              console.log('Request-OMDB - Returned...\n');
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
              let ratingValue = "";
              JSON.parse(body).Ratings.forEach(rating => {
                if (rating.Source === 'Rotten Tomatoes')
                  ratingValue = rating.Value;
              });
              console.log('Rotten Tomatoes Rating: ' + ratingValue );
              console.log("Where made: " + JSON.parse(body).Country);
              console.log("Language(s): " + JSON.parse(body).Language);
              console.log("Plot: " + JSON.parse(body).Plot);
              console.log("Actors: " + JSON.parse(body).Actors);
              console.log('\n');
            });

            // Run a request to the OMDB API with the movie specified
            let ombdUrl = 'http://www.omdbapi.com/?i=' + process.env.OMD_ID + '&apikey=' + process.env.OMD_APIKey;
            // provide APIKey - trilogy
            var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=" + process.env.OMD_APIKey;

            // This line is just to help us debug against the actual URL.
            console.log(queryUrl);
            break;
        case 'do-what-it-says':
            let songFile = 'random.txt';
            console.log('Song File is: '+songFile+'\n');
              
            // Running the readFile module that's inside of fs.
            // Stores the read information into the variable "data"
            //fs.readFilreadFilerr, data) {
            fs.readFile(songFile, "utf8", function(err, data)
            {
              if (err) {
                return console.log(err);
              }
              console.log(data);
              let info = data.split(' ');
              if (info[0] != 'do-what-it-says' )
              {
                processCommand( info[0], info[1]);
                console.log('did-what-it-said');
              }
              else
              {
                console.log('do-what-it-said cannot be called from itself');
              }
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
}