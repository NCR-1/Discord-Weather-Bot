import { Client, GatewayIntentBits } from 'discord.js';
import dotenv from 'dotenv';
import splitText from './splitText.js';
import fetchCurrentWeather from './fetchCurrentWeather.js';

// Access to variables inside dotenv as environment variables
dotenv.config();

// Function to get current weather information for a single location
async function currentWeather(message) {
	try {
		const msg = message.content.toLowerCase();
		// Split input text to get location word only
		const location = splitText(msg).toString().replace(/,/g, ' ');

		// Get weather info using openweathermap api
		const weatherInfo = await fetchCurrentWeather(location);

		// Destructuringg weatherInfo
		const { weatherMain, weatherTemp, weatherWind, weatherCity, emoji } = weatherInfo;

		// Reply in discord with data
		message.reply(
			`Weather in ${weatherCity} is currently... \n${
				emoji + ' ' + weatherMain
			}\n🌡 ${weatherTemp} °C \n💨 ${weatherWind} mph.`
		);
	} catch (error) {
		console.log('Error:', error);
		message.reply('Error: command syntax is... \t !weather <location-name>');
	}
}

export default currentWeather;
