# Weather Dashboard - Team Project

A full-stack weather application using the **National Weather Service API** to display real-time weather data through specialized feature pages.

## Features

- 🌡️ **Temperature Page** - Track current temps, forecasts, and hourly trends
- 💨 **Wind Page** - Monitor wind speed, direction with compass visualization
- 💧 **Humidity Page** - Check humidity levels, dewpoint, and comfort index
- ⚠️ **Weather Alerts** - Severe weather warnings on home page
- 👥 **3 Team Member Pages** - Individual contribution pages with portfolio link placeholders
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile
- 🧭 **Easy Navigation** - Sticky nav bar across all pages

## Tech Stack

### Backend
- **Python 3.8+**
- **FastAPI** - Modern Python web framework
- **httpx** - Async HTTP client
- **Uvicorn** - ASGI server

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Modern responsive styling (Grid, Flexbox)
- **Vanilla JavaScript** - No frameworks, pure JS
- **NWS API** - National Weather Service public API (no key required!)

## Project Structure

```
website/
├── backend/
│   ├── app.py              # FastAPI server with weather endpoints
│   └── requirements.txt    # Python dependencies
├── frontend/
│   ├── index.html          # Home page with navigation to feature pages
│   ├── temperature.html    # Temperature tracking page
│   ├── wind.html           # Wind tracking page
│   ├── humidity.html       # Humidity tracking page
│   ├── members/            # Individual member pages (3 members)
│   │   ├── member1.html    # Temperature page developer
│   │   ├── member2.html    # Wind page developer
│   │   └── member3.html    # Humidity page developer
│   ├── css/
│   │   ├── main.css        # Main styles with nav and feature pages
│   │   └── member.css      # Member page styles
│   └── js/
│       ├── home.js         # Home page (alerts)
│       ├── temperature.js  # Temperature page logic
│       ├── wind.js         # Wind page logic
│       ├── humidity.js     # Humidity page logic
│       └── member.js       # Member page scripts
└── README.md
```

## Setup Instructions

### 1. Install Python Dependencies

```bash
cd backend
pip install -r requirements.txt
```

Or use a virtual environment (recommended):

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### 2. Run the Backend Server

```bash
cd backend
python app.py
```

Or with uvicorn directly:

```bash
uvicorn app:app --reload --host 0.0.0.0 --port 8000
```

The backend will start at: **http://localhost:8000**

### 3. Open the Frontend

The frontend is automatically served by the backend. Open your browser and go to:

**http://localhost:8000**

Then navigate through the pages:
- **Home**: `http://localhost:8000` - Quick weather alerts
- **Temperature**: `http://localhost:8000/static/temperature.html`
- **Wind**: `http://localhost:8000/static/wind.html`
- **Humidity**: `http://localhost:8000/static/humidity.html`
- **Member Pages**: `http://localhost:8000/static/members/member1.html` (and member2, member3)

## API Endpoints

### `GET /api/weather`

Fetch weather data for given coordinates.

**Query Parameters:**
- `lat` (float) - Latitude (-90 to 90)
- `lon` (float) - Longitude (-180 to 180)

**Example:**
```bash
curl "http://localhost:8000/api/weather?lat=38.8894&lon=-77.0352"
```

**Response:**
```json
{
  "success": true,
  "location": {
    "lat": 38.8894,
    "lon": -77.0352,
    "city": "Washington",
    "state": "DC"
  },
  "current": {
    "temperature": 72,
    "temperatureUnit": "F",
    "shortForecast": "Partly Cloudy",
    "windSpeed": "5 mph",
    "windDirection": "SW"
  },
  "forecast": [...],
  "hourly": [...],
  "alerts": [...]
}
```

### `GET /api/alerts`

Fetch active weather alerts for given coordinates.

**Query Parameters:**
- `lat` (float) - Latitude
- `lon` (float) - Longitude

## Usage

### Navigation

The website has a **sticky navigation bar** at the top of every page:
- **Home** - Quick weather alerts checker
- **Temperature** - Dedicated temperature tracking
- **Wind** - Wind speed and direction with compass
- **Humidity** - Humidity levels and dewpoint

### How to Use Each Page

1. **Home Page** - Enter coordinates to check for active weather alerts
2. **Temperature Page** - View current temperature, 7-day forecast, and hourly trends
3. **Wind Page** - See wind conditions with interactive compass showing direction
4. **Humidity Page** - Check humidity levels, dewpoint, and comfort ratings
5. **Team Pages** - Click team member cards to see individual contribution pages

Each feature page has:
- Coordinate input form
- **Quick location buttons with hardcoded demo data** (instant display, no API call needed!)
  - Washington DC
  - New York
  - Los Angeles
  - Chicago
- Current conditions display
- 7-day forecast
- 24-hour hourly forecast

### Quick Demo Data

For demonstration purposes, all three weather pages include **hardcoded weather data** for the four quick locations. This means:

