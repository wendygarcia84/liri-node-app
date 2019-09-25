require("dotenv").config();

var Spotify = require("node-spotify-api");
var axios = require("axios");
var fs = require("fs");


var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);

var command = "";
var item = "";

command = process.argv[2];

if (process.argv[3]) {
    item = process.argv.slice(3).join(" ");
    console.log("The item is: " + item);
}


switch (command) {
    case "concert-this":
        concertThis(item);
    break;

    case "spotify-this-song":
        if (!process.argv[3]) {
            item = "The Sing - Ace of base";
        } 
        spotifyThis(item);
    break;
    
    case "movie-this":
        if (!process.argv[3]) {
            item = "Mr. Nobody";
        }
        movieThis(item);
    break;

    case "do-what-it-says":
        doWahtItSays();
    break;

    default:
        console.log("Invalid command");
}

//========== FUNCTIONS ===========//

function concertThis(item) {
    var queryUrl = "https://rest.bandsintown.com/artists/" + item + "/events?app_id=codingbootcamp";

    axios.get(queryUrl).then(function (response) {
        //console.log(JSON.stringify(response.data, null, 2));
        console.log("Venue: " + response.data[0].venue.name)
        // Name of the venue
        // Venue location
        console.log(`Location ${response.data[0].venue.city}, ${response.data[0].venue.region}`);
        // Date of the Event (use moment to format this as "MM/DD/YYYY")
        console.log(`Date: ${response.headers.date}`);
     
    });
}

function spotifyThis (item) {
    spotify.search({type: 'track' , query: item, limit: 1 }, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        console.log("Name: " + data.tracks.items[0].name); //name, artists[0], external_urls.spotify, album[0] 
        console.log("Artists: " + data.tracks.items[0].artists[0].name);
        console.log("URL: "+ data.tracks.items[0].external_urls.spotify);
        console.log("Album: " + data.tracks.items[0].album.name);
    });
}

function movieThis (item) {
    var queryUrl = "http://www.omdbapi.com/?t=" + item + "&y=&plot=short&apikey=trilogy";

    axios.get(queryUrl).then(function (response) {
        //console.log(JSON.stringify(response.data, null, 2))
            console.log("Title: " + response.data.Title);
            console.log("Year: " + response.data.Year);
            console.log("IMDB Rating: " + response.data.Rated);

            for (var i = 0 ; i < response.data.Ratings.length ; i++) {
                //console.log('Searching for rotten tomatoes')
                 if (response.data.Ratings[i].Source === "Rotten Tomatoes") {
                     console.log("Rotten Tomatoes: " + response.data.Ratings[i].Value)
                 }
            }
            
            console.log("Country: " + response.data.Country);
            //==== LANGUAGE!!!!!!!!!!!
            console.log("Plot: " + response.data.Plot);
            console.log("Actors: " + response.data.Actors);
        }); 
}

function doWahtItSays () {
    fs.readFile("random.txt", "utf8", function (err, data) {
        if (err) {
            return console.log(err);
        }
        var dataArr = data.split(",");

        command = dataArr[0];
        item = dataArr[1];
        
        if (command === "spotify-this-song") {
            spotifyThis(item);
        } else if (command === "movie-this") {
            movieThis(item);
        }
    });
}