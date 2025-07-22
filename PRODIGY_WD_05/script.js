const API_KEY = "e5b573e174c3121134403c647fe27ceb";

const searchBtn = document.getElementById("search-btn");
const locationBtn = document.getElementById("location-btn");
const locationInput = document.getElementById("location-input");
const weatherCard = document.getElementById("weather-card");
const errorMessage = document.getElementById("error-message");

// Display Elements
const cityName = document.getElementById("city-name");
const weatherDesc = document.getElementById("weather-description");
const temperature = document.getElementById("temperature");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("wind-speed");

// Fetch weather data by city
async function getWeatherByCity(city) {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );
        if (!response.ok) throw new Error("City not found");
        const data = await response.json();
        displayWeather(data);
    } catch {
        showError();
    }
}

// Fetch weather by geolocation
async function getWeatherByCoords(lat, lon) {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        );
        const data = await response.json();
        displayWeather(data);
    } catch {
        showError();
    }
}

// Show weather data
function displayWeather(data) {
    cityName.textContent = `${data.name}, ${data.sys.country}`;
    weatherDesc.textContent = data.weather[0].description;
    temperature.textContent = data.main.temp;
    humidity.textContent = data.main.humidity;
    windSpeed.textContent = data.wind.speed;

    errorMessage.classList.add("hidden");
    weatherCard.classList.remove("hidden");
}

// Error handler
function showError() {
    weatherCard.classList.add("hidden");
    errorMessage.classList.remove("hidden");
}

// Event listeners
searchBtn.addEventListener("click", () => {
    const city = locationInput.value.trim();
    if (city) getWeatherByCity(city);
});

locationBtn.addEventListener("click", () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (pos) => getWeatherByCoords(pos.coords.latitude, pos.coords.longitude),
            showError
        );
    } else {
        showError();
    }
});

// Load Mumbai by default
getWeatherByCity("Mumbai");
