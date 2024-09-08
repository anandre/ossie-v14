import { SlashCommandBuilder, type ChatInputCommandInteraction } from 'discord.js';
import { db } from '../data/database/database.js';
import type { Command } from './index.js';

export default {
	data: new SlashCommandBuilder()
		.setName('register')
		.setDescription('Register a character!')
		.setDMPermission(false)
		.addStringOption((option) => option.setName('name').setRequired(true).setDescription('The name for your character'))
		.addStringOption((option) =>
			option
				.setName('path')
				.setRequired(true)
				.setDescription("The path you'll follow.")
				.addChoices(
					{ name: 'Warrior', value: 'Warrior' },
					{ name: 'Mage', value: 'Mage' },
					{ name: 'Rogue', value: 'Rogue' },
					{ name: 'Cleric', value: 'Cleric' },
				),
		)
		.toJSON(),
	async execute(interaction: ChatInputCommandInteraction) {
		if (interaction.inCachedGuild()) {
			await interaction.deferReply();
			const query = db.prepare('SELECT id FROM players WHERE id = ?');
			const res = query.all(interaction.user.id);
			if (res.length > 0) {
				await interaction.editReply('You already have a character!');
			} else {
				const insert = db.prepare('INSERT INTO players (id, name, path, level, xp, gold) VALUES (?, ?, ?, ?, ?, ?)');
				insert.run(
					interaction.user.id,
					interaction.options.getString('name'),
					interaction.options.getString('path'),
					1,
					0,
					50,
				);
				await interaction.editReply(
					`${interaction.member.displayName} has created a new character named \`${interaction.options.getString('name')}\` who will follow the path of the \`${interaction.options.getString('path')}\``,
				);
			}
		}
	},
} satisfies Command;
