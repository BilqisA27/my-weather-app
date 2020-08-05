let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hours = now.getHours();
let minutes = now.getMinutes();

if (hours < 10) {
  hours = "0" + hours;
}
if (minutes < 10) {
  minutes = "0" + minutes;
}

let displayCurrentDate = document.querySelector(".date");
displayCurrentDate.innerHTML = `${day} ${hours}:${minutes}`;

function whatCity(event) {
  event.preventDefault();
  let apiKey = "adc304e0d775bfcd34cc43d2a3830fc0";
  let city = document.querySelector("#currentCity");
  let newCity = document.querySelector("#searchCity");
  city.innerHTML = newCity.value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.innerHTML}&units=metric&appid=${apiKey}`;
  axios.get(`${apiUrl}`).then(showCurrentLocation);
}

function showCurrentLocation(response) {
  console.log(response.data);
  let weatherDescription = document.querySelector("#currentDescription");
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
}

function getPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", getPosition);

let clickButton = document.querySelector("#search-form");
clickButton.addEventListener("submit", whatCity);
