import type { CharacterData } from './characterData.js';

export type EnemyData = CharacterData & {
	HP: number;
	MP: number;
};
