import type { Weapon } from '../../interfaces/equipment.js';

export default {
	name: 'Iron Sword',
	id: 0,
	damageScale: 1,
	damageStat: 'str',
	slot: 'weapon',
	statMultiplier: 1.5,
	minDamage: 2,
	maxDamage: 5,
	accuracy: 10,
} satisfies Weapon;
