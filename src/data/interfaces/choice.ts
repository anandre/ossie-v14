import type { Snowflake } from 'discord.js';

export type Choice = {
	ability?: string;
	action: ChoiceType;
	fighter: Snowflake;
	item?: string;
	target: string;
};

export enum ChoiceType {
	ATTACK,
	DEBUFF,
	HEAL,
	BUFF,
}
