import { setTimeout } from 'node:timers/promises';
import { EmbedBuilder, SlashCommandBuilder, type ChatInputCommandInteraction } from 'discord.js';
import { Path } from '../data/classes/path.js';
import { db } from '../data/database/database.js';
import type { CharacterData } from '../data/interfaces/characterData.js';
import type { Command } from './index.js';

export default {
	data: new SlashCommandBuilder()
		.setName('test')
		.setDescription('Just a test command.')
		.setDMPermission(false)
		.toJSON(),
	async execute(interaction: ChatInputCommandInteraction) {
		const prepare = db.prepare('SELECT * FROM players WHERE id = ?');
		const res = prepare.all(interaction.user.id);
		const player = new Path(res[0] as CharacterData);
		// const enemy = new Terrat();
		const embed = new EmbedBuilder().setTitle(`${player.name} vs ${player.name}`).addFields({
			name: player.name,
			value: `**HP**: ${player.currHP}/${player.maxHP}
				**Weapon**: ${player.weapon.name}`,
			inline: true,
		});
		await interaction.reply({ content: `A new foe approaches!`, embeds: [embed] });
		player.basicAttack(player);
		const newEmbed = new EmbedBuilder().setTitle(`${player.name} vs ${player.name}`).addFields(
			{
				name: player.name,
				value: `**HP**: ${player.currHP}/${player.maxHP}`,
				inline: true,
			},
			{
				name: player.name,
				value: `**HP**: ${player.currHP}/${player.maxHP}`,
			},
		);
		await setTimeout(5_000);
		await interaction.editReply({ content: `${player.name} attacked ${player.name}`, embeds: [newEmbed] });
	},
} satisfies Command;
