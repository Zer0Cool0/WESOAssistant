/* This bot was developed by Zer0Cool0 © 2022*/

require("dotenv").config();
const fs = require("fs");
const Database = require('./config/Database');
const db = new Database();

db.connect();

const { Client, Intents, Collection } = require("discord.js");

const client = new Client({
	intents: [
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_MESSAGES,
		Intents.FLAGS.GUILD_MEMBERS,
		Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
		Intents.FLAGS.GUILD_PRESENCES,
	]
});

module.exports = client

const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));
const commands = [];
client.commands = new Collection();

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
	client.commands.set(command.data.name, command);
}

const eventFiles = fs.readdirSync("./events").filter(file => file.endsWith(".js"));
client.events = new Collection();

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	client.events.set(event.name, event);

	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args, commands));
	} else {
		client.on(event.name, (...args) => event.execute(...args, commands));
	}
}

client.login(process.env.TOKEN);