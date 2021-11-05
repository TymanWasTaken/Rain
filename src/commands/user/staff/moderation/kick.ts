import { RainMessage } from '@extensions/akairo/AkairoMessage'
import { RainMember } from '@extensions/discord.js/GuildMember'
import { DRainMessage } from '@extensions/discord.js/Message'
import { RainUser } from '@extensions/discord.js/User'
import { RainCommand } from '@extensions/RainCommand'
import Utils from '@functions/utils'
import { Snowflake } from 'discord.js'

export default class Kick extends RainCommand {
	constructor() {
		super('kick', {
			aliases: ['kick'],
			description: 'Kick a user.',
			discordPerms: ['MANAGE_MESSAGES'],
			defaultPerms: 'helper',
			slash: true,
			slashOptions: [
				{
					name: 'user',
					description: 'The user to kick',
					type: 'USER',
					required: true,
				},
				{
					name: 'reason',
					description: 'The reason the user is getting kicked.',
					type: 'STRING',
					required: false,
				},
			],

            slashGuilds: Utils.slashGuilds,
			rainPerms: ['KICK_MEMBERS']
		})
	}
	async exec(message: DRainMessage) {
		await message.reply('use slashcommands')
	}

	async execSlash(message: RainMessage, args: { user: RainUser; reason?: string }) {
		let member
		try {
			member = (await message.guild?.members.fetch(args.user)) as RainMember
		} catch (err) {
			if (!member) return await message.reply({ content: "I couldn't find that person. Most likely they aren't on the server.", ephemeral: true })
		}
		if (!(message.member as RainMember).hasRolePriority(member))
			return await message.reply({ content: `You can't ${this.id} **${args.user.tag}**, as their highest role is higher than yours.`, ephemeral: true })
		if (member.isOwner) return await message.reply({ content: `You can't ${this.id} the owner of the server.`, ephemeral: true })
		if (await (member as RainMember).getPerms() != 'none') return await message.reply({content: `You can't ${this.id} other staff members.`, ephemeral: true})

		const addedModlog = await args.user.addModlogEntry((message.guildId as Snowflake), 'KICK', message.author.id, { reason: args.reason })

        await member.kick(args.reason)

		if (addedModlog === false) {
			return await message.reply({ content: 'There was an error while adding the modlog entry for that member, but they have still been kicked.', ephemeral: true })
		}
		try {
			await args.user.send(`You have been kicked from **${message.guild?.name}** ${args.reason ? `for ${args.reason}` : 'without a reason.'}`)
		} catch (err) {
			return await message.reply(`I couldn't DM **${args.user.tag}**, but I kicked them.`)
		}
		await message.reply(`**${args.user.tag}** has been kicked.`)
	}
}
