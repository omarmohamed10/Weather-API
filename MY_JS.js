$(function(){
	
"use strict";	
	
	
var APPID = "3004ad850374196b4d4dfab1811af463";
var temp;
var loc;
var icon;
var humidity;
var wind;
var direction;

function update(weather) {
    icon.src = "imgs/codes/" + weather.code + ".png";
    humidity.innerHTML = weather.humidity;
    wind.innerHtml = weather.wind;
    direction.innerHTML = weather.direction;
    loc.innerHTML = weather.location;
    temp.innerHTML = weather.temp;
}

window.onload = function () {
	
    temp = document.getElementById("temperature");
    loc = document.getElementById("location");
    icon = document.getElementById("icon");
    humidity = document.getElementById("humidity");
    wind = document.getElementById("wind");
    direction = document.getElementById("direction");

	updateByName("Korea");
  /*  if(navigator.geolocation){
	var showPosition = function(position){
	    updateByGeo(position.coords.latitude, position.coords.longitude);
	};
	navigator.geolocation.getCurrentPosition(showPosition);
    } */
};



/*function updateByGeo(lat, lon){
    var url = "http://api.openweathermap.org/data/2.5/weather?" +
	"lat=" + lat +
	"&lon=" + lon +
	"&APPID=" + APPID;
    sendRequest(url);    
}*/

	function updateByName(CountryName){
    var url = "http://api.openweathermap.org/data/2.5/weather?q=" +
	CountryName+ "&APPID=" + APPID;
    sendRequest(url);    
}


function sendRequest(url){
    var http = new XMLHttpRequest();
    http.onreadystatechange = function() {
	if (http.readyState === 4 && http.status === 200) {
        var data = JSON.parse(http.responseText);
	    var weather = {};
	    weather.code = data.weather[0].id;
	    weather.humidity = data.main.humidity;
	    weather.wind = data.wind.speed;
	    weather.direction = degreesToDirection(data.wind.deg);
	    weather.location = data.name;
	    weather.temp = K2C(data.main.temp);		
	    update(weather);
	}
    };

    http.open("GET", url, true);
    http.send();    
}

function degreesToDirection(degrees){
    var range = 360/16;
    var low = 360 - range/2;
    var high = (low + range) % 360;
    var angles = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
	var i ;
    for(i in angles ) {
	

    if(degrees >= low && degrees < high){
	      console.log(angles[i]);
	      return angles[i];
	}
	  low = (low + range) % 360;
	  high = (high + range) % 360;
    }
			
	
}

/*function K2F(k){
    return Math.round(k*(9/5)-459.67);
}*/

function K2C(k){
    return Math.round(k - 273.15);
}

	
	
});
