import { UncommonEenmy } from '../../classes/enemy.js';

export class SwampOoze extends UncommonEenmy {
	public readonly str = 2;
	public readonly agi = 3;
	public readonly con = 5;
	public readonly mag = 6;
	public readonly spr = 4;
	public readonly _acc = 10;
	public readonly _dodge = 6;

	public constructor() {
		super();

		this.name = 'SwampOoze';
		this.description = 'A nightmare found in swamps, stalking unsuspecting prey.';
		this.level = 2;
		this.xp = 15;
		this.gold = 25;

		this._rawHP = 35;
		this._rawMP = 50;

		this.currHP = 35;
		this.currMP = 50;

		this.speed = 2;

		this.minDamage = 4;
		this.maxDamage = 6;
		this.damageScale = 1;
		this.damageStat = 'mag';
	}
}
