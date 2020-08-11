function formatDate(timestamp) {
  let date = new Date(timestamp);

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${formatHours(timestamp)}`;
}

function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = "0" + hours;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  return `${hours}:${minutes}`;
}

function showForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;
  console.log(response.data.list);

  for (let index = 0; index < 6; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `
    <div class="card other-day" >
    <span class="card-body day">
    <span class="changingTime"> ${formatHours(forecast.dt * 1000)} </span>
    <span class="minMax">${Math.round(forecast.main.temp_max)}°/${Math.round(
      forecast.main.temp_min
    )}°</span>
     <span class="emoji"> <img src="http://openweathermap.org/img/wn/${
       forecast.weather[0].icon
     }@2x.png" alt=""> 
    </span>
   </span>
   </div>
  `;
  }
}
function search(city) {
  let apiKey = "adc304e0d775bfcd34cc43d2a3830fc0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(`${apiUrl}`).then(showCurrentLocation);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city},us&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}`).then(showForecast);
}

function handleSubmit(event) {
  event.preventDefault();
  let newCity = document.querySelector("#searchCity");
  search(newCity.value);
}

function showCurrentLocation(response) {
  let weatherDescription = document.querySelector("#current-description");
  let currentCity = document.querySelector("#currentCity");
  let currentTemp = document.querySelector("#currentTemp");
  let currentWind = document.querySelector("#wind");
  let currentHumidity = document.querySelector("#humidity");
  let descriptionNow = response.data.weather[0].description;
  let cityNow = response.data.name;
  let wind = response.data.wind.speed;
  let humidity = response.data.main.humidity;
  let temp = Math.round(response.data.main.temp);
  let iconElement = document.querySelector("#icon-element");
  let displayCurrentDate = document.querySelector(".date");
  displayCurrentDate.innerHTML = formatDate(response.data.dt * 1000);
  celsiusTemperature = response.data.main.temp;
  weatherDescription.innerHTML = `${descriptionNow}`;
  currentCity.innerHTML = `${cityNow}`;
  currentWind.innerHTML = `${wind}`;
  currentHumidity.innerHTML = `${humidity}`;
  currentTemp.innerHTML = `${temp}`;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", `${descriptionNow}`);
}

function showPosition(position) {
  let apiKey = "adc304e0d775bfcd34cc43d2a3830fc0";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
  axios.get(`${apiUrl}`).then(showCurrentLocation);
  let forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
  axios.get(`${forecastUrl}`).then(showForecast);
}

function getPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

function changeToFahrenheit(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let temperatureElement = document.querySelector("#currentTemp");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function changeToCelsius(event) {
  event.preventDefault();
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  let celsiusElement = document.querySelector("#currentTemp");
  celsiusElement.innerHTML = Math.round(celsiusTemperature);
}

search("Brazil");

let celsiusTemperature = null;

let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", getPosition);

let clickButton = document.querySelector("#search-form");
clickButton.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", changeToFahrenheit);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", changeToCelsius);
