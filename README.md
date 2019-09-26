# liri-node-app

## Description

LIRI is like iPhone's SIRI. LIRI is a *Language Interpretation and Recognition Interface*. LIRI is be a interactive app that allows the user to chose a command from the folowwing list:

* concert-this
* spotify-this-song
* Movie-this
* do-what-it-says

The user might as well choose a search query within that category, by typing it into the command line, and get information back printed on the console.

## Technologies

* Javascript
* Node.js
    * NPM Packages
        * dotEnv
        * Spotify API
        * Axios
            * Bands in Town API
            * OMDB API
        * Moment.js
        * Inquirer
    * FS

After retrieving the data from the user, the app makes an http request using either axios, the spotify API, or the OMDB API respecivelly. Then, the user gets specific information back printed in the console.


Give a high-level overview of how the app is organized

Contain a link to a deployed version of the app

State your role in the app development

## How to use it

1. First off, make sure you have Node.js installed in your computer. Second,open the console and clone this repo into the folder you want to store the app. Next, navigate to the newly created app's directory. Then, create a `package.json` file by typing npm init, and install the dependencies by typing npm install. You'll need to use you're own Spotify API key.

2. To run the app, navigate to it's directory and type 'node liri.js' and press `Enter`. Since this app is interactive, it doesn't need arguments. The user will input the data later on.


![List of Commands](/screenshots/1.png)


3. Second, the app will show you the list of commands. Use the `down arrow` key to navigate through it and click `Enter` once you've made a selection. For this example, we will choose **concert-this**.


![List of Commands](/screenshots/2.png)


4. Now it's time to give the app a search query. Type the name of the artist, song, or movie you want information about, and hit the `Enter` key. For this example, we will use **Ariana Grande**.


![Search query](/screenshots/8.png)


5. The app now will show you a list of the next following events for that specific artist, including the venue, location, and date of the concert.


![Console Results](/screenshots/9.png)

6. The other commands work similarly. Here are some examples of the possible results:

    * **spotify-this-song**
    
    ![Spotify](/screenshots/5.png)

    * **movie-this**

    ![Movies](/screenshots/6.png)

    * **do-what-it-says** Reads the command and query from a `random.txt` file. In this case, when the app asks for a query, just hit enter.

    ![File](/screenshots/7.png)