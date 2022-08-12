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

//displaying the current weather and the name of the current searched city and the icon according to the weather
function showWeather(response) {
  document.querySelector("#current-city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
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

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = "+68 ";
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = "+20 ";
}

//displaying the name of the current day on the Today tab
let now = new Date();
let day1 = document.querySelector("#day-1");
day1.innerHTML = showDay(now);

//displaying the current time on the Today tab
let currentTime = document.querySelector("#current-time");
currentTime.innerHTML = formatTime(now);

//displaying the name of the searched city
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleCitySearchSubmit);

//adding temperature convertion
let celsiusLink = document.querySelector("#celsius");
let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", convertToFahrenheit);
celsiusLink.addEventListener("click", convertToCelsius);

//handles click on Find me button, determines current location
let currentLocationButton = document.querySelector("#find-me-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

// showing default city
searchCity("Stockholm");
