require("dotenv").config();

var Spotify = require("node-spotify-api");
var axios = require("axios");
var fs = require("fs");
var inquirer = require("inquirer");
var moment = require("moment");

var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);

var command = "";
var item = "";

inquirer.prompt([ 
    {
      type: "list",
      message: "Select a command",
      choices: ["concert-this", "spotify-this-song", "movie-this", "do-what-it-says"],
      name: "command"
    }, {
        type: "input",
        message: "Please enter the query",
        name: "item",
    }

  ]).then(function(input) {
    doEverything(input.command, input.item);
  });


//========== FUNCTIONS ===========//

function doEverything (command, item) {
    switch (command) {
        case "concert-this":
            if (item === "") {
                item = "Lady Gaga";
            } 
            concertThis(item);
        break;
    
        case "spotify-this-song":
            if (item === "") {
                item = "The Sing - Ace of base";
            } 
            console.log(command);
            spotifyThis(item);
        break;
        
        case "movie-this":
            if (item === "") {
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
}

function concertThis(item) {
    var queryUrl = "https://rest.bandsintown.com/artists/" + item + "/events?app_id=codingbootcamp";

    axios.get(queryUrl).then(function (response) {
        //console.log(JSON.stringify(response.data, null, 2));
        if ( response.data[0]) {
            console.log("Venue: " + response.data[0].venue.name)
            console.log(`Location ${response.data[0].venue.city}, ${response.data[0].venue.region}`);
            // Date of the Event (use moment to format this as "MM/DD/YYYY")
            date = moment(response.headers.date, "ddd, DD MMM YYYY hh:mm:ss");
            console.log(`Date: ${date.format("MM/DD/YYYY")}`);
        } else {
            console.log("No concerts were found!")
        }
        
    });
}

function spotifyThis (item) {
    spotify.search({type: 'track' , query: item, limit: 1 }, function(err, data) {
        console.log("Searching for " + item)
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
        if (response.data.Response != "False") {
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
            console.log("Language: " + response.data.Language);
            console.log("Plot: " + response.data.Plot);
            console.log("Actors: " + response.data.Actors);
        } else {
            console.log("Movie not found!")
        }
            
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