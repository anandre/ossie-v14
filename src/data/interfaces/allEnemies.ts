import { readdirSync } from 'node:fs';
import { readdir } from 'node:fs/promises';
import { URL } from 'node:url';
import { Collection } from 'discord.js';
import type { Enemy } from '../classes/enemy.js';

const enemyPath = new URL('../enemies', import.meta.url);
const enemyFolders = readdirSync(enemyPath);

const allEnemies: Collection<string, Enemy> = new Collection();

const foo = async () => {
	for (const folder of enemyFolders) {
		const tempPath = new URL(`../enemies/${folder}`, import.meta.url);
		const dir = await readdir(tempPath);
		for (const file of dir) {
			const currFile = await import(`${enemyPath}/${folder}/${file}`);
			const replaced = currFile[file.replace('.js', '')];
			const enemy = new replaced();
			allEnemies.set(enemy.name, enemy);
		}
	}
};

await foo();

export { allEnemies };
