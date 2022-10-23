import dotenv from 'dotenv';
import fetch from 'node-fetch';

// Retrieve weather info for a location
async function fetchCurrentWeather(locationName) {
	try {
		const response = await fetch(
			`https://api.openweathermap.org/data/2.5/weather?q=${locationName}&units=metric&&APPID=${process.env.OPENWEATHER_TOKEN}`,
			{ mode: 'cors' }
		);

		const weatherData = await response.json();
		// Assign data from api call to variables
		const weatherID = weatherData.weather[0].id;
		const weatherCity = weatherData.name;
		const weatherTemp = parseInt(weatherData.main.temp);
		const weatherWind = weatherData.wind.speed;
		const weatherMainUncapitalized = weatherData.weather[0].description;
		const weatherMain =
			weatherMainUncapitalized.charAt(0).toUpperCase() + weatherMainUncapitalized.slice(1);
		const weatherCountry = weatherData.sys.country;
		const unixTimestamp = weatherData.dt;
		const unixTimezone = weatherData.timezone;

		let emoji;
		// Assign emoji based on weather id from api call
		switch (true) {
			case weatherID == 800:
				emoji = '☀';
				break;
			case weatherID < 300:
				emoji = '⛈';
				break;
			case weatherID < 400:
				emoji = '🌦';
				break;
			// No weather IDs for 500-600 in API
			case weatherID < 600:
				emoji = '🌧';
				break;
			case weatherID < 700:
				emoji = '❄';
				break;
			case weatherID < 800:
				emoji = '🌫';
				break;
			case weatherID < 900:
				emoji = '☁';
				break;
		}

		// Add weather variables to object so all can be returned
		const weatherFunctions = {
			weatherMain,
			weatherTemp,
			weatherWind,
			weatherCity,
			emoji,
		};

		return weatherFunctions;
	} catch (error) {
		console.log('Error:', error);
	}
}

export default fetchCurrentWeather;
