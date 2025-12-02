/**
 * Wind Page JavaScript
 * Handles wind data visualization with compass
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

        displayCurrentWind(data);
        displayWindForecast(data.forecast);
        displayHourlyWind(data.hourly);

        hideLoading();
    } catch (error) {
        console.error('Error fetching weather:', error);
        showError(error.message);
        hideLoading();
    }
}

/**
 * Display current wind
 */
function displayCurrentWind(data) {
    const current = data.current;
    const location = data.location;

    if (!current) return;

    const locationText = location.city && location.state
        ? `${location.city}, ${location.state}`
        : `Lat: ${location.lat.toFixed(4)}, Lon: ${location.lon.toFixed(4)}`;

    // Extract wind speed (remove "mph" if present)
    const windSpeed = current.windSpeed ? current.windSpeed.replace(/[^\d]/g, '') : '--';
    document.getElementById('currentWindSpeed').textContent = windSpeed;

    // Set wind direction
    const windDirection = current.windDirection || '--';
    document.getElementById('windDirection').textContent = windDirection;

    // Rotate compass arrow based on direction
    rotateWindArrow(windDirection);

    document.getElementById('location').textContent = locationText;
    document.getElementById('condition').textContent = current.shortForecast || '--';

    const updateTime = current.startTime ? new Date(current.startTime).toLocaleString() : '--';
    document.getElementById('updateTime').textContent = `Updated: ${updateTime}`;

    // Wind gust (if available)
    document.getElementById('windGust').textContent = 'N/A';

    document.getElementById('currentWind').classList.remove('hidden');
}

/**
 * Rotate wind arrow based on direction
 */
function rotateWindArrow(direction) {
    const arrow = document.getElementById('windArrow');
    if (!arrow) return;

    const directions = {
        'N': 0, 'NNE': 22.5, 'NE': 45, 'ENE': 67.5,
        'E': 90, 'ESE': 112.5, 'SE': 135, 'SSE': 157.5,
        'S': 180, 'SSW': 202.5, 'SW': 225, 'WSW': 247.5,
        'W': 270, 'WNW': 292.5, 'NW': 315, 'NNW': 337.5
    };

    const degrees = directions[direction] || 0;
    arrow.style.transform = `rotate(${degrees}deg)`;
}

/**
 * Display wind forecast
 */
function displayWindForecast(forecast) {
    if (!forecast || forecast.length === 0) return;

    const container = document.getElementById('windForecastGrid');
    container.innerHTML = '';

    forecast.slice(0, 7).forEach(period => {
        const card = document.createElement('div');
        card.className = 'forecast-card';

        card.innerHTML = `
            <h3>${period.name}</h3>
            <div class="forecast-temp">${period.windSpeed}</div>
            <div class="forecast-condition">From ${period.windDirection}</div>
            <div class="forecast-details">
                <div>
                    <strong>Direction:</strong>
                    <span>${period.windDirection}</span>
                </div>
                <div>
                    <strong>Condition:</strong>
                    <span>${period.shortForecast}</span>
                </div>
            </div>
        `;

        container.appendChild(card);
    });

    document.getElementById('windForecast').classList.remove('hidden');
}

/**
 * Display hourly wind
 */
function displayHourlyWind(hourly) {
    if (!hourly || hourly.length === 0) return;

    const container = document.getElementById('hourlyWindScroll');
    container.innerHTML = '';

    hourly.forEach(hour => {
        const card = document.createElement('div');
        card.className = 'hourly-card';

        const time = new Date(hour.startTime);
        const hourStr = time.toLocaleTimeString('en-US', {
            hour: 'numeric',
            hour12: true
        });

        card.innerHTML = `
            <div class="hour">${hourStr}</div>
            <div class="temp" style="color: var(--primary-blue);">${hour.windSpeed}</div>
            <div class="condition">${hour.windDirection}</div>
        `;

        container.appendChild(card);
    });

    document.getElementById('hourlyWind').classList.remove('hidden');
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
    document.getElementById('currentWind').classList.add('hidden');
    document.getElementById('windForecast').classList.add('hidden');
    document.getElementById('hourlyWind').classList.add('hidden');
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

        displayCurrentWind(data);
        displayWindForecast(data.forecast);
        displayHourlyWind(data.hourly);
    } else {
        // Fall back to API
        fetchWeather(lat, lon);
    }
}
