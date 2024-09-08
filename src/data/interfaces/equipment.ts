type Equipment = {
	id: number;
	name: string;
	slot: 'accessory' | 'armor' | 'weapon';
};

export type Weapon = Equipment & {
	accuracy: number;
	damageScale: number;
	damageStat: 'agi' | 'mag' | 'str';
	maxDamage: number;
	minDamage: number;
	statMultiplier: number;
};
