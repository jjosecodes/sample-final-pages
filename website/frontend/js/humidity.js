
const API_BASE_URL = 'http://localhost:8000/api';

// DOM Elements
const weatherForm = document.getElementById('weatherForm');
const latInput = document.getElementById('latitude');
const lonInput = document.getElementById('longitude');
const loadingEl = document.getElementById('loading');
const errorEl = document.getElementById('error');

// Quick location buttons 
const quickButtons = document.querySelectorAll('.btn-quick');
quickButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const lat = btn.dataset.lat;
        const lon = btn.dataset.lon;
        latInput.value = lat;
        lonInput.value = lon;

        loadDemoData(lat, lon);
    });
});

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

        displayCurrentHumidity(data);
        displayHumidityForecast(data.forecast);
        displayHourlyHumidity(data.hourly);

        hideLoading();
    } catch (error) {
        console.error('Error fetching weather:', error);
        showError(error.message);
        hideLoading();
    }
}

/**
 * Display current humidity
 */
function displayCurrentHumidity(data) {
    const current = data.current;
    const location = data.location;

    if (!current) return;

    const locationText = location.city && location.state
        ? `${location.city}, ${location.state}`
        : `Lat: ${location.lat.toFixed(4)}, Lon: ${location.lon.toFixed(4)}`;

    // Get humidity value
    const humidity = current.relativeHumidity?.value || '--';
    document.getElementById('currentHumidityValue').textContent = humidity;

    // Set humidity level description
    const humidityLevel = getHumidityLevel(humidity);
    document.getElementById('humidityLevel').textContent = humidityLevel;

    // Dewpoint
    const dewpoint = current.dewpoint?.value;
    if (dewpoint) {
        const dewpointF = (dewpoint * 9/5) + 32;
        document.getElementById('dewpoint').textContent = `${Math.round(dewpointF)}°F`;
    } else {
        document.getElementById('dewpoint').textContent = 'N/A';
    }

    // Temperature
    document.getElementById('temperature').textContent = current.temperature ? `${current.temperature}°F` : 'N/A';

    document.getElementById('location').textContent = locationText;
    document.getElementById('condition').textContent = current.shortForecast || '--';

    const updateTime = current.startTime ? new Date(current.startTime).toLocaleString() : '--';
    document.getElementById('updateTime').textContent = `Updated: ${updateTime}`;

    document.getElementById('currentHumidity').classList.remove('hidden');
}

/**
 * Get humidity comfort level
 */
function getHumidityLevel(humidity) {
    if (humidity === '--' || isNaN(humidity)) return 'Unknown';

    if (humidity < 30) return 'Dry';
    if (humidity < 50) return 'Comfortable';
    if (humidity < 70) return 'Moderate';
    return 'High';
}

/**
 * Display humidity forecast
 */
function displayHumidityForecast(forecast) {
    if (!forecast || forecast.length === 0) return;

    const container = document.getElementById('humidityForecastGrid');
    container.innerHTML = '';

    forecast.slice(0, 7).forEach(period => {
        const card = document.createElement('div');
        card.className = 'forecast-card';

        const humidity = period.relativeHumidity?.value || 'N/A';

        card.innerHTML = `
            <h3>${period.name}</h3>
            <div class="forecast-temp">${humidity}${humidity !== 'N/A' ? '%' : ''}</div>
            <div class="forecast-condition">${period.shortForecast}</div>
            <div class="forecast-details">
                <div>
                    <strong>Temperature:</strong>
                    <span>${period.temperature}°${period.temperatureUnit}</span>
                </div>
                <div>
                    <strong>Comfort:</strong>
                    <span>${humidity !== 'N/A' ? getHumidityLevel(humidity) : 'Unknown'}</span>
                </div>
            </div>
        `;

        container.appendChild(card);
    });

    document.getElementById('humidityForecast').classList.remove('hidden');
}

/**
 * Display hourly humidity
 */
function displayHourlyHumidity(hourly) {
    if (!hourly || hourly.length === 0) return;

    const container = document.getElementById('hourlyHumidityScroll');
    container.innerHTML = '';

    hourly.forEach(hour => {
        const card = document.createElement('div');
        card.className = 'hourly-card';

        const time = new Date(hour.startTime);
        const hourStr = time.toLocaleTimeString('en-US', {
            hour: 'numeric',
            hour12: true
        });

        const humidity = hour.relativeHumidity?.value || 'N/A';

        card.innerHTML = `
            <div class="hour">${hourStr}</div>
            <div class="temp" style="color: #00acc1;">${humidity}${humidity !== 'N/A' ? '%' : ''}</div>
            <div class="condition">${humidity !== 'N/A' ? getHumidityLevel(humidity) : 'Unknown'}</div>
        `;

        container.appendChild(card);
    });

    document.getElementById('hourlyHumidity').classList.remove('hidden');
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
    document.getElementById('currentHumidity').classList.add('hidden');
    document.getElementById('humidityForecast').classList.add('hidden');
    document.getElementById('hourlyHumidity').classList.add('hidden');
}


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

        displayCurrentHumidity(data);
        displayHumidityForecast(data.forecast);
        displayHourlyHumidity(data.hourly);
    } else {
        // Fall back to API
        fetchWeather(lat, lon);
    }
}
