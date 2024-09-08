import type { AutocompleteInteraction } from 'discord.js';
import { AllCombats } from '../data/interfaces/combat.js';

export async function autocomplete(interaction: AutocompleteInteraction) {
	const currCombat = AllCombats.find((el) => el.players.some((fighter) => fighter.id === interaction.user.id));
	if (currCombat) {
		if (interaction.commandName === 'attack') {
			const focusedValue = interaction.options.getFocused();
			const targets = currCombat.enemies;
			const filtered = targets.filter((fighter) => fighter.name.startsWith(focusedValue));
			const choices = filtered.map((fighter) => ({
				name: `${fighter.side === 'player' ? fighter.name : fighter.id} - ${fighter.currHP}/${fighter.maxHP} HP`,
				value: fighter.id,
			}));
			await interaction.respond(choices);
		}
	} else {
		await interaction.respond([{ name: 'noCombat', value: 'You are not in a combat!' }]);
	}
}
