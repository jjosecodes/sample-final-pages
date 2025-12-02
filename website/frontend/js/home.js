/**
 * Home Page JavaScript
 * Handles alert checking for home page
 */

const API_BASE_URL = 'http://localhost:8000/api';

// DOM Elements
const weatherForm = document.getElementById('weatherForm');
const latInput = document.getElementById('latitude');
const lonInput = document.getElementById('longitude');
const loadingEl = document.getElementById('loading');
const errorEl = document.getElementById('error');
const alertsContainer = document.getElementById('alertsContainer');

// Quick location buttons
const quickButtons = document.querySelectorAll('.btn-quick');
quickButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const lat = btn.dataset.lat;
        const lon = btn.dataset.lon;
        latInput.value = lat;
        lonInput.value = lon;
        fetchAlerts(lat, lon);
    });
});

// Form submission
if (weatherForm) {
    weatherForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const lat = latInput.value;
        const lon = lonInput.value;
        await fetchAlerts(lat, lon);
    });
}

/**
 * Fetch weather alerts for location
 */
async function fetchAlerts(lat, lon) {
    showLoading();
    hideError();
    alertsContainer.innerHTML = '';

    try {
        const response = await fetch(`${API_BASE_URL}/weather?lat=${lat}&lon=${lon}`);

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || 'Failed to fetch weather data');
        }

        const data = await response.json();
        console.log('Weather data:', data);

        displayAlerts(data.alerts, data.location);
        hideLoading();
    } catch (error) {
        console.error('Error fetching alerts:', error);
        showError(error.message);
        hideLoading();
    }
}

/**
 * Display weather alerts
 */
function displayAlerts(alerts, location) {
    const locationText = location.city && location.state
        ? `${location.city}, ${location.state}`
        : `Lat: ${location.lat.toFixed(4)}, Lon: ${location.lon.toFixed(4)}`;

    if (!alerts || alerts.length === 0) {
        alertsContainer.innerHTML = `
            <div style="padding: 2rem; text-align: center; background: #e8f5e9; border-radius: 8px;">
                <h3 style="color: #388e3c; margin-bottom: 0.5rem;">✓ No Active Alerts</h3>
                <p style="color: #546e7a;">There are currently no weather alerts for ${locationText}</p>
            </div>
        `;
        return;
    }

    let html = `<h3 style="margin-bottom: 1rem; color: var(--text-dark);">${alerts.length} Active Alert(s) for ${locationText}</h3>`;

    alerts.forEach(alert => {
        const severity = (alert.severity || 'moderate').toLowerCase();
        const urgency = alert.urgency || 'Unknown';
        const event = alert.event || 'Weather Alert';
        const headline = alert.headline || alert.description || 'No details available';

        html += `
            <div class="alert-card ${severity}" style="margin-bottom: 1rem;">
                <h3>${event}</h3>
                <div class="alert-meta">
                    <strong>Severity:</strong> ${severity.toUpperCase()} |
                    <strong>Urgency:</strong> ${urgency}
                </div>
                <p><strong>${headline}</strong></p>
                ${alert.instruction ? `
                    <p style="margin-top: 0.5rem; padding-top: 0.5rem; border-top: 1px solid rgba(0,0,0,0.1);">
                        <strong>Instructions:</strong> ${alert.instruction}
                    </p>
                ` : ''}
            </div>
        `;
    });

    alertsContainer.innerHTML = html;
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
