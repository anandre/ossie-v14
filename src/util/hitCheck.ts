import type BaseCharacter from '../data/classes/character.js';

export function hitCheck(attacker: BaseCharacter, defender: BaseCharacter) {
	const random = Math.floor(Math.random() * 100) + 1;
	return random < attacker.accuracy - defender.dodge;
}
