const form = document.getElementById('city-form');
const cityName = document.getElementById('city-name');
let userCity = cityName.value;

// CITY
/* Think I need to put EVERYTHING in a function of if statement so defult to Philly unless city entered by user */
let city = 'Philadelphia';
let currentLoc = 'Weather for ' + city;
$('.city').append(currentLoc);

// jQuery TO GET THE WEATHER JSON
$.getJSON('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=imperial&APPID=804cf3b11e9abeee25a8f6e6cb189d31', function (data) {
  console.log(data);

  // GET ICON FROM 2ND ARRAY IF AVAILABLE
  let iconTwo = 0;
  if (data.weather[1]) {
    iconTwo = 1;
  }
  let icon = 'https://openweathermap.org/img/w/' + data.weather[iconTwo].icon + '.png';
  $('.icon').attr('src', icon);
  console.log('data.weather array # =  ' + iconTwo);

  // GET TEXT DESCRIPTION FROM 2ND ARRAY IF AVAILABLE
  let descTwo = 0;
  if (data.weather[1]) {
    descTwo = 1;
  }
  let weatherDesc = 'Conditions: ' + data.weather[descTwo].main + ' (' + data.weather[descTwo].description + ')';
  $('.weather').append(weatherDesc);
  console.log('data.weather array # =  ' + descTwo);

  // TEMPERATURE
  let temp = 'Temperature: ' + Math.round(data.main.temp) + `<span class="deg"><sup>&deg;</sup></span>` + ' F';
  let feelsLike = '(Feels like: ' + Math.round(data.main.feels_like) + `<span>&deg;</span>` + ')';
  $('.temp').append(temp);
  $('.feels-like').append(feelsLike);

  // COORDINATES
  let lat = data.coord.lat;
  let lon = data.coord.lon;

  // CONVERT LAT & LONG INTO DEGREES
  // Get integer and decimal as separate values
  let latInt = Math.trunc(lat);
  let latDecimal,
    latMins,
    latMinInt,
    latMinDec,
    latSecs = '';
  // console.log("Lat Degrees: " + latInt);
  if (lat > 0) {
    latDecimal = lat - latInt;
    latMins = latDecimal * 60;
    latMinInt = Math.trunc(latMins);
    latMinDec = latMins - latMinInt;
    latSecs = (latMinDec * 60).toFixed(1);
  } else {
    latDecimal = Math.abs(lat - latInt);
    latMins = latDecimal * 60;
    latMinInt = Math.trunc(latMins);
    latMinDec = latMins - latMinInt;
    latSecs = (latMinDec * 60).toFixed(1);
  }
  // console.log("Lat Minutes: " + latMinInt);
  // console.log("Lat Seconds: " + latSecs);

  let lonInt = Math.trunc(lon);
  let lonDecimal,
    lonMins,
    lonMinInt,
    lonMinDec,
    lonSecs = '';
  // console.log("Long Degrees: " + lonInt);
  if (lon > 0) {
    lonDecimal = lon - lonInt;
    lonMins = lonDecimal * 60;
    lonMinInt = Math.trunc(lonMins);
    lonMinDec = lonMins - lonMinInt;
    lonSecs = (lonMinDec * 60).toFixed(1);
  } else {
    lonDecimal = Math.abs(lon - lonInt);
    lonMins = lonDecimal * 60;
    lonMinInt = Math.trunc(lonMins);
    lonMinDec = lonMins - lonMinInt;
    lonSecs = (lonMinDec * 60).toFixed(1);
  }

  let latDegMinSec = latInt + `<span>&deg;</span> ` + latMinInt + `<span>&prime;</span> ` + latSecs + `<span>&Prime;</span> `;
  let lonDegMinSec = lonInt + `<span>&deg;</span> ` + lonMinInt + `<span>&prime;</span> ` + lonSecs + `<span>&Prime;</span> `;
  let latDesc = 'Lat.: ' + latDegMinSec + ' (' + data.coord.lat + ')';
  let longDesc = 'Long.: ' + lonDegMinSec + ' (' + data.coord.lon + ')';
  $('.lat').append(latDesc);
  $('.long').append(longDesc);
  // console.log("Long Minutes: " + lonMinInt);
  // console.log("Long Seconds: " + lonSecs);

  // SUNRISE
  let sunriseTime = data.sys.sunrise;
  let dateRise = new Date(sunriseTime * 1000);
  let riseTime = 'Sunrise: ' + dateRise.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  $('.sunrise').append(riseTime);
  console.log(sunriseTime);

  // SUNSET
  let sunsetTime = data.sys.sunset;
  let dateSet = new Date(sunsetTime * 1000);
  let setTime = 'Sunset: ' + dateSet.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  $('.sunset').append(setTime);
  console.log(sunsetTime);

  // Calculate hours of daylight
  let daylight = sunsetTime - sunriseTime;
  let lightHrs = Math.trunc(daylight / 3600);
  console.log('hrs of light: ' + lightHrs);
  let lightMins = Math.trunc((daylight / 3600 - lightHrs) * 60);
  console.log('mins of light: ' + lightMins);
  let lightSecs = Math.round(((daylight / 3600 - lightHrs) * 60 - lightMins) * 60);
  console.log('secs of light: ' + lightSecs);
  let lightLength = new Date(daylight * 1000);
  let hrsOfLight = 'Hrs of light: ' + lightHrs + ':' + lightMins + ':' + lightSecs;
  console.log('Total daylight: ' + hrsOfLight);
  $('.daylight').append(hrsOfLight);

  // HUMIDITY, PRESSURE, VISIBILITY
  let humidity = 'Humidity: ' + data.main.humidity + '%';
  let pressure = 'Pressure: ' + data.main.pressure + ' hPa';
  let visibility = 'Visibility: ' + ((data.visibility / 1000) * 0.621371).toFixed(1) + ' mi';
  $('.humidity').append(humidity);
  $('.pressure').append(pressure);
  $('.visibility').append(visibility);

  // WIND SPEED, WIND GUST
  let windSpeed = 'Wind speed: ' + Math.round(data.wind.speed) + ' mph';
  let windGust = 'Wind gusts: ' + Math.round(data.wind.gust) + ' mph';
  if (!data.wind.gust) {
    windGust = 'Wind gusts: no gusts';
  }
  $('.wind-speed').append(windSpeed);
  $('.wind-gust').append(windGust);

  // WIND DIRECTION
  let windDir = data.wind.deg;
  // console.log(windDir);
  let direction = '';
  if (windDir >= 11.25 && windDir < 33.75) {
    direction = ' NNE';
  } else if (windDir >= 33.75 && windDir < 56.25) {
    direction = ' NE';
  } else if (windDir >= 56.25 && windDir < 78.75) {
    direction = ' ENE';
  } else if (windDir >= 78.75 && windDir < 101.25) {
    direction = ' E';
  } else if (windDir >= 101.25 && windDir < 123.75) {
    direction = ' ESE';
  } else if (windDir >= 123.75 && windDir < 146.25) {
    direction = ' SE';
  } else if (windDir >= 146.25 && windDir < 168.75) {
    direction = ' SSE';
  } else if (windDir >= 168.75 && windDir < 191.25) {
    direction = ' S';
  } else if (windDir >= 191.25 && windDir < 213.75) {
    direction = ' SSW';
  } else if (windDir >= 213.75 && windDir < 236.25) {
    direction = ' SW';
  } else if (windDir >= 236.25 && windDir < 258.75) {
    direction = ' WSW';
  } else if (windDir >= 258.75 && windDir < 281.25) {
    direction = ' W';
  } else if (windDir >= 281.25 && windDir < 303.75) {
    direction = ' WNW';
  } else if (windDir >= 303.75 && windDir < 326.25) {
    direction = ' NW';
  } else if (windDir >= 326.25 && windDir < 348.75) {
    direction = ' NNW';
  } else {
    direction = ' N';
  }

  let windDegree = 'Wind dir: ' + data.wind.deg + `<span>&deg;</span>` + direction;
  $('.wind-degree').append(windDegree);
});

