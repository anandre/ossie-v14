import type BaseCharacter from '../data/classes/character.js';

export function rollInitiative(fighters: BaseCharacter[]) {
	for (const fighter of fighters) {
		const init = Math.floor(Math.random() * 10) + 1 + fighter.speed;
		fighter.initiative = init;
	}

	return fighters.sort((a, b) => b.initiative - a.initiative);
}
