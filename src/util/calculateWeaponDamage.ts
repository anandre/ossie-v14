import type BaseCharacter from '../data/classes/character.js';

export function calculateWeaponDamage(
	attacker: BaseCharacter,
	minDamage: number,
	maxDamage: number,
	stat: 'agi' | 'mag' | 'str',
	scale: number,
) {
	const random = Math.floor(Math.random() * maxDamage) + minDamage;
	return random + Math.round(attacker[stat] * scale);
}