// https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
// https://api.openweathermap.org/data/2.5/onecall?lat=-75.16&lon=39.95&exclude=hourly,daily&units=imperial&appid=804cf3b11e9abeee25a8f6e6cb189d31

const dailyData = document.getElementById('daily-data');
const hourlyData = document.getElementById('hourly-data');
const weatherAlerts = document.getElementById('weather-alerts');
const hourlyDetail = document.getElementById('hourly-detail');

// let city2 = "Philadelphia";
$.getJSON('https://api.openweathermap.org/data/2.5/onecall?lat=39.95&lon=-75.16&exclude=minutely&units=imperial&appid=804cf3b11e9abeee25a8f6e6cb189d31', function (data) {
  console.log(data);

  // need a for or forEach loop here and I need variables to be appended to the html tags

  let dayData = data.daily;
  let hrData = data.hourly;
  // console.log(dayData.length);

  // DAILY LOOP
  for (i = 0; i < dayData.length; i++) {
    // let date = dayData[i].dt; NO, need to grab todays date if [0], then ++ for remaining dates
    let date = dayData[i].dt;
    let date2 = new Date(date * 1000).toLocaleDateString('en-us', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });
    let tempMin = Math.round(dayData[i].temp.min);
    let tempMax = Math.round(dayData[i].temp.max);
    // let humidity = dayData[i].humidity;
    let precip = dayData[i].pop * 100;
    let moonPhase = Math.round(dayData[i].moon_phase * 100);
    let moonRise = dayData[i].moonrise;
    let moonrise2 = new Date(moonRise * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    let moonSet = dayData[i].moonset;
    let moonset2 = new Date(moonSet * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    let dailyMain = dayData[i].weather[0].main;
    // let dailyDesc = dayData[i].weather[0].description;

    // SUNRISE
    let sunriseTime = data.daily[i].sunrise;
    let dateRise = new Date(sunriseTime * 1000);
    let riseTime = 'Sunrise: ' + dateRise.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    // console.log(riseTime);

    // SUNSET
    let sunsetTime = data.daily[i].sunset;
    let dateSet = new Date(sunsetTime * 1000);
    let setTime = 'Sunset: ' + dateSet.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    let dayOutput = `<li class="curr-day"><span class="bold">${date2}</span>
      <ul id="daily-${[i]}">
        <li>Low: ${tempMin}<span>&deg;</span>F</li>
        <li>High: ${tempMax}<span>&deg;</span>F</li>
        <li>Precip: ${precip}%</li>

        <li>Moon phase: ${moonPhase}%</li>
        <li>Moon rise: ${moonrise2}</li>
        <li>Moon set: ${moonset2}</li>
        
        <li>${dailyMain}</li>

        <li>${riseTime}</li>
        <li>${setTime}</li>
      </ul>
    </li>`;

    let dailyText = document.createElement('li');

    dailyText.classList.add('daily-data');

    dailyData.insertAdjacentHTML('beforeend', dayOutput);
  }

  // HOURLY LOOP
  for (i = 0; i < hrData.length - 18; i++) {
    let main = data.hourly[i].weather[0].main;
    let desc = data.hourly[i].weather[0].description;

    let time = data.hourly[i].dt;
    let hour = new Date(time * 1000);
    let outputHour = hour.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    let temp = 'Temp.: ' + Math.round(data.hourly[i].temp) + `<span>&deg;</span>` + 'F';
    let feelsLike = '(Feels like: ' + Math.round(data.hourly[i].feels_like) + `<span>&deg;</span>` + ')';

    let dewPt = Math.round(data.hourly[i].dew_point) + `<span>&deg;</span>` + 'F';
    let pop = Math.round(data.hourly[i].pop * 100) + '%';
    let humidity = data.hourly[i].humidity + '%';

    let pressure = data.hourly[i].pressure + ' mb';
    let visibility = ((data.hourly[i].visibility / 1000) * 0.621371).toFixed(1) + ' mi';

    let windSpeed = 'Wind: ' + Math.round(data.hourly[i].wind_speed) + ' mph';
    let gustSpeed = 'Gusts: ' + Math.round(data.hourly[i].wind_gust) + ' mph';
    let windDir = data.hourly[i].wind_deg;

    let direction = '';
    if (windDir >= 11.25 && windDir < 33.75) {
      direction = ' NNE';
    } else if (windDir >= 33.75 && windDir < 56.25) {
      direction = ' NE';
    } else if (windDir >= 56.25 && windDir < 78.75) {
      direction = ' ENE';
    } else if (windDir >= 78.75 && windDir < 101.25) {
      direction = ' E';
    } else if (windDir >= 101.25 && windDir < 123.75) {
      direction = ' ESE';
    } else if (windDir >= 123.75 && windDir < 146.25) {
      direction = ' SE';
    } else if (windDir >= 146.25 && windDir < 168.75) {
      direction = ' SSE';
    } else if (windDir >= 168.75 && windDir < 191.25) {
      direction = ' S';
    } else if (windDir >= 191.25 && windDir < 213.75) {
      direction = ' SSW';
    } else if (windDir >= 213.75 && windDir < 236.25) {
      direction = ' SW';
    } else if (windDir >= 236.25 && windDir < 258.75) {
      direction = ' WSW';
    } else if (windDir >= 258.75 && windDir < 281.25) {
      direction = ' W';
    } else if (windDir >= 281.25 && windDir < 303.75) {
      direction = ' WNW';
    } else if (windDir >= 303.75 && windDir < 326.25) {
      direction = ' NW';
    } else if (windDir >= 326.25 && windDir < 348.75) {
      direction = ' NNW';
    } else {
      direction = ' N';
    }

    let hrOutput = `<li class="curr-hour"><span class="bold">${outputHour}</span>
      <ul id="hourly-${[i]}">
        <li>Conditions: ${main}</li>

        <li>${temp} <span>${feelsLike}</span></li>

        <li>${windSpeed} | ${gustSpeed}</li>
      
        <li>Humidity: ${humidity} | Precip.: ${pop}</li>
      </ul>
    </li>`;
    // <li>Wind dir.: ${windDir}<span>&deg;</span> ${direction}</li>
    // <li>Pressure: ${pressure}</li>
    // <li>Visibility: ${visibility}</li>
    // <li>Dew point: ${dewPt}</li>
    let weatherText = document.createElement('li');

    weatherText.classList.add('hourly-data');

    hourlyData.insertAdjacentHTML('beforeend', hrOutput);
  }

  if (data.alert) {
    let senderName = data.alerts.sender_name;
    let alertEvent = data.alerts.event;
    let eventStart = data.alerts.start;
    let eventEnd = data.alerts.end;
    let eventDesc = data.alerts.description;
    let tags = data.alerts.tags;

    let alertOutput = `
      <li>Precip. %: ${senderName}</li>
      <li>Precip. %: ${alertEvent}</li>
      <li>Precip. %: ${eventStart}</li>
      <li>Precip. %: ${eventEnd}</li>
      <li>Precip. %: ${eventDesc}</li>
      <li>Precip. %: ${tags}</li>
      `;

    let alertText = document.createElement('li');

    alertText.classList.add('alert-data');

    weatherAlerts.insertAdjacentHTML('beforeend', alertOutput);

    console.log('Alert exists');
  } else {
    console.log('Weather alerts for this area: No alerts');
  }

  if (data.alert) {
    let alertNotice = 'Alerts: ' + `${alertEvent}`;
    $('.alert').append(alertNotice);
  } else {
    let alertNotice = 'Alerts: No alerts';
    $('.alert').append(alertNotice);
  }
});

// inside Fx not for loop:
// let hourOne = data.hourly[0].dt;
// let one = new Date(hourOne * 1000);
// let firstHour = one.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) + ": ";
// console.log(firstHour);
// $('.first-hour').append(firstHour);

// let temp1 = "Temp: " + data.hourly[0].temp;
// $('.temp1').append(temp1);
