import { EmbedBuilder } from 'discord.js';
import { Path } from '../data/classes/path.js';
import { db } from '../data/database/database.js';
import { allEnemies } from '../data/interfaces/allEnemies.js';
import type { CharacterData } from '../data/interfaces/characterData.js';
import { AllCombats } from '../data/interfaces/combat.js';
import { rollInitiative } from '../util/rollInitiative.js';
import type { Command } from './index.ts';

export default {
	data: {
		name: 'startcombat',
		description: 'Fight a random enemy!',
	},
	async execute(interaction) {
		await interaction.deferReply();
		const existing = AllCombats.some((combat) =>
			combat.allFighters.some((fighter) => fighter.id === interaction.user.id),
		);
		if (existing) {
			await interaction.editReply({ content: 'You are already in a combat!' });
		} else {
			const query = db.prepare('SELECT * FROM players WHERE id = ?');
			const res = query.all(interaction.user.id);
			const player = new Path(res[0] as CharacterData);
			const enemy = allEnemies.filter((enemy) => enemy.level <= player.level).random();
			if (enemy) {
				enemy.id = `${enemy.name}1`;
				const initiatives = rollInitiative([player, enemy]);
				const initStr = `${initiatives.map((fighter, index) => `${index + 1} (init \`${fighter.initiative}\`) - ${fighter.displayName} - **HP:** ${player.currHP}/${player.maxHP}, **MP:** ${player.currMP}/${player.maxMP}`).join('\n')}`;
				const embed = new EmbedBuilder()
					.setTitle(`${player.name}'s combat against ${enemy.name}!`)
					.setDescription(initStr)
					.setFooter({ text: 'Turn 1' });
				const combatMessage = await interaction.editReply({ embeds: [embed] });
				AllCombats.push({
					allFighters: initiatives,
					channelId: interaction.channelId,
					choices: [],
					enemies: [enemy],
					messageId: combatMessage.id,
					players: [player],
					results: 'Turn 1\n' + initStr,
					turn: 1,
				});
			} else {
				await interaction.reply({
					content: 'There was an error starting combat. No enemy was available.',
					ephemeral: true,
				});
			}
		}
	},
} satisfies Command;
