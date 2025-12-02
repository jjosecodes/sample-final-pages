/**
 * Member Page JavaScript
 * Handles weather widget on individual member pages
 */

// Configuration
const API_BASE_URL = 'http://localhost:8000/api';

/**
 * Load weather for a specific member's favorite location
 */
async function loadMemberWeather(lat, lon) {
    const container = document.getElementById('memberWeather');

    // Show loading state
    container.innerHTML = '<div class="loading"><div class="spinner"></div><p>Loading weather...</p></div>';

    try {
        const response = await fetch(`${API_BASE_URL}/weather?lat=${lat}&lon=${lon}`);

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || 'Failed to fetch weather data');
        }

        const data = await response.json();
        console.log('Member weather data:', data);

        // Display compact weather widget
        displayMemberWeather(data, container);

    } catch (error) {
        console.error('Error fetching weather:', error);
        container.innerHTML = `
            <div class="error-message">
                Failed to load weather: ${error.message}
            </div>
        `;
    }
}

/**
 * Display weather in a compact widget format
 */
function displayMemberWeather(data, container) {
    const current = data.current;
    const location = data.location;
    const forecast = data.forecast;

    if (!current) {
        container.innerHTML = '<p>No weather data available.</p>';
        return;
    }

    const locationText = location.city && location.state
        ? `${location.city}, ${location.state}`
        : `Lat: ${location.lat.toFixed(4)}, Lon: ${location.lon.toFixed(4)}`;

    // Create compact current weather card
    let html = `
        <div class="current-card">
            <div class="current-main">
                <div class="current-temp">
                    <span class="temp-large">${current.temperature || '--'}</span>
                    <span class="temp-unit">°F</span>
                </div>
                <div class="current-details">
                    <h3>${locationText}</h3>
                    <p class="condition">${current.shortForecast || '--'}</p>
                </div>
            </div>
            <div class="current-extra">
                <div class="detail-item">
                    <span class="detail-label">Wind:</span>
                    <span>${current.windSpeed || 'N/A'} ${current.windDirection || ''}</span>
                </div>
                ${current.relativeHumidity?.value ? `
                <div class="detail-item">
                    <span class="detail-label">Humidity:</span>
                    <span>${current.relativeHumidity.value}%</span>
                </div>
                ` : ''}
            </div>
        </div>
    `;

    // Add mini forecast (next 3 periods)
    if (forecast && forecast.length > 0) {
        html += '<div class="forecast-grid" style="margin-top: 1.5rem;">';

        forecast.slice(0, 3).forEach(period => {
            html += `
                <div class="forecast-card">
                    <h3 style="font-size: 1rem;">${period.name}</h3>
                    <div class="forecast-temp" style="font-size: 1.5rem;">${period.temperature}°${period.temperatureUnit}</div>
                    <div class="forecast-condition">${period.shortForecast}</div>
                </div>
            `;
        });

        html += '</div>';
    }

    // Add alerts if any
    if (data.alerts && data.alerts.length > 0) {
        html += '<div style="margin-top: 1rem; padding: 1rem; background: #fff3e0; border-left: 4px solid #f57c00; border-radius: 8px;">';
        html += `<strong>⚠️ ${data.alerts.length} Active Alert(s)</strong><br>`;
        html += `<span style="font-size: 0.9rem;">${data.alerts[0].event}</span>`;
        html += '</div>';
    }

    container.innerHTML = html;
}

/**
 * Optional: Auto-load weather on page load
 * Uncomment and customize as needed
 */
// window.addEventListener('DOMContentLoaded', () => {
//     // Example: Auto-load weather for a specific location
//     // loadMemberWeather(38.8894, -77.0352);
// });
