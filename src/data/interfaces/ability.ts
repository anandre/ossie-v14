import type BaseCharacter from '../classes/character.js';

export abstract class Ability {
	public abstract cooldown: number;
	public abstract description: string;
	public abstract id: string;
	public abstract max?: number;
	public abstract min?: number;
	public abstract mp: number;
	public abstract multiplier: Multiplier[];
	public abstract name: string;
	public abstract target: Targets | Targets[];

	public abstract cast(fighter: BaseCharacter, target: BaseCharacter | BaseCharacter[]): string;
}

export enum Targets {
	SINGLE,
	ALL,
	GROUP,
}

export type Multiplier = {
	multilpier: number;
	target: Targets;
};
