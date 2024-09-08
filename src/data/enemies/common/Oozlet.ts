import { CommonEnemy } from '../../classes/enemy.js';

export class Oozlet extends CommonEnemy {
	public readonly str = 1;
	public readonly agi = 1;
	public readonly con = 2;
	public readonly mag = 3;
	public readonly spr = 2;
	public readonly _acc = 65;
	public readonly _dodge = 5;

	public constructor() {
		super();

		this.name = 'Oozlet';
		this.description = 'A puddle of ooze that has gained magical abilities through absorbing... things.';
		this.level = 1;
		this.xp = 5;
		this.gold = 10;

		this._rawHP = 12;
		this._rawMP = 15;

		this.currHP = 12;
		this.currMP = 15;

		this.speed = 1;

		this.minDamage = 2;
		this.maxDamage = 4;
		this.damageStat = 'mag';
		this.damageScale = 0.75;
	}
}
