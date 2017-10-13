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
		actorProfile(name,height,mass,hairColor,skinColor,eyeColor,birthYear,gender,film);
		getFilms(film);
	})
	.fail(function() {
		console.log( "error" );
	})
	.always(function() {
		// $(".profile").removeClass("hide");

		setTimeout(function(){
			$(".loading-page").remove();
		},2500);
		
	});
}


function getFilms(film) {
	$.each(film, function(i, v) {
		$.each(v, function(idx, link) {
			var linkFilm = link + "?format=json";
				var req = $.getJSON(linkFilm);
				req.done(function(data) {
					var filmTitle    = data.title;
					var filmOpening  = data.opening_crawl;
					var filmChar     = data.characters;
					var filmDirector = data.director;
					var filmProducer = data.producer;
					var filmRelease  = data.release_date;
					moviesProfile(filmTitle, filmDirector, filmRelease, filmProducer, filmOpening);
					console.log(data);
				})
				.fail(function() {
					console.log( "error" );
				})
				.always(function() {
					$(".more-film").removeClass('hide');
					showMoreFilm();
				});
		});
	});
}


function actorProfile(name,height,mass,hairColor,skinColor,eyeColor,birthYear,gender,film){
	var actorMovie = name.split(" ").splice(-1);
	$(".actor-name").append(name);
	$(".actor-height").append(height);
	$(".actor-mass").append(mass);
	$(".actor-hair").append(hairColor);
	$(".actor-skin").append(skinColor);
	$(".actor-birth").append(birthYear);
	$(".actor-gender").append(gender);
	$(".actor-movies").append(actorMovie+" Movie&rsquo;s");
}


function moviesProfile(filmTitle, filmDirector, filmRelease, filmProducer, filmOpening){
	var tempFilm = $("<div class='col-md-3 col-sm-6 movies-list'><div class='movies-box'><div class='movies-thumb'><div class='overlay'><div class='overlay-icon'><i class='fa fa-play-circle-o'></i></div></div></div><div class='movies-caption'><h3>"+filmTitle+"</h3><div class='movie-credit'><ul><li><span>Director:</span><span>"+filmDirector+"</span></li><li><span>Release:</span><span>"+filmRelease+"</span></li></ul></div></div></div></div>");

	$(".movies-konten .row").append(tempFilm);
	$(".related-title").empty().append(filmTitle);
	$(".related-director").empty().append(filmDirector);
	$(".related-producer").empty().append(filmProducer);
	$(".related-date").empty().append(filmRelease);
	$(".related-opening").empty().append(filmOpening);
}


function showMoreFilm(){
	var myFilm = $(".movies-konten .row").find(".movies-list");
	var filmLenght = myFilm.length;
	$(".more-film").removeClass('hide');
	x = 4;
	$('.movies-konten .row .movies-list:lt('+x+')').addClass('show');
	$('.more-film').click(function () {
		x= (x+5 <= filmLenght) ? x+5 : filmLenght;
		$('.movies-konten .row .movies-list:lt('+x+')').show();
	});

	$(".related-more").click(function(){
		$(".related-caption").toggleClass("open");
	});
}