//converting days' numbers to their names
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

//converting months' numbers to their names

function showMonth(today) {
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
  let currentMonth = months[today.getMonth()];
  return currentMonth;
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
  celsiusTemperature = response.data.main.temp; // calling the global variable celsiusTemperature and giving it the realtime current temperature value through API
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
  //small temperature and icon in the day tab
  document.querySelector("#temperature-small").innerHTML = Math.round(
    response.data.main.temp
  );
  document
    .querySelector("#day-icon-small")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
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
  celsiusLink.classList.remove("active"); //remove the active class from the celsius link
  fahrenheitLink.classList.add("active"); //add the active class to the fahrenheit link
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32; //using the value of the global variable celsiusTemperature, which has already received the current temperature value through API using showWeather function
  let temperature = document.querySelector("#temperature");
  let temperatureSmall = document.querySelector("#temperature-small");
  let unitSmall = document.querySelector("#unit-small");
  temperature.innerHTML = Math.round(fahrenheitTemperature);
  temperatureSmall.innerHTML = Math.round(fahrenheitTemperature); //change the temperature from Celsius to Fahrenheit in the current day tab
  unitSmall.innerHTML = "°F"; //change the unit from Celsius to Fahrenheit in the current day tab;
}

function convertToCelsius(event) {
  event.preventDefault();
  celsiusLink.classList.add("active"); //add the active class to the celsius link
  fahrenheitLink.classList.remove("active"); //remove the active class from the fahrenheit link
  let temperature = document.querySelector("#temperature");
  let temperatureSmall = document.querySelector("#temperature-small");
  let unitSmall = document.querySelector("#unit-small");
  temperature.innerHTML = Math.round(celsiusTemperature); //when user clicks convert-to-celsius link, the app returns the celsiusTemperature value (global variable), received from the API
  temperatureSmall.innerHTML = Math.round(celsiusTemperature); //change the temperature from Fahrenheit to Celsius in the current day tab
  unitSmall.innerHTML = "°C"; //change the unit from Fahrenheit to Celsius in the current day tab;
}

//displaying the name of the current day on the Today's page
let now = new Date();
let day1 = document.querySelector("#day-1");
day1.innerHTML = showDay(now);

//displaying the date (number of the current day) and current month on the Today's tab
let dateToday = document.querySelector("#date-today");
dateToday.innerHTML = `${now.getDate()} ${showMonth(now)}`;

//displaying the current time on the Today tab
let currentTime = document.querySelector("#current-time");
currentTime.innerHTML = formatTime(now);

//displaying the name of the searched city
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleCitySearchSubmit);

//adding temperature convertion
let celsiusTemperature = null; //global variable accessible from anywhere including functions, its initial empty value is null, later using it in convertToFahrenheit function and getting its realtime value through API in showWeather function
let celsiusLink = document.querySelector("#celsius");
let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", convertToFahrenheit);
celsiusLink.addEventListener("click", convertToCelsius);

//handles click on Find me button, determines current location
let currentLocationButton = document.querySelector("#find-me-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

// showing default city
searchCity("Stockholm");
