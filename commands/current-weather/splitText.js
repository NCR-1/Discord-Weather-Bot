import DiscordJS from 'discord.js';
import { Client, GatewayIntentBits } from 'discord.js';

// Create a new client instance
const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
	],
});

// !weather <location>: splits at space, removes whitespace and removes the command to leave only the wanted text [.map() creates array, .filter() is an array function]
function splitText(msg) {
	const location = msg
		.split(' ')
		.map((element) => element.trim())
		.filter(
			(element) =>
				(element !== '') & (element !== '!weather')
		)
		.toString()
		.replace(/,/g, ' ');

	return location;
}

export default splitText;
