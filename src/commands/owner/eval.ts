import { exec } from 'child_process';
import { Command } from 'discord-akairo';
import { TextChannel } from 'discord.js';
import { MessageEmbed } from 'discord.js';
import { promisify } from 'util';

const sh = promisify(exec);

export default class evaluate extends Command {
    constructor() {
        super('eval', {
            aliases: ['eval', 'ev', 'exec'],
            args: [
                {
                    id: 'codetoeval',
                    type: 'string',
                    match: 'rest'
                },
                {
                    id: "silent",
                    match: 'flag',
                    flag: '--silent',
                    // unordered: true
                }
            ],
            ownerOnly: true,
            channel: 'guild'
        });
    }

    async exec(message, args) {

        // if (args.codetoeval.includes("client.token")) {
        //     return message.channel.send(`I see that you have tried to run code that (probably) gets my token! I don't like people gaining full control over me, so I won't be evaluating that code.`)
        // }
        // if (args.codetoeval.includes(".env")) {
        //     return message.channel.send(`I see that you have tried to run code that (probably) gets my token! I don't like people gaining full control over me, so I won't be evaluating that code.`)
        // }

        const output = await eval(args.codetoeval)
        console.log(output)
        
        const newoutput = output.stdout
        const tokencheck = output.content

        if(tokencheck?.includes(process.env["token"])) {
            message.channel.send(`<@492488074442309642> somebody, possibly you, has leaked my token!`)
            const errorchannel = this.client.channels.cache.get('824680761470746646') as TextChannel
            errorchannel.send('<@492488074442309642> TOKEN HAS BEEN LEAKED')
            errorchannel.send('<@492488074442309642> TOKEN HAS BEEN LEAKED')
            errorchannel.send('<@492488074442309642> TOKEN HAS BEEN LEAKED')
            errorchannel.send('<@492488074442309642> TOKEN HAS BEEN LEAKED')
            errorchannel.send('<@492488074442309642> TOKEN HAS BEEN LEAKED')

        }

        //console.log(`---------`)
        const evaloutputembed = new MessageEmbed()
        .setTitle('Evaluated Code')
        .setDescription(`
        :inbox_tray: **Input**
        \`\`\`${args.codetoeval}\`\`\`
        
        :outbox_tray: **Output**
        \`\`\`${newoutput}\`\`\`
        `)

        message.channel.send(evaloutputembed)

    }
}
