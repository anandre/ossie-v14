import type BaseCharacter from '../classes/character.js';
import { Ability, Targets } from '../interfaces/ability.js';

export class Bash extends Ability {
	public cooldown = 3;
	public description = 'A sudden, brutal strike on an unsuspecting target';
	public id = 'bash';
	public max = undefined;
	public min = undefined;
	public mp = 4;
	public multiplier = [];
	public name = 'Bash';
	public target = Targets.SINGLE;

	public cast(fighter: BaseCharacter, target: BaseCharacter): string {}
}
