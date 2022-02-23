const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, Interaction } = require("discord.js");
const clc = require("cli-color")

const pChannel = '932193899672383501';

module.exports = {
    data: new SlashCommandBuilder()
        .setName("promote")
        .setDescription("Promote a Deputy (Command Only)")
        .addUserOption(option => 
            option
            .setName('deputy')
            .setDescription('Mention the Deputy you are promoting.')
            .setRequired(true)
        )
        .addMentionableOption(option => 
            option
            .setName('rank')
            .setDescription('Mention the rank you are promoting them to.')
            .setRequired(true)
        ),
    async execute(interaction) {
        let member = interaction.guild.members.cache.get(interaction.user.id)
        if (!member._roles.includes("940443551362338896")) return interaction.reply({ephemeral:true, content: '🛑 | You do not have permission to use this command.'}), console.log(clc.redBright.bold(member.user.tag + " attempted to use /t"));
        if (interaction.channelId !== '932193899672383501') return interaction.reply({ephemeral:true, content: `🛑 | Incorrect Channel! Please use this channel in <#${pChannel}>.`}), console.log(clc.redBright.bold(member.user.tag + ` attempted to use /promote in ${interaction.channelId}`));
        const { options } = interaction
        const rank = interaction.options.get('rank')
        const Member = options.getMember("deputy")
        if(Member._roles.includes(rank.value)) return interaction.reply({content: `<@!${Member.id}> already has <@&${rank.value}>`, ephemeral: true})

        const promoteEmbed = new MessageEmbed()
        .setColor("GREEN")
        .setTitle('New Promotion!!!')
        .setDescription('Everyone please congratulate them!')
        .setFooter(`Promoted by: ${interaction.user.username}`)
        .setTimestamp()

        const asstDep = '932169889303658527';
        const dep = '932169941912801290';
        const snrDep = '944379096241160233';
        const corp = '932170458932080651';
        const sergeant = '932169652178677800';
        const lieu = '932169513456242729';
        const cap = '932169432430702602';

        switch (rank.value) {
            case dep: // Deputy Role
                Member.roles.remove(asstDep) 
                Member.roles.add(dep) 
                const message1 = await interaction.reply({embeds: [promoteEmbed.addFields({name: "Deputy:", value: `<@!${Member.id}>`},{name: "Previous Rank:", value: `<@&${asstDep}>`},{name: "New Rank", value: `<@&${rank.value}>`})], fetchReply: true})
                try {
                    message1.react('🎉');
                    message1.react('🥳');
                } catch (error) {
                    console.error(clc.redBright.bold('One of the emojis failed to react'));
                }
            break;
            case snrDep: // Senior Deputy Role
                Member.roles.remove(dep)
                Member.roles.add(snrDep)
                const message2 = await interaction.reply({embeds: [promoteEmbed.addFields({name: "Deputy:", value: `<@!${Member.id}>`},{name: "Previous Rank:", value: `<@&${dep}>`},{name: "New Rank", value: `<@&${rank.value}>`})], fetchReply: true})
                try {
                    message2.react('🎉');
                    message2.react('🥳');
                } catch (error) {
                    console.error(clc.redBright.bold('One of the emojis failed to react'));
                }
            break;
            case corp: // Corporal Role
                Member.roles.remove(snrDep)
                Member.roles.add(corp)
                const message3 = await interaction.reply({embeds: [promoteEmbed.addFields({name: "Deputy:", value: `<@!${Member.id}>`},{name: "Previous Rank:", value: `<@&${snrDep}>`},{name: "New Rank", value: `<@&${rank.value}>`})], fetchReply: true})
                try {
                    message3.react('🎉');
                    message3.react('🥳');
                } catch (error) {
                    console.error(clc.redBright.bold('One of the emojis failed to react'));
                }
            break;
            case sergeant: // Sergeant Role
                Member.roles.remove(corp)
                Member.roles.add(sergeant)
                const message4 = await interaction.reply({embeds: [promoteEmbed.addFields({name: "Deputy:", value: `<@!${Member.id}>`},{name: "Previous Rank:", value: `<@&${corp}>`},{name: "New Rank", value: `<@&${rank.value}>`})], fetchReply: true})
                try {
                    message4.react('🎉');
                    message4.react('🥳');
                } catch (error) {
                    console.error(clc.redBright.bold('One of the emojis failed to react'));
                }
            break;
            case lieu: // Lieutenant Role
                Member.roles.remove(sergeant)
                Member.roles.add(lieu)
                Member.roles.add('940443551362338896')
                const message5 = await interaction.reply({embeds: [promoteEmbed.addFields({name: "Deputy:", value: `<@!${Member.id}>`},{name: "Previous Rank:", value: `<@&${sergeant}>`},{name: "New Rank", value: `<@&${rank.value}>`})], fetchReply: true})
                try {
                    message5.react('🎉');
                    message5.react('🥳');
                } catch (error) {
                    console.error(clc.redBright.bold('One of the emojis failed to react'));
                }
            break;
            case cap: // Captain Role
                Member.roles.remove(lieu)
                Member.roles.add(cap)
                const message6 = await interaction.reply({embeds: [promoteEmbed.addFields({name: "Deputy:", value: `<@!${Member.id}>`},{name: "Previous Rank:", value: `<@&${lieu}>`},{name: "New Rank", value: `<@&${rank.value}>`})], fetchReply: true})
                try {
                    message6.react('🎉');
                    message6.react('🥳');
                } catch (error) {
                    console.error(clc.redBright.bold('One of the emojis failed to react'));
                }
            break;
            case '932169283797131275': // Sheriff
            return interaction.reply({content: `🛑 | Double No`, ephemeral: true});
            case '932169322711908412': // Undersheriff
            return interaction.reply({content: `🛑 | No`, ephemeral: true});
            case '940133962624421918': // Admin Override Role
            return interaction.reply({content: `🛑 | I am not allowed to promote someone to that role!!!`, ephemeral: true});
            case '945389709729869825': // WESO Assistant Role
            return interaction.reply({content: `🛑 | I am not allowed to promote someone to that role!!!`, ephemeral: true});
            case '932194162609115166': // WESO Role
            return interaction.reply({content: `🛑 | I am not allowed to promote someone to that role!!!`, ephemeral: true});
            case '944516520543928321': // Sup Marshal Role
            return interaction.reply({content: `🛑 | I am not allowed to promote someone to that role!!!`, ephemeral: true});
            case '937254067133108254': // Marshal Role
            return interaction.reply({content: `🛑 | I am not allowed to promote someone to that role!!!`, ephemeral: true});
            case '945044257671102464': // Ex-WESO Role
            return interaction.reply({content: `🛑 | I am not allowed to promote someone to that role!!!`, ephemeral: true});
            case '940443551362338896': // Command Role
            return interaction.reply({content: `🛑 | I am not allowed to promote someone to that role!!!`, ephemeral: true});
            case '944735121817362523': // Ranger Leader Role
            return interaction.reply({content: `🛑 | I am not allowed to promote someone to that role!!!`, ephemeral: true});
            case '935742913869140058': // Ranger Role
            return interaction.reply({content: `🛑 | I am not allowed to promote someone to that role!!!`, ephemeral: true});
            case '940409995810447401': // NASO Sheriff Role
            return interaction.reply({content: `🛑 | I am not allowed to promote someone to that role!!!`, ephemeral: true});
            case '940410840434233374': // LSO Sheriff Role
            return interaction.reply({content: `🛑 | I am not allowed to promote someone to that role!!!`, ephemeral: true});
            case '944543948318326814': // NHSO Sheriff Role
            return interaction.reply({content: `🛑 | I am not allowed to promote someone to that role!!!`, ephemeral: true});
            case '945355078200590416': // Nerd Role
            return interaction.reply({content: `🛑 | I am not allowed to promote someone to that role!!!`, ephemeral: true});
        }
    }
}