import { Command } from 'discord-akairo';
import { MessageEmbed } from 'discord.js';
import utils from '../../functions/utils'

export default class dm extends Command {
    constructor() {
        super('dm', {
            aliases: ['dm'],
            args: [
                {
                    id: 'user',
                    type: 'user'
                },
                {
                    id: 'message',
                    type: 'string',
                    match: 'restContent'
                },
            ],
            ownerOnly: true,
            channel: 'guild'
        });
    }

    async exec(message, args) {
        try {
            const dmembed = new MessageEmbed()
                .setTitle(`Message was sent to **${args.user.tag}**`)
                .addField(`Contents`, `${args.message}`)
                .setTimestamp()

            args.user.send(`${args.message}`)
            message.channel.send(dmembed)
        }
        catch (err) {
            utils.errorhandling
        }
    }
}
