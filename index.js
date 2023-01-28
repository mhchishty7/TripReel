// This .on("click") function will trigger the AJAX Call
$("#search-button").on("click", function (event) {
    event.preventDefault();
    event.stopImmediatePropagation();
    $("#movie-list").empty();

    // grab text from the search-input box
    var movie = $("#search-input").val();

    // hit the queryURL with $ajax, response will return an array with movies matching searched title
    var queryURL = "https://www.omdbapi.com/?s=" + movie + "&type=movie&apikey=f9d78f5a"

    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function (response) {

        // Store the data from the AJAX request
        let results = response.Search;

        // Looping through each result item
        results.forEach(function (movie) {

            // Obtain movieIDs in order to call another API
            var movieID = movie.imdbID;
            console.log(movieID);

            // Second API
            var queryURL2 = "https://www.omdbapi.com/?i=" + movieID + "&apikey=f9d78f5a"
            $.ajax({
                url: queryURL2,
                method: "GET",
                success: function (data) {
                    console.log(data);

                    $("#movie-list").append("<div name='" + encodeURI(data.Title.replace(" ", "+").replace("'", "")) + "' id='"+data.imdbID.replace(/[!\"#$%&'\(\)\*\+,\.\/:;<=>\?\@\[\\\]\^`\{\|\}~]/g, '')+"'> <img class='resultImg' src='" + data.Poster + "' onerror=\"this.src=\'https:\/\/static-vectorplace-com.ams3.digitaloceanspaces.com\/uploads\/works\/72680\/preview_72680.jpg\';\" >" + "<h4>" + data.Title + "</h4>" + data.Released + "<br> Rated: " + data.Rated + "<br>" + data.Metascore + "/100 Metascore <br>" + "Genre: " + data.Genre + "<hr></div>");
                    name = data.Title;
                    $('.resultImg').css('cursor', 'pointer');
                    $('h4').css('cursor', 'pointer');
                }
            });

        });

    });
});

$(document).on("click", ".resultImg, h4", function(){
    window.localStorage.setItem("name", $(this).parent().attr("name"));
    window.location.href = 'details.html?' + $(this).parent().attr("id") ;
    console.log($(this).parent().attr("id"))
});
$(document).on("click", ".carousel-cell", function(){
    window.localStorage.setItem("name", $(this).attr("name"));
    window.location.href = 'details.html?' + $(this).attr("id") ;
    console.log($(this).attr("id"))
});