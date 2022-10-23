import fetchCurrentWeather from '../current-weather/fetchCurrentWeather.js';
import clientPromise from '../../mongodb.js';
import { timeToString, stringToTime } from '../convertTime.js';

let username;
let location;
let timeOfNotification;

async function getWeather(location) {
	try {
		const weatherInfo = await fetchCurrentWeather(location);
		const { weatherMain, weatherTemp, weatherWind, weatherCity, emoji } = weatherInfo;
		console.log(weatherMain);
		console.log(weatherTemp);
		console.log(weatherWind);
		console.log(weatherCity);
		console.log(emoji);
		return weatherInfo;
	} catch (err) {
		console.log(err);
	}
}

// Connect to the database and retrive all users
async function getData() {
	try {
		const client = await clientPromise;
		const mongo = client.db('discordUsers');
		const collection = mongo.collection('users');
		const data = await collection.findOne({ username: '@Slapnut#1337' });
		// const data = await collection.find({}).toArray();
		username = data.username;
		location = data.location;
		timeOfNotification = data.timeOfNotification;

		console.log(username, location, timeOfNotification);

		getWeather(location);
	} catch (err) {
		console.log(err);
	}
}

export default getData;
