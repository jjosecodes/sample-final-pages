/**
 * Temperature Page JavaScript
 * Handles temperature data visualization
 */

const API_BASE_URL = 'http://localhost:8000/api';

// DOM Elements
const weatherForm = document.getElementById('weatherForm');
const latInput = document.getElementById('latitude');
const lonInput = document.getElementById('longitude');
const loadingEl = document.getElementById('loading');
const errorEl = document.getElementById('error');

// Quick location buttons - use demo data
const quickButtons = document.querySelectorAll('.btn-quick');
quickButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const lat = btn.dataset.lat;
        const lon = btn.dataset.lon;
        latInput.value = lat;
        lonInput.value = lon;

        // Use demo data for quick locations
        loadDemoData(lat, lon);
    });
});

// Form submission
weatherForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const lat = latInput.value;
    const lon = lonInput.value;
    await fetchWeather(lat, lon);
});

/**
 * Fetch weather data
 */
async function fetchWeather(lat, lon) {
    showLoading();
    hideError();
    hideSections();

    try {
        const response = await fetch(`${API_BASE_URL}/weather?lat=${lat}&lon=${lon}`);

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || 'Failed to fetch weather data');
        }

        const data = await response.json();
        console.log('Weather data:', data);

        displayCurrentTemp(data);
        displayTempForecast(data.forecast);
        displayHourlyTemp(data.hourly);

        hideLoading();
    } catch (error) {
        console.error('Error fetching weather:', error);
        showError(error.message);
        hideLoading();
    }
}

/**
 * Display current temperature
 */
function displayCurrentTemp(data) {
    const current = data.current;
    const location = data.location;

    if (!current) return;

    const locationText = location.city && location.state
        ? `${location.city}, ${location.state}`
        : `Lat: ${location.lat.toFixed(4)}, Lon: ${location.lon.toFixed(4)}`;

    document.getElementById('currentTempValue').textContent = current.temperature || '--';
    document.getElementById('location').textContent = locationText;
    document.getElementById('condition').textContent = current.shortForecast || '--';

    const updateTime = current.startTime ? new Date(current.startTime).toLocaleString() : '--';
    document.getElementById('updateTime').textContent = `Updated: ${updateTime}`;

    // Calculate feels like (simple approximation using wind chill if available)
    const feelsLike = current.temperature || '--';
    document.getElementById('feelsLike').textContent = feelsLike !== '--' ? `${feelsLike}°F` : 'N/A';

    document.getElementById('currentTemp').classList.remove('hidden');
}

/**
 * Display temperature forecast
 */
function displayTempForecast(forecast) {
    if (!forecast || forecast.length === 0) return;

    const container = document.getElementById('tempForecastGrid');
    container.innerHTML = '';

    forecast.slice(0, 7).forEach(period => {
        const card = document.createElement('div');
        card.className = 'forecast-card';

        const temp = period.temperature;
        const unit = period.temperatureUnit;

        card.innerHTML = `
            <h3>${period.name}</h3>
            <div class="forecast-temp">${temp}°${unit}</div>
            <div class="forecast-condition">${period.shortForecast}</div>
            <div class="forecast-details">
                <div>
                    <strong>Condition:</strong>
                    <span>${period.shortForecast}</span>
                </div>
                ${period.isDaytime !== undefined ? `
                <div>
                    <strong>Time:</strong>
                    <span>${period.isDaytime ? 'Day' : 'Night'}</span>
                </div>
                ` : ''}
            </div>
        `;

        container.appendChild(card);
    });

    document.getElementById('tempForecast').classList.remove('hidden');
}

/**
 * Display hourly temperature
 */
function displayHourlyTemp(hourly) {
    if (!hourly || hourly.length === 0) return;

    const container = document.getElementById('hourlyTempScroll');
    container.innerHTML = '';

    hourly.forEach(hour => {
        const card = document.createElement('div');
        card.className = 'hourly-card';

        const time = new Date(hour.startTime);
        const hourStr = time.toLocaleTimeString('en-US', {
            hour: 'numeric',
            hour12: true
        });

        const temp = hour.temperature;
        const unit = hour.temperatureUnit;

        card.innerHTML = `
            <div class="hour">${hourStr}</div>
            <div class="temp">${temp}°${unit}</div>
            <div class="condition">${hour.shortForecast}</div>
        `;

        container.appendChild(card);
    });

    document.getElementById('hourlyTemp').classList.remove('hidden');
}

/**
 * UI Helper Functions
 */
function showLoading() {
    loadingEl.classList.remove('hidden');
}

function hideLoading() {
    loadingEl.classList.add('hidden');
}

function showError(message) {
    errorEl.textContent = `Error: ${message}`;
    errorEl.classList.remove('hidden');
}

function hideError() {
    errorEl.classList.add('hidden');
}

function hideSections() {
    document.getElementById('currentTemp').classList.add('hidden');
    document.getElementById('tempForecast').classList.add('hidden');
    document.getElementById('hourlyTemp').classList.add('hidden');
}

/**
 * Load demo data for quick locations
 */
function loadDemoData(lat, lon) {
    // Map coordinates to city keys
    let cityKey = null;
    if (lat == 38.8894 && lon == -77.0352) cityKey = 'washington';
    else if (lat == 40.7128 && lon == -74.0060) cityKey = 'newyork';
    else if (lat == 34.0522 && lon == -118.2437) cityKey = 'losangeles';
    else if (lat == 41.8781 && lon == -87.6298) cityKey = 'chicago';

    if (cityKey && typeof DEMO_WEATHER_DATA !== 'undefined') {
        const data = DEMO_WEATHER_DATA[cityKey];

        hideError();
        hideSections();

        displayCurrentTemp(data);
        displayTempForecast(data.forecast);
        displayHourlyTemp(data.hourly);
    } else {
        // Fall back to API
        fetchWeather(lat, lon);
    }
}
