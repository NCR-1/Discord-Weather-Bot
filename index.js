import { Client, GatewayIntentBits } from 'discord.js';
import dotenv from 'dotenv';
import currentWeather from './commands/current-weather/currentWeather.js';
import getData from './commands/notification/getData.js'
import postData from './commands/notification/postData.js'

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
});

// Get current weather info
client.on('messageCreate', (message) => {
	if (message.content.startsWith('!weather')) {
		currentWeather(message);
	}
});

// Login to Discord with client token
client.login(process.env.DISCORD_TOKEN);

getData();