✅ **Instant Display** - Click any quick location button for immediate results
✅ **No Backend Required** - Demo data works even if the backend is not running
✅ **Perfect for Demos** - Great for presentations and testing the UI
✅ **Realistic Data** - Based on typical weather patterns for each city

The demo data is stored in [js/demo-data.js](frontend/js/demo-data.js) and includes:
- Current conditions (temperature, wind, humidity)
- 7-day forecast periods
- 8-hour hourly forecasts
- All weather metrics for each city

**Note:** Custom coordinates entered in the form will still call the live NWS API through the backend.

## Customization Guide

### Adding Your Information

#### Update Member Pages

Edit the files in `frontend/members/`:

1. **Personal Info** - Update name, role, and bio
2. **Contributions** - List your specific contributions
3. **Skills** - Add your technologies and skills
4. **Portfolio Link** - Uncomment and add your portfolio URL:
   ```html
   <a href="YOUR_PORTFOLIO_URL" class="btn-portfolio" target="_blank">View My Portfolio →</a>
   ```
5. **Social Links** - Add GitHub, LinkedIn, email links
6. **Favorite Location** - Change the coordinates in the weather widget button

#### Update Home Page

Edit `frontend/index.html`:

1. **Team Member Names** - Update member names in the team section (3 members)
2. **Roles** - Each member corresponds to a weather page:
   - Member 1: Temperature Page Developer
   - Member 2: Wind Page Developer
   - Member 3: Humidity Page Developer
3. **Avatar Initials** - Change `M1`, `M2`, `M3` to actual initials

#### Update Your Weather Page

Each member should customize their assigned page:
- **Member 1**: Edit `frontend/temperature.html` and `js/temperature.js`
- **Member 2**: Edit `frontend/wind.html` and `js/wind.js`
- **Member 3**: Edit `frontend/humidity.html` and `js/humidity.js`

### Styling

All styles are in `frontend/css/`:
- `main.css` - Main dashboard styles
- `member.css` - Member page specific styles

Color scheme can be changed in CSS variables at the top of `main.css`:

```css
:root {
    --primary-blue: #2196F3;
    --primary-dark: #1976D2;
    --secondary-orange: #FF9800;
    /* ... */
}
```

## Important Notes

### NWS API Limitations

- **US Only** - The National Weather Service API only covers United States locations
- **No API Key Required** - Completely free, no registration needed
- **User-Agent Required** - The API requires a User-Agent header (already configured)
- **Rate Limits** - Reasonable use expected, no hard limits documented

### CORS Configuration

The backend has CORS enabled for all origins (`*`). For production, update this in `backend/app.py`:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://yourdomain.com"],  # Specify your domain
    # ...
)
```

## Deployment

### Backend Deployment

For production deployment:

1. **Update User-Agent** in `backend/app.py`:
   ```python
   HEADERS = {
       "User-Agent": "(Your App Name, your-email@example.com)",
   }
   ```

2. **Deploy to a hosting service**:
   - Heroku
   - Railway
   - DigitalOcean
   - AWS EC2/Elastic Beanstalk

3. **Update Frontend API URL** in `frontend/js/weather.js` and `frontend/js/member.js`:
   ```javascript
   const API_BASE_URL = 'https://your-backend-url.com/api';
   ```

### Frontend Deployment

The frontend is static files, so you can:
- Host on the same server as the backend
- Deploy to Netlify/Vercel (update API_BASE_URL)
- Use GitHub Pages (update API_BASE_URL)

## Development

### Adding New Features

1. **New Backend Endpoint** - Add to `backend/app.py`
2. **New Frontend Function** - Add to `frontend/js/weather.js`
3. **New Page** - Create HTML in `frontend/` and link it
4. **New Styles** - Add to appropriate CSS file

### Testing

Test with different locations:
- **Washington DC**: 38.8894, -77.0352
- **New York**: 40.7128, -74.0060
- **Los Angeles**: 34.0522, -118.2437
- **Chicago**: 41.8781, -87.6298

## Troubleshooting

### Backend Won't Start
- Check Python version: `python --version` (need 3.8+)
- Install dependencies: `pip install -r requirements.txt`
- Check port 8000 isn't in use

### Frontend Can't Connect
- Verify backend is running at http://localhost:8000
- Check browser console for errors
- Ensure CORS is enabled in backend

### No Weather Data
- Verify coordinates are within the United States
- Check NWS API status: https://api.weather.gov
- Look for errors in backend logs

### Alerts Not Showing
- Alerts only appear when active for the location
- Not all locations have active alerts
- Check backend response for alert data

## Contributing

This is a team project. Each member should:
1. Update their member page with personal info
2. Add portfolio links when available
3. Customize their favorite location widget
4. Document their contributions

## Resources

- [NWS API Documentation](https://www.weather.gov/documentation/services-web-api)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [OpenAPI Spec](https://api.weather.gov/openapi.json)

## License

This project is for educational purposes.

Weather data provided by the [National Weather Service](https://www.weather.gov/).

---

**Built with ❤️ by our team**

<!-- TODO: Add team member links when portfolios are ready -->
