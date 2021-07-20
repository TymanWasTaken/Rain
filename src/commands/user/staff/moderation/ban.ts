import { BotCommand } from "@extensions/BotCommand";
import utils from "@functions/utils";
import { MessageEmbed } from "discord.js";

export default class ban extends BotCommand {
    constructor() {
        super("ban", {
            aliases: ["ban"],
            args: [
                { id: `member`, type: `member` },
                { id: `reason`, type: `string`, match: `restContent` },
            ],

            description: 'This is an example command!',
            usage: '`-ban <member> <reason>`',
            discordPerms: ['BAN_MEMBERS']
        })
    }

    async exec(message, args) {
        //check if bannable
        const errorEmbed = new MessageEmbed()
            .setColor('DARK_RED')

        if (args.member.user.id == message.guild.owner.id) {
            errorEmbed.setDescription(`You can't ban the owner of the server!`)
            message.reply(errorEmbed)
        }
        if (args.member.user.id == message.author.id) {
            errorEmbed.setDescription(`You can't ban yourself!`)
            message.reply(errorEmbed)
        }
        if (args.member.user.id == this.client.user.id) {
            errorEmbed.setDescription(`Why would you want to ban me?`)
            message.reply(errorEmbed)
        }

        //check for perms
        if (await utils.getRolePriority(message.member, args.member) == false) {
            return message.channel.send(`Your highest role is lower than (or the same as) ${args.member.user.username}'s highest role, so you cannot ban ${await utils.getPronouns(args.member.user, 'describe')}.`)
        }

        message.delete()
        args.member.user.send(`You have been banned from **${message.guild.name}** for \`${args.reason}\`.`).then(() => {
            args.member.ban({ reason: `${message.author.tag} | ${args.reason}` })
        })
        message.util.send(`**${args.member.user.username}** has been banned.`)
    }
}