/* eslint-disable @typescript-eslint/no-unused-vars */
import chalk from 'chalk'
import { exec } from 'child_process'
import { Guild, Message, MessageEmbed } from 'discord.js'
import { promisify, inspect } from 'util'
import { BotCommand } from '@extensions/BotCommand'

import importUtils from '@functions/utils'
const utils = importUtils

import importDatabase from '@functions/database'
import config from '@src/config/config'
const database = importDatabase

const sh = promisify(exec);

export default class evaluate extends BotCommand {
    constructor() {
        super('eval', {
            aliases: ['eval', 'ev', 'exec'],
            args: [
                { id: 'codeToEval', type: 'string', match: 'rest' },
                { id: 'silent', match: 'flag', flag: '--silent', },
                { id: 'sudo', match: 'flag', flag: '--sudo' }
            ],
            ownerOnly: true,
        })
    }

    async exec(message: Message, args: any) {
        if (args.codeToEval.includes('token')) { return (message.reply('no token')) }
        if (args.codeToEval.includes('env')) { return message.reply('no env') }

        if (args.codeToEval.includes('channel.delete')) { return message.reply('Are you IRONM00N?') }
        if (args.codeToEval.includes('message.guild.delete')) { return message.reply('You\'re like IRONM00N but infinitely more stupid!') }
        if (args.codeToEval.includes('delete') && !args.sudo) { return message.reply('This would be blocked by smooth brain protection, but BushBot has a license') }

        const guild = message.guild
        const client = this.client
        const channel = message.channel
        const embed = new MessageEmbed()
        const user = message.author
        const member = message.member
        const botUser = this.client.user
        const botMember = (message.guild as Guild).me

        let output

        try {
            output = await eval(`(async () => {${args.codeToEval}})()`)
            output = inspect(output, { depth: 0 })
        }
        catch (err) {
            const errorStack = err.stack.substring(0, 1000)

            output = errorStack
        }

        if (output.includes(config.tokens.token)) {output = output.replace(config.tokens.token, 'token')}
        if (output.includes(config.tokens.pctoken)) {output = output.replace(config.tokens.pctoken, 'pctoken')}
        if (output.includes(config.tokens.devtoken)) {output = output.replace(config.tokens.devtoken, 'devtoken')}
        if (output.includes(config.database.mongodb)) {output = output.replace(config.tokens.token, 'mongodb')}

        const evalEmbedDisabledGuilds = [
            '794610828317032458'
        ]
        const evalDisabledGuildChannelBypass = [
            '834878498941829181'
        ]

        if (evalEmbedDisabledGuilds.includes(message.guild!.id) && !evalDisabledGuildChannelBypass.includes(message.channel.id)) {
            if (args.codeToEval.includes('message.delete')) { return }
            else { return message.react('<:success:838816341007269908>') }
        }


        if (!args.silent && !args.codeToEval.includes('message.channel.delete()')) {
            const evalOutputEmbed = new MessageEmbed()
                .setTitle('Evaluated Code')
                .addField(':inbox_tray: **Input**', `\`\`\`js\n${args.codeToEval}\`\`\``)
                .setColor(message.member!.displayColor)

            // if (inspect(output, { depth: 0 }).length > 1000) {
            //     await evalOutputEmbed.addField(':outbox_tray: **Output**', await utils.haste(inspect(output, { depth: 0 })))
            // }

            evalOutputEmbed.addField(':outbox_tray: **Output**', `\`\`\`js\n${output}\`\`\``)

            await message.reply({ embeds: [evalOutputEmbed] })
        }
        if (args.silent) {
            if (args.codeToEval.includes('message.delete')) { return }
            message.react('<:success:838816341007269908>')
        }
    }
}

