import { channelLink, Client, GatewayIntentBits } from 'discord.js';
import dotenv from 'dotenv';
import currentWeather from './commands/current-weather/currentWeather.js';
import getData from './commands/notification/getData.js'
import postData from './commands/notification/postData.js'
import deleteData from './commands/notification/deleteData.js'
import splitText from './commands/current-weather/splitText.js'
import {timeToString} from './commands/convertTime.js'
import moment from 'moment'
import clientPromise from './mongodb.js'
import fetchCurrentWeather from './commands/current-weather/fetchCurrentWeather.js';

console.log("---------- Program started ----------")

// Access to variables inside dotenv as environment variables
dotenv.config();

// Create a new client instance
const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
	],
});


// Run when client is initally ready
client.once('ready', () => {
	console.log('Ready!');
	client.user.setActivity('Testing...');

	var channel = client.channels.cache.find(channelID => channelID.id === process.env.DISCORD_CHANNEL_ID);

	let currentTime = timeToString(moment());

	setInterval(function () {
		let data;
		(async function databaseTime() {
			try {
				const client = await clientPromise;
				const mongo = client.db('discordUsers');
				const collection = mongo.collection('users');
				data = await collection.find({ timeOfNotification: currentTime }).toArray();

				for (let notification of data) {
					// Get weather info using openweathermap api
					let weatherInfo = await fetchCurrentWeather(notification.location);

					// Destructuringg weatherInfo
					let { weatherMain, weatherTemp, weatherWind, weatherCity, emoji } = weatherInfo;

					// Reply in discord with data
					channel.send(
						`<${notification.username}> Weather in ${weatherCity} is currently... \n${
							emoji + ' ' + weatherMain
						}\n🌡 ${weatherTemp} °C \n💨 ${weatherWind} mph.`);
2
				};
			} catch (err) {
				console.log(err);
			}
		})();
	}, 60000);

});

// Get current weather info
client.on('messageCreate', (message) => {
	if (message.content.startsWith('!weather')) {
		currentWeather(message);
	}
});

// Search database for data on the user
client.on('messageCreate', (message) => {
	(async function() {
		if (message.content.startsWith('!data')) {
			const userTag = `@${message.author.id}`;
			const userData = await getData(userTag)
			
			let replyString = '';
			userData.forEach((notification) => {
				replyString += `Location: **${notification.location.charAt(0).toUpperCase() + notification.location.slice(1)}**, `;
				replyString += `Notification Time: **${notification.timeOfNotification}** \n`;
			});
			message.reply(replyString)
		}
	})();
});

// Add notification to the database - !notify <location> <timeOfnotification> <repeatNotification>
client.on('messageCreate', (message) => {
	if (message.content.startsWith('!notify')) {
		const msg = message.content.toLowerCase();
		const data = splitText(msg);
		const location = data[0].toString()
		const timeOfNotification = data[1].toString()
		// Convert string to boolean
		const repeatNotification = (data[2] === 'true')
		const username = `@${message.author.id}`

		try{
			// Need to fix locations of > 1 word e.g. New York will not currently work
			postData(username, location, timeOfNotification, repeatNotification)
			message.reply("Notification added!")
		} catch (err) {
			console.log(err);
		}
	}
});

// Delete document from database - !delete <location> <timeOfNotification>
client.on('messageCreate', (message) => {
	if (message.content.startsWith('!delete')) {
		const msg = message.content.toLowerCase();
		const data = splitText(msg);
		const location = data[0].toString()
		const timeOfNotification = data[1].toString()
		// Convert string to boolean
		// const repeatNotification = (data[2] === 'true')
		const username = `@${message.author.id}`

		console.log(username, location, timeOfNotification)

		try{
			deleteData(username, location, timeOfNotification)
			message.reply("Notification deleted!")
		} catch (err) {
			console.log(err);
		}
	}
});

// Login to Discord with client token
client.login(process.env.DISCORD_TOKEN);
