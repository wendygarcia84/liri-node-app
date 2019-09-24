require("dotenv").config();
var Spotify = require("node-spotify-api");
var axios = require("axios");
var fs = require("fs");


var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);

var command = process.argv[2];
var item = "";
if (process.argv[3]) {
    item = process.argv[3]
}


switch (command) {
    case "spotify-this-song":
        if (!process.argv[3]) {
            item = "The Sing - Ace of base";
        } 
        spotify.search({type: 'track' , query: item, limit: 1 }, function(err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            console.log("Name: " + data.tracks.items[0].name); //name, artists[0], external_urls.spotify, album[0] 
            console.log("Artists: " + data.tracks.items[0].artists[0].name);
            console.log("URL: "+ data.tracks.items[0].external_urls.spotify);
            console.log("Album: " + data.tracks.items[0].album.name);
        });
    break;
    
    case "movie-this":
        if (!process.argv[3]) {
            item = "Mr. Nobody";
        }

        var queryUrl = "http://www.omdbapi.com/?t=" + item + "&y=&plot=short&apikey=trilogy";

        axios.get(queryUrl).then(function (response) {
            console.log(response);
            console.log("Title: " + response.data.Title);
            console.log("Year: " + response.data.Year);
            console.log("IMDB Rating: " + response.data.Rated);
            console.log("Rotten Tomatoes: " + response.data.Ratings[0]);
            console.log("Country: " + response.data.Country);
            console.log("Plot: " + response.data.Plot);
            console.log("Actors: " + response.data.Actors);
        }); 
    break;

    case "do-what-it-says":
        fs.readFile("random.txt", "utf8", function (err, data) {
            if (err) {
                return console.log(err);
            }

            var dataArr = data.split(",");


        });
    break;

    default:
        console.log("Invalid");
}
