const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
require("dotenv").config();
const clc = require("cli-color");

module.exports = {
    name: "ready",
    once: true,
    execute (client, commands) {
        console.log(clc.blueBright.bold("\r\noooooo   oooooo     oooo oooooooooooo  .oooooo..o   .oooooo.   \r\n `888.    `888.     .8\'  `888\'     `8 d8P\'    `Y8  d8P\'  `Y8b  \r\n  `888.   .8888.   .8\'    888         Y88bo.      888      888 \r\n   `888  .8\'`888. .8\'     888oooo8     `\"Y8888o.  888      888 \r\n    `888.8\'  `888.8\'      888    \"         `\"Y88b 888      888 \r\n     `888\'    `888\'       888       o oo     .d8P `88b    d88\' \r\n      `8\'      `8\'       o888ooooood8 8\"\"88888P\'   `Y8bood8P\'\nVersion 1.0\nDevelopment"));

	const CLIENT_ID = client.user.id;

	const rest = new REST({
		version: "9"
	}).setToken(process.env.TOKEN);


	(async () => {
		try {
			if (process.env.ENV === "production") {
				await rest.put(Routes.applicationCommands(CLIENT_ID), {
					body: commands
				});
				console.log("Successfully registered commands globally.");
			} else {
				await rest.put(Routes.applicationGuildCommands(CLIENT_ID, process.env.GUILD_ID), {
					body: commands
				});
				console.log(clc.green.bold("\nSuccessfully registered commands locally."));
				console.log(clc.blackBright("------------------------"))
				console.log(clc.magenta("    List of Commands"))
				console.log(clc.blackBright("------------------------"))
				client.commands.forEach(command => {
					console.log(clc.cyanBright(`/${command.data.name} ` + "-", `${command.data.description}`));
				})
				console.log(clc.blackBright("------------------------"))
				console.log(clc.magenta("     List of Events"))
				console.log(clc.blackBright("------------------------"))
				client.events.forEach(event => {
					console.log(clc.cyanBright(`${event.name}`));
				})
				console.log(clc.blackBright("------------------------"))
				console.log(clc.magenta("        Systems          "))
				console.log(clc.blackBright("------------------------"))
                console.log(clc.magenta('N/A'));
				console.log(clc.blackBright.bold("------------------------"))
				console.log(clc.green.bold.underline("Bot is ready for use..."))
				console.log(clc.blackBright.bold("------------------------"))
			}
		} catch (err) {
			if (err) console.error(err);
		}
	})();
    }
}