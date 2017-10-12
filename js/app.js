
$(document).ready(function(){
	var peopleID=2;
	getPeople(peopleID);
});

function getPeople(peopleID){
	$.getJSON("https://swapi.co/api/people/"+peopleID+"/?format=json", function(data) {
		var name = data.name;
		var height = data.height;
		var mass = data.height;
		var hairColor = data.hair_color;
		var skinColor = data.skin_color;
		var eyeColor = data.eye_color;
		var birthYear = data.birth_year;
		var gender = data.gender;
		var film = [data.films];
		console.log("Nama = "+name+" Tinggi = "+height+" Berat = "+mass+" Rambut = "+hairColor+" Kulit = "+skinColor+" Mata = "+eyeColor+" TTL = "+birthYear+" Kel = "+gender);
		getFilms(film);
	});
}


function getFilms(film){
	$.each(film, function (i,v) {
		$.each(v, function (idx,link) {
			var linkFilm = link+"?format=json";
			$.getJSON(linkFilm, function(data) {
				var filmTitle = data.title;
				var filmOpening = data.opening_crawl;
				var filmChar = data.characters;
				$(".hasil").append("<p>"+filmOpening+"</p>")
			});
		});
	});
}

