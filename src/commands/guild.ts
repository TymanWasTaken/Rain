import { ApplyOptions } from '@sapphire/decorators'
import { CommandOptions } from '@sapphire/framework'
import { CommandInteraction } from 'discord.js'
import RainCommand from '../structures/RainCommand'

@ApplyOptions<CommandOptions>({
	name: 'guild',
	aliases: ['guild'],
	description: 'see info about the current guild',
	preconditions: ['slashOnly', 'permissions'],
	botPerms: ['EMBED_LINKS'],
	defaultPermissions: 'none',
	slashOptions: {
		guildIDs: ['880637463838724166', '883512410449772574'],
		idHints: ['938935765541486612', '938934491995582474'],
	},
})
export class GuildCommand extends RainCommand {
	public override async chatInputRun(interaction: CommandInteraction) {
		await interaction.deferReply()
		const guild = interaction.guild
		if (!guild) return await interaction.reply({ content: 'You have to run this in a guild.', ephemeral: true })
		await guild.fetch()

		await interaction.editReply({
			embeds: [
				{
					title: guild.name,
					thumbnail: { url: guild.iconURL({ dynamic: true, format: 'png', size: 128 }) ?? '' },
					description: `
                    **ID**: \`${guild.id}\`
                    **Created at** <t:${Math.floor(guild.createdTimestamp / 1000)}:f>
                    **Owned by** ${(await guild.fetchOwner()).user.tag} (\`${(await guild.fetchOwner()).user.id}\`)

                    **${guild.approximateMemberCount} Members**, ${guild.approximatePresenceCount} of which are online.
                    **${(await guild.channels.fetch()).size} Channels**, with ${(await guild.channels.fetchActiveThreads()).threads.size} active threads.
                    ${guild.roles.cache.size - 1 > 1 ? `**${guild.roles.cache.size - 1} Roles**: ` : `**1 Role**: `}${guild.roles.cache
						.filter((r) => r.id != r.guild.id)
						.sort((r1, r2) => r2.rawPosition - r1.rawPosition)
						.map((r) => r.toString())
						.join(', ')}
                    `,
				},
			],
		})
	}
}
