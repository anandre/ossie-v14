import type { Snowflake } from 'discord.js';
import type BaseCharacter from '../classes/character.js';
import type { Enemy } from '../classes/enemy.js';
import type { Path } from '../classes/path.js';
import type { Choice } from './choice.js';

export type Combat = {
	allFighters: BaseCharacter[];
	channelId: Snowflake;
	choices: Choice[];
	enemies: Enemy[];
	messageId: Snowflake;
	players: Path[];
	results: string;
	turn: number;
};

export const AllCombats: Combat[] = [];
