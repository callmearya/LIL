const API_KEY = 'b619f429ef275f8c2c48e44338e880e6'; // Replace with your Weatherstack API key
const BASE_URL = 'https://api.weatherstack.com/current'; // Use HTTPS

const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');
const timeZoneEl = document.getElementById('time-zone');
const countryEl = document.getElementById('country');
const currentWeatherItemsEl = document.getElementById('current-weather-items');
const currentTempEl = document.getElementById('current-temp');
const floodWarningEl = document.createElement('div');

// Fetch Weather Data
function fetchWeather(latitude, longitude) {
    const url = `${BASE_URL}?access_key=${API_KEY}&query=${latitude},${longitude}`;

    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            if (data.error) {
                console.error('Error fetching weather data:', data.error.info);
                return;
            }
            displayWeatherData(data);
        })
        .catch((err) => console.error('API fetch error:', err));
}

// Display Weather Data
function displayWeatherData(data) {
    const { temperature, wind_speed, humidity, weather_descriptions, feelslike, precip } = data.current;
    const { country, region, name: city } = data.location;

    currentWeatherItemsEl.innerHTML = `
        <div class="weather-item"><span>Temperature:</span> ${temperature}°C</div>
        <div class="weather-item"><span>Feels Like:</span> ${feelslike}°C</div>
        <div class="weather-item"><span>Wind Speed:</span> ${wind_speed} km/h</div>
        <div class="weather-item"><span>Humidity:</span> ${humidity}%</div>
        <div class="weather-item"><span>Conditions:</span> ${weather_descriptions[0]}</div>
    `;

    if (precip > 50) { 
        floodWarningEl.innerHTML = `
            <div class="flood-warning">
                <span>Flood Warning:</span>
                <p>Heavy rainfall detected. Please stay safe and monitor local advisories!</p>
            </div>
        `;
        document.body.appendChild(floodWarningEl);
    }

    timeZoneEl.textContent = `Region: ${region}`;
    countryEl.textContent = `Country: ${country}`;
    currentTempEl.innerHTML = `<h2>${temperature}°C</h2><p>${weather_descriptions[0]}</p>`;
}

// Update Time and Date
function updateTimeAndDate() {
    const now = new Date();
    const dateOptions = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
    const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const date = now.toLocaleDateString(undefined, dateOptions);

    timeEl.textContent = `Time: ${time}`;
    dateEl.textContent = `Date: ${date}`;
}

// Get User Location
function getUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                fetchWeather(latitude, longitude);
            },
            (error) => {
                console.error('Geolocation error:', error);
                alert('Unable to fetch your location. Using default location (Chennai).');
                fetchWeather(13.0827, 80.2707);
            }
        );
    } else {
        alert('Geolocation is not supported by your browser. Using default location (Chennai).');
        fetchWeather(13.0827, 80.2707);
    }
}

// Initialize App
function init() {
    updateTimeAndDate();
    setInterval(updateTimeAndDate, 60000);
    getUserLocation();
}

init();
