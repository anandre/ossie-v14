import { calculateWeaponDamage } from '../../util/calculateWeaponDamage.js';

export default abstract class BaseCharacter {
	public name: string;
	public id: string;
	public level: number;
	public xp: number;
	public gold: number;

	public currHP: number;
	public currMP: number;

	private _speed: number = 0;
	public get speed(): number {
		return this._speed;
	}
	public set speed(value: number) {
		this._speed = value;
	}

	private _minDamage: number;
	private _maxDamage: number;
	private _damageStat: 'agi' | 'mag' | 'str';
	private _damageScale: number;

	public get minDamage() {
		return this._minDamage;
	}

	public set minDamage(value: number) {
		this._minDamage = value;
	}

	public get maxDamage() {
		return this._maxDamage;
	}

	public set maxDamage(value: number) {
		this._maxDamage = value;
	}

	public get damageStat() {
		return this._damageStat;
	}

	public set damageStat(value: 'agi' | 'mag' | 'str') {
		this._damageStat = value;
	}

	public get damageScale() {
		return this._damageScale;
	}

	public set damageScale(value: number) {
		this._damageScale = value;
	}

	public get displayName() {
		return this.side === 'player' ? this.name : this.id;
	}

	public initiative: number = 0;

	public side: 'enemy' | 'player';

	public abstract get maxHP(): number;
	public abstract get maxMP(): number;

	public abstract get accuracy(): number;
	public abstract get dodge(): number;

	public takeDamage(damage: number) {
		this.currHP = Math.max(0, this.currHP - damage);
	}

	public abstract basicAttack(target: BaseCharacter): { damage: number; result: string };

	// protected abstract HPMod: number;
	// protected abstract MPMod: number;
}
