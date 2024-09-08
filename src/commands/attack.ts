import type { ChatInputCommandInteraction } from 'discord.js';
import { EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import { AllCombats } from '../data/interfaces/combat.js';
import type { Command } from './index.ts';

export default {
	data: new SlashCommandBuilder()
		.setName('attack')
		.setDescription('Attack with your weapon!')
		.addStringOption((option) =>
			option.setName('target').setDescription('Who your target is').setAutocomplete(true).setRequired(true),
		)
		.toJSON(),
	async execute(interaction: ChatInputCommandInteraction) {
		const target = interaction.options.getString('target', true);
		const currCombat = AllCombats.find((combat) => combat.enemies.find((fighter) => fighter.id === target));
		// create function to do actions in order, set choice, add string, check for HP before doing the action
		if (currCombat) {
			const player = currCombat.players.find((fighter) => fighter.id === interaction.user.id);
			const enemy = currCombat.enemies.find((fighter) => fighter.id === target);
			if (enemy && player) {
				// push to choices, add enemy choice, do both, add string results
				const damage = player.basicAttack(enemy);
				currCombat.turn++;
				const deathCheck =
					currCombat.players.every((fighter) => fighter.currHP > 0) &&
					currCombat.enemies.every((fighter) => fighter.currHP > 0);
				if (deathCheck) {
					const embed = new EmbedBuilder()
						.setTitle(
							`${player.name}'s combat against ${enemy.name}!
					Turn ${currCombat.turn - 1}'s results: ${player.name} attacked ${enemy.name} and dealt ${damage.damage} damage!`,
						)
						.addFields(
							{
								name: `${player.name}`,
								value: `**HP:** ${player.currHP}/${player.maxHP}
				**MP:** ${player.currMP}/${player.maxMP}
				**Statuses:** [None]`,
								inline: true,
							},
							{
								name: `${enemy.name}`,
								value: `**HP:** ${enemy.currHP}/${enemy.maxHP}
				**MP:** ${enemy.currMP}/${enemy.maxMP}
				**Statuses:** [None]`,
								inline: true,
							},
						)
						.setFooter({ text: `Turn ${currCombat.turn}` });
					await interaction.reply({ content: 'Attack done.', ephemeral: true });
					const channel = interaction.client.channels.cache.get(currCombat.channelId);
					if (channel?.isTextBased()) {
						await channel.messages.edit(currCombat.messageId, { embeds: [embed] });
					} else {
						await interaction.followUp({ content: 'Could not update the combat message!', ephemeral: true });
					}
				} else {
					const winner = currCombat.players.every((fighter) => fighter.currHP > 0) ? 'Players win!' : 'Enemies win!';
					await interaction.reply({ content: 'Combat done.', ephemeral: true });
					const channel = interaction.client.channels.cache.get(currCombat.channelId);
					if (channel?.isTextBased()) {
						await channel.messages.edit(currCombat.messageId, { content: winner });
					} else {
						await interaction.followUp({ content: 'Could not update the combat message!', ephemeral: true });
					}
				}
			}
		} else {
			await interaction.reply({ content: 'Could not find the combat!', ephemeral: true });
		}
	},
} satisfies Command;
