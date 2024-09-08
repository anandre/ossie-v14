import { CommonEnemy } from '../../classes/enemy.js';

export class Terrat extends CommonEnemy {
	public readonly str = 2;
	public readonly agi = 3;
	public readonly con = 1;
	public readonly mag = 1;
	public readonly spr = 1;
	public readonly _acc = 70;
	public readonly _dodge = 8;

	public constructor() {
		super();

		this.name = 'Terrat';
		this.description = 'A rat transformed by an evil magic, it hunts larger prey now.';
		this.level = 1;
		this.xp = 5;
		this.gold = 10;

		this._rawHP = 15;
		this._rawMP = 5;

		this.currHP = 15;
		this.currMP = 5;

		this.speed = 3;

		this.minDamage = 1;
		this.maxDamage = 3;
		this.damageStat = 'str';
		this.damageScale = 1;
	}
}
