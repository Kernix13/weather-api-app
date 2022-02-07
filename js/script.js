

// const cityName = document.getElementById("city-name");

// const input = document.getElementById("user-city");
// const cityoutput = document.getElementById("cityoutput");
// input.addEventListener("click", function(e) {
//   cityoutput.textContent  = e.target.value;
//   console.log(cityoutput);
//   e.preventDefault;
// });
// Create an input for the user to enter a "Valid" city name then grab that as the value for city

// use jQuery to get the weather JSON
let city = "Philadelphia";
let currentLoc = "Weather for " + city;
$.getJSON("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&APPID=804cf3b11e9abeee25a8f6e6cb189d31", function(data) {
  // console.log(data);
  
  let icon = "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
  let weatherDesc = "Conditions: " + data.weather[0].main + " (" + data.weather[0].description + ")";
  let temp = "Temperature: " + Math.round(data.main.temp) + " (F)";
  let windSpeed = "Wind speed: " + Math.round(data.wind.speed) + " mph";
  let windGust = "Wind gusts: " + Math.round(data.wind.gust) + " mph";
  if (!data.wind.gust) {
    windGust = "Wind gusts: 0 mph";
  }
  let sunrise = "Sunrise: " + data.sys.sunrise;
  let sunset = "Sunset: " + data.sys.sunset;
  let long = "Latitude: " + data.coord.lon;
  let lat = "Longitude: " + data.coord.lat;
  let sunriseTime = data.sys.sunrise;
  let dateRise = new Date(sunriseTime * 1000);
  let riseTime = "Sunrise: " + dateRise.toLocaleTimeString();
  // console.log(riseTime);
  
  let sunsetTime = data.sys.sunset;
  let dateSet = new Date(sunsetTime * 1000);
  let setTime = "Sunset: " + dateSet.toLocaleTimeString();
  // console.log(setTime);
  
  $('.city').append(currentLoc);
  $('.icon').attr('src', icon);
  $('.weather').append(weatherDesc);
  $('.temp').append(temp);
  $('.wind-speed').append(windSpeed);
  $('.wind-gust').append(windGust);
  $('.sunrise').append(riseTime);
  $('.sunset').append(setTime);
  $('.long').append(long);
  $('.lat').append(lat);
  
});