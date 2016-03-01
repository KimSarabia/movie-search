"use strict";

//get the movie object
function movieLi(moviesObject){
  return $('<li class="result" data-id="' + moviesObject.imdbID +
'"><strong>' + moviesObject.Title + '</strong><em> (' + moviesObject.Year + ')</em></li>');
}

//get the movie poster
function moviePoster(url){
	return $('<img src="' +url+ '" alt="Movie Poster" />');
}

//get the movie info
function getMovieDetails(id){
	$.ajax({
			url: "http://www.omdbapi.com/",
			method: "get",
			data: {"i": id, "callback": "movies"},
			dataType: "jsonp",
			jsonpCallback: "movies",
			success: function(data) {
				var posterUrl = data.Poster;
				var moviePosterImg = moviePoster(posterUrl);
				$('.movie-detail').empty().append(moviePosterImg);
			}
		});
}

//get the imdb  ID
function getImdbID(){
	var imdbID = $(this).attr("data-id");
	getMovieDetails(imdbID);
}

// jQuery Main Function
$(function() {
	
	$(".results").on("click", "li", getImdbID); 

	$("form").on("submit", function(event) {
		event.preventDefault();
		var searchTerm = $("input").val()
			, i = 0
			, movieTitle
		;
		$.ajax({
			url: "http://www.omdbapi.com/",
			method: "get",
			data: {"s": searchTerm, "callback": "movies"},
			dataType: "jsonp",
			jsonpCallback: "movies",
			success: function(data) {
				console.log(data);
				var movies = data.Search;
				$(".results").empty();
				for (i = 0; i < movies.length; i++) {
					movieTitle = movieLi(movies[i]);
					$(".results").append(movieTitle);
				}
			}
		});
	});
});
