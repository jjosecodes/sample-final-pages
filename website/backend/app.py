"""
FastAPI Weather Backend
Uses National Weather Service API to fetch real weather data
"""

from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
import httpx
import os

app = FastAPI(title="Weather API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

HEADERS = {
    "User-Agent": "(Weather Website, contact@example.com)",
    "Accept": "application/geo+json"
}

@app.get("/")
async def root():
    """Serve the main frontend page"""
    return FileResponse("../frontend/index.html")


@app.get("/api/weather")
async def get_weather(
    lat: float = Query(..., description="Latitude", ge=-90, le=90),
    lon: float = Query(..., description="Longitude", ge=-180, le=180)
):
    """
    Fetch weather data for given coordinates

    Process:
    1. Call /points endpoint to get grid data
    2. Extract forecast URLs
    3. Fetch forecast data
    4. Return formatted response
    """

    async with httpx.AsyncClient(timeout=10.0) as client:
        try:
            # Step 1: Get grid point data
            points_url = f"https://api.weather.gov/points/{lat},{lon}"
            points_response = await client.get(points_url, headers=HEADERS)

            if points_response.status_code == 404:
                raise HTTPException(
                    status_code=404,
                    detail="Location not supported. NWS API only covers US locations."
                )

            points_response.raise_for_status()
            points_data = points_response.json()

            # Step 2: Extract important URLs and metadata
            properties = points_data.get("properties", {})
            forecast_url = properties.get("forecast")
            forecast_hourly_url = properties.get("forecastHourly")
            forecast_office = properties.get("forecastOffice")
            grid_id = properties.get("gridId")
            grid_x = properties.get("gridX")
            grid_y = properties.get("gridY")

            if not forecast_url:
                raise HTTPException(status_code=500, detail="Could not get forecast URL from NWS")

            # Step 3: Fetch forecast data
            forecast_response = await client.get(forecast_url, headers=HEADERS)
            forecast_response.raise_for_status()
            forecast_data = forecast_response.json()

            # Step 4: Fetch hourly forecast
            hourly_data = None
            if forecast_hourly_url:
                try:
                    hourly_response = await client.get(forecast_hourly_url, headers=HEADERS)
                    hourly_response.raise_for_status()
                    hourly_data = hourly_response.json()
                except:
                    pass  # Hourly is optional

            # Step 5: Fetch active alerts for the zone
            alerts = []
            try:
                # Get the forecast zone from points data
                forecast_zone = properties.get("forecastZone")
                if forecast_zone:
                    # Extract zone ID from the URL
                    zone_id = forecast_zone.split("/")[-1]
                    alerts_url = f"https://api.weather.gov/alerts/active/zone/{zone_id}"
                    alerts_response = await client.get(alerts_url, headers=HEADERS)
                    alerts_response.raise_for_status()
                    alerts_data = alerts_response.json()

                    # Extract alert information
                    features = alerts_data.get("features", [])
                    for feature in features[:5]:  # Limit to 5 alerts
                        alert_props = feature.get("properties", {})
                        alerts.append({
                            "event": alert_props.get("event"),
                            "headline": alert_props.get("headline"),
                            "severity": alert_props.get("severity"),
                            "urgency": alert_props.get("urgency"),
                            "description": alert_props.get("description"),
                            "instruction": alert_props.get("instruction"),
                        })
            except:
                pass  # Alerts are optional

            # Step 6: Format response
            periods = forecast_data.get("properties", {}).get("periods", [])
            hourly_periods = []
            if hourly_data:
                hourly_periods = hourly_data.get("properties", {}).get("periods", [])[:24]  # Next 24 hours

            return {
                "success": True,
                "location": {
                    "lat": lat,
                    "lon": lon,
                    "city": properties.get("relativeLocation", {}).get("properties", {}).get("city"),
                    "state": properties.get("relativeLocation", {}).get("properties", {}).get("state"),
                    "gridId": grid_id,
                },
                "current": periods[0] if periods else None,
                "forecast": periods[:14],  # 7 days (day + night)
                "hourly": hourly_periods,
                "alerts": alerts,
                "updated": forecast_data.get("properties", {}).get("updateTime"),
            }

        except httpx.HTTPStatusError as e:
            raise HTTPException(status_code=e.response.status_code, detail=str(e))
        except httpx.RequestError as e:
            raise HTTPException(status_code=503, detail=f"Error connecting to NWS API: {str(e)}")
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")


@app.get("/api/alerts")
async def get_alerts(
    lat: float = Query(..., description="Latitude", ge=-90, le=90),
    lon: float = Query(..., description="Longitude", ge=-180, le=180)
):
    """
    Fetch active weather alerts for given coordinates
    """
    async with httpx.AsyncClient(timeout=10.0) as client:
        try:
            # Get point data to find the zone
            points_url = f"https://api.weather.gov/points/{lat},{lon}"
            points_response = await client.get(points_url, headers=HEADERS)
            points_response.raise_for_status()
            points_data = points_response.json()

            forecast_zone = points_data.get("properties", {}).get("forecastZone")
            if not forecast_zone:
                return {"alerts": []}

            zone_id = forecast_zone.split("/")[-1]
            alerts_url = f"https://api.weather.gov/alerts/active/zone/{zone_id}"

            alerts_response = await client.get(alerts_url, headers=HEADERS)
            alerts_response.raise_for_status()
            alerts_data = alerts_response.json()

            features = alerts_data.get("features", [])
            alerts = []

            for feature in features:
                alert_props = feature.get("properties", {})
                alerts.append({
                    "event": alert_props.get("event"),
                    "headline": alert_props.get("headline"),
                    "severity": alert_props.get("severity"),
                    "urgency": alert_props.get("urgency"),
                    "certainty": alert_props.get("certainty"),
                    "description": alert_props.get("description"),
                    "instruction": alert_props.get("instruction"),
                    "onset": alert_props.get("onset"),
                    "expires": alert_props.get("expires"),
                })

            return {
                "success": True,
                "count": len(alerts),
                "alerts": alerts
            }

        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))


# Mount static files (frontend)
app.mount("/static", StaticFiles(directory="../frontend"), name="static")


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)
