import { Command } from 'discord-akairo';
import { MessageEmbed } from 'discord.js';
import axios from "axios"
import utils from '../../functions/utils';

export default class partners extends Command {
    constructor() {
        super('partners', {
            aliases: ['partners'],
            userPermissions: ['ADMINISTRATOR'],
        });
    }

    async exec(message) {
        if (message.guild.id != `824680357936103497` || `780181693100982273`) { return }
        else {

            const res = await axios(`https://raw.githubusercontent.com/nacrt/SkyblockClient-REPO/main/files/discords.json`, { method: "get" })

            for (const element of res.data) {

                if (element.partner) {
                    const partnerEmbed = new MessageEmbed()
                        .setTitle(element.fancyname)
                        .setURL(`https://discord.gg/${element.code}`)
                        .setColor(`00ff00`)
                        .setDescription(`${element.description}\n\nDiscord Invite: \`https://discord.gg/${element.code}\``)
                        .setThumbnail(`https://raw.githubusercontent.com/nacrt/SkyblockClient-REPO/main/files/discords/${element.icon}`)

                    await utils.sleep(1000)
                    await message.channel.send(partnerEmbed)
                }

            }
        }
    }
}