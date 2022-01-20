import { Command, Listener } from '@sapphire/framework'
import { container } from '@sapphire/pieces'
import { CommandInteraction, MessageEmbedOptions, TextChannel } from 'discord.js'
import got from 'got/dist/source'
import { errorDetails, Perms } from '../types/misc'
import moment from 'moment'

export default class Utilities {
	/**
	 * @param content The object you want to put on a haste server.
	 * @returns The haste link, or `"Couldn't post."` if it failed to post it.
	 */
	public async haste(content: string): Promise<string> {
		const urls = [
			'https://h.inv.wtf',
			'https://hst.sh',
			'https://hasteb.in',
			'https://hastebin.com',
			'https://mystb.in',
			'https://haste.clicksminuteper.net',
			'https://paste.pythondiscord.com',
			'https://haste.unbelievaboat.com',
		]

		for (const url of urls) {
			try {
				const body: never = await got
					.post(`${url}/documents`, {
						body: content,
						responseType: 'json',
					})
					.json()

				return `${url}/${body['key']}`
			} catch (err) {
				continue
			}
		}
		return "Couldn't post."
	}

	/**
	 * @param error The `Error` object.
	 * @param details The details for the error.
	 * @returns Sends a message in the error channel, and returns a more user-friendly embed.
	 */
	public async error(error: Error, details: errorDetails): Promise<MessageEmbedOptions> {
		const errorChannel = container.client.channels.cache.get(container.settings.errorChannel) as TextChannel
		const id = `${this.random(696969696969)}`

		await errorChannel.send({
			embeds: [
				{
					title: `An error occured!`,
					fields: [
						{
							name: 'Details',
							value: `Type: ${details.type}${details.data.link ? `\n${details.data.link}` : ''}${details.data.note ? `\nNote: ${details.data.note}` : ''}`,
							inline: true,
						},
						{ name: 'ID', value: id, inline: true },
					],
					description: `\`\`\`js\n${error.stack}\`\`\``,
					color: 'RED',
				},
			],
		})

		return {
			title: `A(n) ${details.type} error occured!`,
			description: `${details.data.note ? `**${details.data.note}**\n` : ''}This error has been automatically reported to my developer. Please give her this ID: \`${id}\``,
			color: 'RED',
		}
	}

	/**
	 * @param max The maximum the random number generator can generate.
	 * @returns A random number.
	 */
	public random(max: number): number {
		return Math.floor(Math.random() * max)
	}

	/**
	 * @returns The current timestamp, in the proper formatting for Discord's <t:timestamp:> formatting
	 */
	public now(): number {
		return Math.round(Date.now() / 1000)
	}

	/**
	 * @returns An array of all command IDs
	 */
	public getAllCommands(): string[] {
		const allCommands = []
		for (const c of container.stores.get('commands')) {
			allCommands.push(c[1])
		}

		const notOwnerCommands = allCommands.filter((c) => !c.options.preconditions?.includes('ownerOnly'))

		const commands: string[] = []
		notOwnerCommands.forEach((c) => {
			commands.push(c.name)
		})

		return commands
	}

	/**
	 * @param id The ID of the command you want to fetch.
	 * @returns The command object.
	 */
	public getCommand(id: string): Command | undefined {
		return container.stores.get('commands').get(id)
	}

	public getListener(id: string): Listener | undefined {
		const allListeners = []
		for (const [, l] of container.stores.get('listeners')) {
			allListeners.push(l)
		}

		return allListeners.find((l) => l.name === id)
	}

	/**
	 * @param interaction The command interaction you want to parse for options.
	 * @returns The args from the interaction, in the same formatting as `discord-akairo` has them.
	 */
	public parseInteractionArgs(interaction: CommandInteraction) {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const options: any = {}
		interaction.options.data.forEach((option) => {
			switch (option.type) {
				case 'STRING':
					options[option.name] = option.value
					break
				case 'INTEGER':
					options[option.name] = option.value
					break
				case 'BOOLEAN':
					options[option.name] = option.value
					break
				case 'NUMBER':
					options[option.name] = option.value
					break
				case 'USER':
					options[option.name] = option.user
					break
				case 'CHANNEL':
					options[option.name] = option.channel
					break
				case 'ROLE':
					options[option.name] = option.role
					break
				case 'MENTIONABLE':
					options[option.name] = option.role ? option.role : option.user
					break
				case 'SUB_COMMAND':
					options['subcommand'] = option.name
					option.options?.forEach((subOption) => {
						switch (subOption.type) {
							case 'STRING':
								options[subOption.name] = subOption.value
								break
							case 'INTEGER':
								options[subOption.name] = subOption.value
								break
							case 'BOOLEAN':
								options[subOption.name] = subOption.value
								break
							case 'NUMBER':
								options[subOption.name] = subOption.value
								break
							case 'USER':
								options[subOption.name] = subOption.user
								break
							case 'CHANNEL':
								options[subOption.name] = subOption.channel
								break
							case 'ROLE':
								options[subOption.name] = subOption.role
								break
							case 'MENTIONABLE':
								options[subOption.name] = subOption.role ? subOption.role : subOption.user
								break
						}
					})
					break
				case 'SUB_COMMAND_GROUP': {
					options['subcommandGroup'] = option.name

					// @ts-ignore
					const suboptions = option.options[0].options

					options['subcommand'] = (option.options as { name: string; type: string }[])[0].name

					// @ts-ignore
					suboptions.forEach((subOption) => {
						switch (subOption.type) {
							case 'STRING':
								options[subOption.name] = subOption.value
								break
							case 'INTEGER':
								options[subOption.name] = subOption.value
								break
							case 'BOOLEAN':
								options[subOption.name] = subOption.value
								break
							case 'NUMBER':
								options[subOption.name] = subOption.value
								break
							case 'USER':
								options[subOption.name] = subOption.user
								break
							case 'CHANNEL':
								options[subOption.name] = subOption.channel
								break
							case 'ROLE':
								options[subOption.name] = subOption.role
								break
							case 'MENTIONABLE':
								options[subOption.name] = subOption.role ? subOption.role : subOption.user
								break
						}
					})
					break
				}
			}
		})

		return options
	}

	timeFormatted(format?: string) {
		return moment().format(format ?? 'YYYY-MM-DD hh:mm:ss A')
	}

	/**
	 * @param perms1 The first perms value.
	 * @param perms2 The second perms value.
	 * @returns If the first perms value is higher than the second perms value.
	 */
	checkPermHeirarchy(perms1: Perms, perms2: Perms) {
		const permsMap = {
			owner: 6,
			admin: 5,
			srMod: 4,
			moderator: 3,
			helper: 2,
			trialHelper: 1,
			none: 0,
		}

		const p1 = permsMap[perms1]
		const p2 = permsMap[perms2]

		return p1 >= p2
	}
}
