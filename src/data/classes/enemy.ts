import { calculateWeaponDamage } from '../../util/calculateWeaponDamage.js';
import BaseCharacter from './character.js';

export abstract class Enemy extends BaseCharacter {
	protected _rawHP: number;
	protected _rawMP: number;

	public abstract str: number;
	public abstract agi: number;
	public abstract con: number;
	public abstract mag: number;
	public abstract spr: number;
	public abstract _acc: number;
	public abstract _dodge: number;

	public description: string;

	public rarity: 'common' | 'uncommon';

	public get maxHP() {
		return this._rawHP;
	}

	public get maxMP() {
		return this._rawMP;
	}

	public get accuracy() {
		return this._acc;
	}

	public get dodge() {
		return this._dodge;
	}

	public basicAttack(target: BaseCharacter) {
		const damage = calculateWeaponDamage(this, this.minDamage, this.maxDamage, this.damageStat, this.damageScale);
		const resultStr = `${this.displayName} attacked ${target.displayName}, inflicting ${damage} damage!`;
		return {
			damage,
			result: resultStr,
		};
	}

	public constructor() {
		super();

		this.side = 'enemy';
	}
}

export abstract class CommonEnemy extends Enemy {
	// protected HPMod = 1;

	// protected MPMod = 1;

	public constructor() {
		super();

		this.rarity = 'common';
	}
}

export abstract class UncommonEenmy extends Enemy {
	// protected HPMod = 1;

	// protected MPMod = 1;

	public constructor() {
		super();

		this.rarity = 'uncommon';
	}
}
