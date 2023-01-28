var OMDB = "https://www.omdbapi.com/?t=";
var OMDBkey = "&apikey=b77cee49";

var best = ["The Treasure of the Sierra Madre", "Stagecoach", "The Searchers", "Once Upon a Time in the West", "Us", "The Babadook", "Nosferatu, a Symphony of Horror", "Halloween", "It", "Drag me to Hell", "Midsommar", "Carrie", "Invasion of the Body Snatchers", "Won't You Be My Neighbor?", "I Am Not Your Negro", "Weiner", "Free Solo", "Three Identical Strangers", "Nightcrawler", "Ex Machina", "10 Cloverfield Lane", " Kiss Me Deadly", "The Big Heat", "Laura", "The Shawshank Redemption", "The Godfather", "The Silence of the Lambs", "Pulp Fiction", "Titanic", "Jurassic Park", "Forrest Gump", "The Lord of the Rings: The Return of the King", "The Green Mile", "Saving Private Ryan", "Jaws", "Goodfellas", "Schindler's List", "Gladiator", "Raiders of the Lost Ark", "Some Like It Hot", "The Good the Bad and the Ugly", "Taxi Driver", "Apocalypse Now", "A Clockwork Orange", "The Godfather: Part II", "Star Wars: Episode IV - A New Hope", "Unforgiven", "Psycho", "Good Will Hunting", "2001: A Space Odyssey", "12 Angry Men", "One Flew Over the Cuckoo's Nest", "Braveheart", "E.T.the Extra - Terrestrial", "The Pianist", "The Exorcist", "Vertigo", "Fargo", "The Sound of Music", "Gone with the Wind", "Platoon", "The Wizard of Oz", "Casablanca", "The Deer Hunter", "A Streetcar Named Desire", "American Graffiti", "Rocky", "From Here to Eternity", "Citizen Kane", "Amadeus", "Rear Window", "North by Northwest", "West Side Story", "Chinatown", "Dr.Strangelove or: How I Learned to Stop Worrying and Love the Bomb", "Lawrence of Arabia", "Close Encounters of the Third Kind", "To Kill a Mockingbird", "Dances with Wolves", "Raging Bull", "Singin' in the Rain", "It's a Wonderful Life", "The French Connection", "Rain Man", "Annie Hall", "Midnight Cowboy", "Ben-Hur", "Network", "Sunset Blvd.", "Terms of Endearment", "Butch Cassidy and the Sundance Kid", "Bonnie and Clyde", "The Apartment", "The Great Dictator", "On the Waterfront", "Rebel Without a Cause", "The Searchers", "The Bridge on the River Kwai", "My Fair Lady", "Shane", "The Third Man", "Doctor Zhivago", "Double Indemnity", "High Noon", "The Maltese Falcon", "Giant", "The Best Years of Our Lives", "It Happened One Night", "Patton", "City Lights", "The Treasure of the Sierra Madre", "The Philadelphia Story", "All Quiet on the Western Front", "Nashville", "The African Queen", "The Grapes of Wrath", "Mr.Smith Goes to Washington", "An American in Paris", "A Place in the Sun", "Wuthering Heights", "Mutiny on the Bounty", "Yankee Doodle Dandy"]

// function getRandomInt(min, max) {
//     min = Math.ceil(min);
//     max = Math.floor(max);
//     max += 1;
//     return Math.floor(Math.random() * (max - min)) + min;
// }
// function makeRndID() {
//     var str = '' + getRandomInt(3000000, 9999999);
//     while (str.length < 7) {
//         str = '0' + str;
//     }

//     return str;
// }
// function makeRandMovies(howMany) {
//     var movieList = [];
//     for (let i = 0; i < howMany; i++) {
//         const movieID = "tt" + makeRndID();
//         movieList.push(movieID);
//     }
//     console.log(movieList)
//     return movieList;
// }

function getIMDB(title) {
    var queryURL = OMDB + title + OMDBkey;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        movieObj = response;
        sortGenre(movieObj);
    });
}
function make(){
    var genreMovieArray = JSON.parse(window.localStorage.getItem("genreMovieArray"));

    for (const [g, ms] of Object.entries(genreMovieArray)) {
        if (ms.length >= 4) {
            console.log(g)
            var genrID = g.replace(/[!\"#$%&'\(\)\*\+,\.\/:;<=>\?\@\[\\\]\^`\{\|\}~]/g, '');

            $("#genres").append("<h4>" + g + "</h4><hr><div class='carousel flickity-enabled is-draggable' id='" + genrID + "'" + ` data-flickity='{ "wrapAround": true }'></div><hr>`);
            ms.forEach(function (mObj) {
                console.log(mObj)
                $("#" + genrID).append("<div name='" + encodeURI(mObj.Title.replace(" ", "+").replace("'", "")) + "' class='carousel-cell' style='background-image: url(" + mObj.Poster + ");' id='" + mObj.imdbID.replace(/[!\"#$%&'\(\)\*\+,\.\/:;<=>\?\@\[\\\]\^`\{\|\}~]/g, '') + "'></div>");

            })
        }

    }
}
var genreMovieArray = {};
function sortGenre(movieObj) {

    var myGenres = movieObj.Genre.split(", ");
    var myGenre = myGenres[0];

    if (myGenre.localeCompare("N/A") != 0) {
        if (myGenre in genreMovieArray) {
            //This movies genre's div exists
            genreMovieArray[myGenre].push(movieObj);
        } else {
            //This movies genre's div does not exists
            genreMovieArray[myGenre] = [movieObj];
        }
    }
}
if (window.localStorage.getItem("genreMovieArray") === null) {
    function getWork(callback) {
        best.forEach(getIMDB);
        setTimeout(function () {
            callback();;
        }, 1000);

    }
    function doWork() {
        window.localStorage.setItem("genreMovieArray", JSON.stringify(genreMovieArray));
        location.reload();
        make();
    }
    getWork(doWork);

} else {make();}
