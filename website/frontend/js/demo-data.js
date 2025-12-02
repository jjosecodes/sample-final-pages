/**
 * Demo Weather Data
 * Hardcoded weather data for quick locations
 * Based on typical weather patterns for each city
 */

const DEMO_WEATHER_DATA = {
    // Washington DC: 38.8894, -77.0352
    "washington": {
        location: {
            lat: 38.8894,
            lon: -77.0352,
            city: "Washington",
            state: "DC"
        },
        current: {
            temperature: 42,
            temperatureUnit: "F",
            shortForecast: "Partly Cloudy",
            windSpeed: "8 mph",
            windDirection: "NW",
            relativeHumidity: { value: 65 },
            dewpoint: { value: 5 } // Celsius
        },
        forecast: [
            {
                name: "This Afternoon",
                temperature: 42,
                temperatureUnit: "F",
                windSpeed: "8 mph",
                windDirection: "NW",
                shortForecast: "Partly Cloudy",
                relativeHumidity: { value: 65 }
            },
            {
                name: "Tonight",
                temperature: 32,
                temperatureUnit: "F",
                windSpeed: "5 mph",
                windDirection: "N",
                shortForecast: "Mostly Clear",
                relativeHumidity: { value: 72 }
            },
            {
                name: "Tuesday",
                temperature: 45,
                temperatureUnit: "F",
                windSpeed: "7 mph",
                windDirection: "NE",
                shortForecast: "Sunny",
                relativeHumidity: { value: 58 }
            },
            {
                name: "Tuesday Night",
                temperature: 35,
                temperatureUnit: "F",
                windSpeed: "6 mph",
                windDirection: "E",
                shortForecast: "Clear",
                relativeHumidity: { value: 68 }
            },
            {
                name: "Wednesday",
                temperature: 48,
                temperatureUnit: "F",
                windSpeed: "9 mph",
                windDirection: "SE",
                shortForecast: "Partly Sunny",
                relativeHumidity: { value: 62 }
            },
            {
                name: "Wednesday Night",
                temperature: 38,
                temperatureUnit: "F",
                windSpeed: "7 mph",
                windDirection: "S",
                shortForecast: "Mostly Cloudy",
                relativeHumidity: { value: 70 }
            },
            {
                name: "Thursday",
                temperature: 52,
                temperatureUnit: "F",
                windSpeed: "10 mph",
                windDirection: "SW",
                shortForecast: "Cloudy",
                relativeHumidity: { value: 75 }
            }
        ],
        hourly: [
            { startTime: "2025-12-01T14:00:00-05:00", temperature: 42, temperatureUnit: "F", windSpeed: "8 mph", windDirection: "NW", shortForecast: "Partly Cloudy", relativeHumidity: { value: 65 } },
            { startTime: "2025-12-01T15:00:00-05:00", temperature: 41, temperatureUnit: "F", windSpeed: "7 mph", windDirection: "NW", shortForecast: "Partly Cloudy", relativeHumidity: { value: 66 } },
            { startTime: "2025-12-01T16:00:00-05:00", temperature: 40, temperatureUnit: "F", windSpeed: "6 mph", windDirection: "N", shortForecast: "Mostly Cloudy", relativeHumidity: { value: 68 } },
            { startTime: "2025-12-01T17:00:00-05:00", temperature: 38, temperatureUnit: "F", windSpeed: "5 mph", windDirection: "N", shortForecast: "Mostly Cloudy", relativeHumidity: { value: 70 } },
            { startTime: "2025-12-01T18:00:00-05:00", temperature: 36, temperatureUnit: "F", windSpeed: "5 mph", windDirection: "N", shortForecast: "Partly Cloudy", relativeHumidity: { value: 71 } },
            { startTime: "2025-12-01T19:00:00-05:00", temperature: 35, temperatureUnit: "F", windSpeed: "4 mph", windDirection: "NE", shortForecast: "Clear", relativeHumidity: { value: 72 } },
            { startTime: "2025-12-01T20:00:00-05:00", temperature: 34, temperatureUnit: "F", windSpeed: "4 mph", windDirection: "NE", shortForecast: "Clear", relativeHumidity: { value: 73 } },
            { startTime: "2025-12-01T21:00:00-05:00", temperature: 33, temperatureUnit: "F", windSpeed: "3 mph", windDirection: "NE", shortForecast: "Clear", relativeHumidity: { value: 74 } }
        ],
        alerts: []
    },

    // New York: 40.7128, -74.0060
    "newyork": {
        location: {
            lat: 40.7128,
            lon: -74.0060,
            city: "New York",
            state: "NY"
        },
        current: {
            temperature: 38,
            temperatureUnit: "F",
            shortForecast: "Mostly Sunny",
            windSpeed: "12 mph",
            windDirection: "W",
            relativeHumidity: { value: 58 },
            dewpoint: { value: 2 }
        },
        forecast: [
            {
                name: "This Afternoon",
                temperature: 38,
                temperatureUnit: "F",
                windSpeed: "12 mph",
                windDirection: "W",
                shortForecast: "Mostly Sunny",
                relativeHumidity: { value: 58 }
            },
            {
                name: "Tonight",
                temperature: 28,
                temperatureUnit: "F",
                windSpeed: "10 mph",
                windDirection: "NW",
                shortForecast: "Clear",
                relativeHumidity: { value: 65 }
            },
            {
                name: "Tuesday",
                temperature: 42,
                temperatureUnit: "F",
                windSpeed: "8 mph",
                windDirection: "N",
                shortForecast: "Sunny",
                relativeHumidity: { value: 52 }
            },
            {
                name: "Tuesday Night",
                temperature: 32,
                temperatureUnit: "F",
                windSpeed: "7 mph",
                windDirection: "NE",
                shortForecast: "Clear",
                relativeHumidity: { value: 62 }
            },
            {
                name: "Wednesday",
                temperature: 45,
                temperatureUnit: "F",
                windSpeed: "11 mph",
                windDirection: "E",
                shortForecast: "Partly Sunny",
                relativeHumidity: { value: 60 }
            },
            {
                name: "Wednesday Night",
                temperature: 35,
                temperatureUnit: "F",
                windSpeed: "9 mph",
                windDirection: "SE",
                shortForecast: "Mostly Cloudy",
                relativeHumidity: { value: 68 }
            },
            {
                name: "Thursday",
                temperature: 48,
                temperatureUnit: "F",
                windSpeed: "13 mph",
                windDirection: "S",
                shortForecast: "Cloudy",
                relativeHumidity: { value: 72 }
            }
        ],
        hourly: [
            { startTime: "2025-12-01T14:00:00-05:00", temperature: 38, temperatureUnit: "F", windSpeed: "12 mph", windDirection: "W", shortForecast: "Mostly Sunny", relativeHumidity: { value: 58 } },
            { startTime: "2025-12-01T15:00:00-05:00", temperature: 37, temperatureUnit: "F", windSpeed: "11 mph", windDirection: "W", shortForecast: "Mostly Sunny", relativeHumidity: { value: 59 } },
            { startTime: "2025-12-01T16:00:00-05:00", temperature: 35, temperatureUnit: "F", windSpeed: "10 mph", windDirection: "NW", shortForecast: "Partly Cloudy", relativeHumidity: { value: 61 } },
            { startTime: "2025-12-01T17:00:00-05:00", temperature: 33, temperatureUnit: "F", windSpeed: "10 mph", windDirection: "NW", shortForecast: "Partly Cloudy", relativeHumidity: { value: 63 } },
            { startTime: "2025-12-01T18:00:00-05:00", temperature: 31, temperatureUnit: "F", windSpeed: "9 mph", windDirection: "NW", shortForecast: "Clear", relativeHumidity: { value: 64 } },
            { startTime: "2025-12-01T19:00:00-05:00", temperature: 30, temperatureUnit: "F", windSpeed: "9 mph", windDirection: "NW", shortForecast: "Clear", relativeHumidity: { value: 65 } },
            { startTime: "2025-12-01T20:00:00-05:00", temperature: 29, temperatureUnit: "F", windSpeed: "8 mph", windDirection: "NW", shortForecast: "Clear", relativeHumidity: { value: 66 } },
            { startTime: "2025-12-01T21:00:00-05:00", temperature: 28, temperatureUnit: "F", windSpeed: "8 mph", windDirection: "NW", shortForecast: "Clear", relativeHumidity: { value: 67 } }
        ],
        alerts: []
    },

    // Los Angeles: 34.0522, -118.2437
    "losangeles": {
        location: {
            lat: 34.0522,
            lon: -118.2437,
            city: "Los Angeles",
            state: "CA"
        },
        current: {
            temperature: 68,
            temperatureUnit: "F",
            shortForecast: "Sunny",
            windSpeed: "5 mph",
            windDirection: "SW",
            relativeHumidity: { value: 45 },
            dewpoint: { value: 12 }
        },
        forecast: [
            {
                name: "This Afternoon",
                temperature: 68,
                temperatureUnit: "F",
                windSpeed: "5 mph",
                windDirection: "SW",
                shortForecast: "Sunny",
                relativeHumidity: { value: 45 }
            },
            {
                name: "Tonight",
                temperature: 52,
                temperatureUnit: "F",
                windSpeed: "3 mph",
                windDirection: "W",
                shortForecast: "Clear",
                relativeHumidity: { value: 55 }
            },
            {
                name: "Tuesday",
                temperature: 72,
                temperatureUnit: "F",
                windSpeed: "6 mph",
                windDirection: "W",
                shortForecast: "Sunny",
                relativeHumidity: { value: 42 }
            },
            {
                name: "Tuesday Night",
                temperature: 54,
                temperatureUnit: "F",
                windSpeed: "4 mph",
                windDirection: "SW",
                shortForecast: "Clear",
                relativeHumidity: { value: 52 }
            },
            {
                name: "Wednesday",
                temperature: 74,
                temperatureUnit: "F",
                windSpeed: "7 mph",
                windDirection: "SW",
                shortForecast: "Mostly Sunny",
                relativeHumidity: { value: 40 }
            },
            {
                name: "Wednesday Night",
                temperature: 56,
                temperatureUnit: "F",
                windSpeed: "5 mph",
                windDirection: "W",
                shortForecast: "Partly Cloudy",
                relativeHumidity: { value: 50 }
            },
            {
                name: "Thursday",
                temperature: 70,
                temperatureUnit: "F",
                windSpeed: "8 mph",
                windDirection: "W",
                shortForecast: "Partly Sunny",
                relativeHumidity: { value: 48 }
            }
        ],
        hourly: [
            { startTime: "2025-12-01T11:00:00-08:00", temperature: 68, temperatureUnit: "F", windSpeed: "5 mph", windDirection: "SW", shortForecast: "Sunny", relativeHumidity: { value: 45 } },
            { startTime: "2025-12-01T12:00:00-08:00", temperature: 69, temperatureUnit: "F", windSpeed: "6 mph", windDirection: "SW", shortForecast: "Sunny", relativeHumidity: { value: 44 } },
            { startTime: "2025-12-01T13:00:00-08:00", temperature: 68, temperatureUnit: "F", windSpeed: "6 mph", windDirection: "SW", shortForecast: "Sunny", relativeHumidity: { value: 45 } },
            { startTime: "2025-12-01T14:00:00-08:00", temperature: 67, temperatureUnit: "F", windSpeed: "5 mph", windDirection: "W", shortForecast: "Sunny", relativeHumidity: { value: 46 } },
            { startTime: "2025-12-01T15:00:00-08:00", temperature: 65, temperatureUnit: "F", windSpeed: "4 mph", windDirection: "W", shortForecast: "Sunny", relativeHumidity: { value: 48 } },
            { startTime: "2025-12-01T16:00:00-08:00", temperature: 63, temperatureUnit: "F", windSpeed: "4 mph", windDirection: "W", shortForecast: "Clear", relativeHumidity: { value: 50 } },
            { startTime: "2025-12-01T17:00:00-08:00", temperature: 60, temperatureUnit: "F", windSpeed: "3 mph", windDirection: "W", shortForecast: "Clear", relativeHumidity: { value: 52 } },
            { startTime: "2025-12-01T18:00:00-08:00", temperature: 57, temperatureUnit: "F", windSpeed: "3 mph", windDirection: "W", shortForecast: "Clear", relativeHumidity: { value: 54 } }
        ],
        alerts: []
    },

    // Chicago: 41.8781, -87.6298
    "chicago": {
        location: {
            lat: 41.8781,
            lon: -87.6298,
            city: "Chicago",
            state: "IL"
        },
        current: {
            temperature: 35,
            temperatureUnit: "F",
            shortForecast: "Cloudy",
            windSpeed: "15 mph",
            windDirection: "NW",
            relativeHumidity: { value: 70 },
            dewpoint: { value: 3 }
        },
        forecast: [
            {
                name: "This Afternoon",
                temperature: 35,
                temperatureUnit: "F",
                windSpeed: "15 mph",
                windDirection: "NW",
                shortForecast: "Cloudy",
                relativeHumidity: { value: 70 }
            },
            {
                name: "Tonight",
                temperature: 25,
                temperatureUnit: "F",
                windSpeed: "12 mph",
                windDirection: "N",
                shortForecast: "Partly Cloudy",
                relativeHumidity: { value: 75 }
            },
            {
                name: "Tuesday",
                temperature: 38,
                temperatureUnit: "F",
                windSpeed: "10 mph",
                windDirection: "NE",
                shortForecast: "Mostly Sunny",
                relativeHumidity: { value: 65 }
            },
            {
                name: "Tuesday Night",
                temperature: 28,
                temperatureUnit: "F",
                windSpeed: "8 mph",
                windDirection: "E",
                shortForecast: "Clear",
                relativeHumidity: { value: 72 }
            },
            {
                name: "Wednesday",
                temperature: 42,
                temperatureUnit: "F",
                windSpeed: "11 mph",
                windDirection: "SE",
                shortForecast: "Partly Sunny",
                relativeHumidity: { value: 68 }
            },
            {
                name: "Wednesday Night",
                temperature: 32,
                temperatureUnit: "F",
                windSpeed: "9 mph",
                windDirection: "S",
                shortForecast: "Mostly Cloudy",
                relativeHumidity: { value: 78 }
            },
            {
                name: "Thursday",
                temperature: 45,
                temperatureUnit: "F",
                windSpeed: "14 mph",
                windDirection: "SW",
                shortForecast: "Cloudy",
                relativeHumidity: { value: 80 }
            }
        ],
        hourly: [
            { startTime: "2025-12-01T13:00:00-06:00", temperature: 35, temperatureUnit: "F", windSpeed: "15 mph", windDirection: "NW", shortForecast: "Cloudy", relativeHumidity: { value: 70 } },
            { startTime: "2025-12-01T14:00:00-06:00", temperature: 34, temperatureUnit: "F", windSpeed: "14 mph", windDirection: "NW", shortForecast: "Cloudy", relativeHumidity: { value: 71 } },
            { startTime: "2025-12-01T15:00:00-06:00", temperature: 32, temperatureUnit: "F", windSpeed: "13 mph", windDirection: "N", shortForecast: "Partly Cloudy", relativeHumidity: { value: 72 } },
            { startTime: "2025-12-01T16:00:00-06:00", temperature: 30, temperatureUnit: "F", windSpeed: "12 mph", windDirection: "N", shortForecast: "Partly Cloudy", relativeHumidity: { value: 73 } },
            { startTime: "2025-12-01T17:00:00-06:00", temperature: 28, temperatureUnit: "F", windSpeed: "12 mph", windDirection: "N", shortForecast: "Partly Cloudy", relativeHumidity: { value: 74 } },
            { startTime: "2025-12-01T18:00:00-06:00", temperature: 27, temperatureUnit: "F", windSpeed: "11 mph", windDirection: "N", shortForecast: "Partly Cloudy", relativeHumidity: { value: 75 } },
            { startTime: "2025-12-01T19:00:00-06:00", temperature: 26, temperatureUnit: "F", windSpeed: "11 mph", windDirection: "N", shortForecast: "Mostly Clear", relativeHumidity: { value: 76 } },
            { startTime: "2025-12-01T20:00:00-06:00", temperature: 25, temperatureUnit: "F", windSpeed: "10 mph", windDirection: "N", shortForecast: "Mostly Clear", relativeHumidity: { value: 76 } }
        ],
        alerts: []
    }
};
