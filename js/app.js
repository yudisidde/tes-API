$(document).ready(function() {
	var peopleID = 1;
	getPeople(peopleID);
});

function getPeople(peopleID) {
	var req = $.getJSON("https://swapi.co/api/people/" + peopleID + "/?format=json");
	req.done(function(data) {
		var name      = data.name;
		var height    = data.height;
		var mass      = data.height;
		var hairColor = data.hair_color;
		var skinColor = data.skin_color;
		var eyeColor  = data.eye_color;
		var birthYear = data.birth_year;
		var gender    = data.gender;
		var film      = [data.films];
		getFilms(film);
		// biodata(name);
		$(".konten-main").removeClass("hide");
	})
	.fail(function() {
		console.log( "error" );
	})
	.always(function() {
		// $(".loading").remove();
	});
}


function getFilms(film) {
	$.each(film, function(i, v) {
		$.each(v, function(idx, link) {
			var linkFilm = link + "?format=json";
				var req = $.getJSON(linkFilm);
				req.done(function(data) {
					var filmTitle   = data.title;
					var filmOpening = data.opening_crawl;
					var filmChar    = data.characters;
					biodata(filmOpening);
				})
				.fail(function() {
					console.log( "error" );
				})
				.always(function() {
					$(".loading").remove();
				});
		});
	});
}


function biodata(name){
	// console.log(name);
	$(".hasil").append("<p>"+name+"</p>")
	// $(".biodata-detail .bioheight").text(name);
	// li.append(bioLeft);
}