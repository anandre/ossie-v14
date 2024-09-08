import { readdirSync } from 'node:fs';
import { URL } from 'node:url';
import type { Weapon } from './equipment.js';

const weaponPath = new URL('../items/weapons', import.meta.url);
const weaponFolder = readdirSync(weaponPath);

const allWeapons: Weapon[] = [];

const bar = async () => {
	for (const file of weaponFolder) {
		const weap = await import(`${weaponPath}/${file}`);
		allWeapons.push(weap.default);
	}
};

await bar();

export const AllEquipment = {
	weapons: allWeapons,
};
