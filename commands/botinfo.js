const { MessageEmbed }= require('discord.js');
const moment = require('moment');
const { mem, cpu, os } = require('node-os-utils');
const { stripIndent } = require('common-tags');
const { SlashCommandBuilder } = require("@discordjs/builders");
const pjson = require('../package.json');


module.exports = {
    data: new SlashCommandBuilder()
        .setName("botinfo")
        .setDescription("Displays a list of useful information about WESO Assistant, and the server"),
      async execute(interaction) {

        const { guild } = interaction
        const { createdTimestamp, ownerId, description, members, channels } = guild

        const d = moment.duration(interaction.client.uptime);
        const weeks = (d.weeks() == 1) ? `${d.weeks()} day` : `${d.weeks()} weeks`;
        const days = (d.days() == 1) ? `${d.days()} day` : `${d.days()} days`;
        const hours = (d.hours() == 1) ? `${d.hours()} hour` : `${d.hours()} hours`;
        const secs = (d.seconds() == 1) ? `${d.seconds()} seconds` : `${d.seconds()} seconds`;
        const serverInfo = stripIndent`
          Name        :: ${guild.name}
          Created     :: <t:${parseInt(createdTimestamp / 1000)}:R>
          Owner       :: <@${ownerId}>
          Description :: ${description}
        `;
        
        const clientStats = stripIndent`
          Members     :: ${members.cache.filter((m) => !m.user.bot).size}
           ↳ Bots     :: ${members.cache.filter((m) => m.user.bot).size}
          Channels    :: ${interaction.client.channels.cache.size}
           ↳ Text     :: ${channels.cache.filter((c) => c.type === "GUILD_TEXT").size}
           ↳ Voice    :: ${channels.cache.filter((c) => c.type === "GUILD_VOICE").size}
           ↳ Threads  :: ${channels.cache.filter((c) => c.type === "GUILD_PUBLIC_THREAD" && "GUILD_PRIVATE_THREAD" && "GUILD_NEWS_THREAD").size}
           ↳ Category :: ${channels.cache.filter((c) => c.type === "GUILD_CATEGORY").size}
           ↳ Stages   :: ${channels.cache.filter((c) => c.type === "GUILD_STAGE_VOICE").size}
           ↳ News     :: ${channels.cache.filter((c) => c.type === "GUILD_NEWS").size}
       `;

        const { totalMemMb, usedMemMb } = await mem.info();
        const serverStats = stripIndent`
          OS        :: ${await os.oos()}
          Cores     :: ${cpu.count()}
          CPU Usage :: ${await cpu.usage()} %
          RAM       :: ${totalMemMb} MB
          RAM Usage :: ${usedMemMb} MB
          WS Ping   :: ${Math.round(interaction.client.ws.ping)}ms
          Uptime    :: ${weeks}, ${days}, ${hours} & ${secs}
           ↳ D.JS Version :: ${pjson.dependencies['discord.js'].replace("^", "")}
           ↳ Node Version :: ${process.version.replace("v", "")}
           ↳ Mongoose     :: ${pjson.dependencies.mongoose.replace("^", "")}
        `;
        
        const embed = new MessageEmbed()
        .setTitle('WESO Assistant\'s Statistics')
        .setThumbnail("https://discord.com/channels/932167327179493436/932167327179493439/945372582599856189")
        .addField('Commands', `\`${interaction.client.commands.size}\` commands`, true)
        .addField('Events', `\`${interaction.client.events.size}\` events`, true)
        .addField('Server Info',`${serverInfo}`)
        .addField('Server Stats', `\`\`\`asciidoc\n${clientStats}\`\`\``)
        .addField('Bot Stats', `\`\`\`asciidoc\n${serverStats}\`\`\``)
        .setFooter({text: "WESO Assistant | GoldRushRoleplay"})
        .setTimestamp()
        .setColor(interaction.guild.me.displayHexColor);
        interaction.reply({ embeds: [embed] });
     }
}