function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showWeather);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

function showWeather(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  fetchWeatherData(lat, lon);
}

function getWeather() {
  const city = document.getElementById("city").value;
  fetchWeatherData(null, null, city);
}

async function fetchWeatherData(latitude, longitude, city) {
  let url;
  if (latitude && longitude) {
    url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=cee928850321d26bc821a2a3cde74329`;
  } else if (city) {
    url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=cee928850321d26bc821a2a3cde74329`;
  } else {
    return;
  }

  try {
    const response = await fetch(url);
    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    console.error("Error fetching weather data:", error);
    // Provide user feedback here, e.g., display an error message on the UI
  }
}

function displayWeather(data) {
  const weatherInfo = document.getElementById("weather-info");
  const weatherEmoji = getWeatherEmoji(data.weather[0].description);
  
  // Convert temperature from Kelvin to Celsius
  const temperatureCelsius = (data.main.temp - 273.15).toFixed(1);

  weatherInfo.innerHTML = `
    <h2>${data.name}</h2>
    <p>${weatherEmoji} ${data.weather[0].description}</p>
    <p>Temperature: ${temperatureCelsius}°C</p>
    <p>Wind Speed: ${data.wind.speed} m/s</p>
  `;
}


function getWeatherEmoji(description) {
  description = description.toLowerCase();
  if (description.includes("clear")) {
    return "☀️";
  } else if (description.includes("clouds")) {
    return "☁️";
  } else if (description.includes("rain")) {
    return "🌧️";
  } else if (description.includes("thunderstorm")) {
    return "⛈️";
  } else if (description.includes("snow")) {
    return "❄️";
  } else {
    return "❓"; // Emoji for unknown weather
  }
}
