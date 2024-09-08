import { AllCombats } from '../data/interfaces/combat.js';
import type { Command } from './index.ts';

export default {
	data: {
		name: 'displaycombat',
		description: 'Brings up your existing combat in case you lost the message or creates a new one.',
	},
	async execute(interaction) {
		const combat = AllCombats.find((combat) =>
			combat.allFighters.some((fighter) => fighter.id === interaction.user.id),
		);
		if (combat) {
			const guild = interaction.client.guilds.cache.find((guild) => guild.channels.cache.has(combat.channelId));
			if (guild) {
				await interaction.reply({
					content: `[Here is your combat message](https://discord.com/channels/${guild.id})/${combat.channelId}/${combat.messageId}`,
					ephemeral: true,
				});
			} else {
				await interaction.reply({ content: 'Could not locate the guild the combat is in', ephemeral: true });
			}
		}
	},
} satisfies Command;
