var OMDB = "https://www.omdbapi.com/?type=movie&t=";
var OMDBkey = "&apikey=b77cee49";
var movieObj;
function formatMovie(obj) {
    form = {
        Title: "N/A",
        Runtime: "N/A",
        Released: "N/A",
        Genre: "N/A",
        Summary: "N/A",
        Rating: "",
        Metascore: "N/A",
        Score: "N/A",
        Actors: "N/A",
        Writers: "N/A",
        Awards: "N/A",
        Director: "N/A",
        Languages: "N/A",
        Poster: "https://static-vectorplace-com.ams3.digitaloceanspaces.com/uploads/works/72680/preview_72680.jpg",

    }
    try{form.Title = obj[0].title.title} catch(error){}
    try{form.Runtime = obj[0].title.runningTimeInMinutes} catch(error){}
    try{form.Released = obj[1].Released} catch(error){}
    try{form.Genre = obj[0].genres} catch(error){}
    try{form.Summary = obj[0].plotSummary.text} catch(error){}
    try{form.Rating = obj[0].certificates.US[0].ratingReason} catch(error){}
    try{form.Metascore = obj[1].Metascore} catch(error){}
    try{form.Score = obj[1].imdbRating} catch(error){}
    try{form.Actors = obj[1].Actors} catch(error){}
    try{form.Writers = obj[1].Writer} catch(error){}
    try{form.Awards = obj[1].Awards} catch(error){}
    try{form.Director = obj[1].Director} catch(error){}
    try{form.Languages = obj[1].Language} catch(error){}
    try{form.Poster = obj[0].title.image.url} catch(error){}

    return form;

}

function getIMDbObj(movieID) {
    var omdbInf;
    var promise = new Promise(function (resolve, reject) {

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://imdb8.p.rapidapi.com/title/get-overview-details?type=movie&currentCountry=US&tconst=" + movieID,
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "imdb8.p.rapidapi.com",
                "x-rapidapi-key": "f2b30e5b86mshef9af991c5736d4p10c126jsn146e977a47d1"
            }
        }
        $.ajax(settings).then(function (response) {

            var queryURL = OMDB + response.Title + OMDBkey;
            omdbInf = response;
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function (response) {
                console.log(omdbInf)
                console.log(response)
                resolve([omdbInf, response]);
            });

        });
    });
    return promise;

}

//Use this to get an object filled with movie info
function makeMovObj(movieID) {

    var promise = new Promise(function (resolve, reject) {
        getIMDbObj(movieID).then(function (i) {
            console.dir(i);
            resolve(formatMovie(i));
        });
    });
    return promise;
}

//This is how you use the makeMovObj function
// var movieObj;
// var movies = [];
// for (var i = 0; i < movies.length; i++) {
//     makeMovObj(movies[i]).then(function (result) {
//         console.dir(result);
//         movieObj = result
//     });
// }

var movieID = decodeURI(window.location.search.substring(1));
var movieObj;
makeMovObj(movieID).then(function (result) {
    console.dir(result);
    movieObj = result
}).then(function () {

    document.getElementById("loader").style.display = "none";
    document.getElementById("main").style.visibility = "visible";
    $(".headerPic").attr("style", "visibility:visible");
    $(".headerPic").attr("src", movieObj.Poster);

    var a = $(".cell");
    a.empty();
    a.append("<h1 id='title'>" + movieObj.Title + "</h1>");
    a.append("<h4>" + movieObj.Runtime + " mins</h4>");
    a.append("<h4>Released: " + movieObj.Released + "</h4>");
    a.append("<p>Metascore: " + movieObj.Metascore + "</p>");
    a.append("<p>IMDB rating: " + movieObj.Score + "</p>");
    if (movieObj.Rating) {a.append("<h4 style='color: rgb(224, 53, 53)'>" + movieObj.Rating + "</h4>");}
    a.append("<p>" + movieObj.Summary + "</p>");
});
