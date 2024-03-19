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
      url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=YOUR_API_KEY&units=metric`;
    } else if (city) {
      url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=YOUR_API_KEY&units=metric`;
    } else {
      return;
    }
  
    try {
      const response = await fetch(url);
      const data = await response.json();
      displayWeather(data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  }
  
  function displayWeather(data) {
    const weatherInfo = document.getElementById("weather-info");
    weatherInfo.innerHTML = `
      <h2>${data.name}</h2>
      <p>Temperature: ${data.main.temp}°C</p>
      <p>Weather: ${data.weather[0].description}</p>
      <p>Wind Speed: ${data.wind.speed} m/s</p>
    `;
  }
  