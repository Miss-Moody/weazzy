//converting days' numbers to their names (for today)
function showDay(today) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let currentDay = days[today.getDay()];
  return currentDay;
}

function formatTime(today) {
  let hours = today.getHours();
  let minutes = today.getMinutes();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000); // timestamp is converted to date according to the formula
  let day = date.getDay(); // gives an index of a day (a number)
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day]; // returning a name of the day from the array with its index
}

function formatDayNumber(timestamp) {
  let date = new Date(timestamp * 1000);
  let dateNumber = date.getDate();
  return dateNumber;
}

//converting months' numbers to their names
function formatMonth(timestamp) {
  let date = new Date(timestamp * 1000);
  let month = date.getMonth(); // gives an index of a month (a number)
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return months[month]; // returning a name of the month from the array with its index
}

function displayForecast(response) {
  console.log(response.data.daily);
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#myTab");
  let forecastHTML = "";

  forecast.forEach(function (forecastDay, index) {
    if (index < 5)
      // index - is the parameter, that is equal to array index (0 - first day, 1 - second...), we display the number of days, that we need (no more than that)
      forecastHTML =
        forecastHTML +
        `<li class="nav-item" role="presentation">      
              <div
                class="nav-link"
                              >
                <div class="day">
                  ${formatDay(forecastDay.dt)}<br />
                  <img class="day-icon" id="day-icon-small" src="http://openweathermap.org/img/wn/${
                    forecastDay.weather[0].icon
                  }@2x.png" /> <span id="temperature-small">${Math.round(
          forecastDay.temp.day
        )}</span><span id="unit-small">°</span><br />
                  <span id="date-today">${formatDayNumber(
                    forecastDay.dt
                  )} ${formatMonth(forecastDay.dt)}</span>
                </div>
              </div>
            </li>`;
  });
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "5f88737082e422aa9d05e764356880e9";
  let apiForecastUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiForecastUrl).then(displayForecast);
}

//displaying the current weather and the name of the current searched city and the icon according to the weather
function showWeather(response) {
  let celsiusTemperature = response.data.main.temp; // calling the global variable celsiusTemperature and giving it the realtime current temperature value through API
  document.querySelector("#current-city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML =
    Math.round(celsiusTemperature);
  document.querySelector("#wind").innerHTML = response.data.wind.speed;
  document.querySelector("#pressure").innerHTML = response.data.main.pressure;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].main;
  //dynamic icon
  document
    .querySelector("#day-big-icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  //dynamic icon alt attribute = description
  document
    .querySelector("#day-big-icon")
    .setAttribute("alt", response.data.weather[0].main);

  getForecast(response.data.coord);
}

//making an API call to find the city + calling the function for displaying weather in it
function searchCity(city) {
  let apiKey = "5f88737082e422aa9d05e764356880e9";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

//handles the search when user presses the Search button + calls the function for displaying weather in it
function handleCitySearchSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city").value;
  searchCity(city);
}

//determines current user position and calls the showWeather function for showing weather in current location
function searchLocation(position) {
  let apiKey = "5f88737082e422aa9d05e764356880e9";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

//displaying the name of the current day on the Today's page
let now = new Date();
let day1 = document.querySelector("#day-1");
day1.innerHTML = showDay(now);

//displaying the current time on the Today tab
let currentTime = document.querySelector("#current-time");
currentTime.innerHTML = formatTime(now);

//displaying the name of the searched city
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleCitySearchSubmit);

//handles click on Find me button, determines current location
let currentLocationButton = document.querySelector("#find-me-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

//displaying fact of the day
let apiFactUrl = `https://uselessfacts.jsph.pl/random.json?language=en`;
fetch(apiFactUrl, { headers: { "Content-Type": "application/json" } })
  .then(async function (response) {
    let { text } = JSON.parse(await response.text());
    document.querySelector("#day-fact").innerHTML = text;
  })
  .catch(function (error) {
    console.log(error);
  });

// showing default city
searchCity("Stockholm");
