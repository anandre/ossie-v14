import { calculateWeaponDamage } from '../../util/calculateWeaponDamage.js';
import { AllEquipment } from '../interfaces/allEquipment.js';
import type { CharacterData } from '../interfaces/characterData.js';
import { type PathData } from '../interfaces/pathData.js';
import { AllPathLevels } from '../levelData/allPaths.js';
import BaseCharacter from './character.js';

export class Path extends BaseCharacter {
	public baseHP: number;
	public weapon_id: number;
	public armor_id: number;
	public accessory_id: number;

	public path: string;

	public get currentLevelStats(): PathData {
		return AllPathLevels[this.path].find((data: PathData) => data.level === this.level);
	}

	public get weapon() {
		return AllEquipment.weapons[this.weapon_id];
	}

	public get maxHP() {
		return this.currentLevelStats.hp;
	}

	public get maxMP() {
		return this.currentLevelStats.mp;
	}

	public get str() {
		return this.currentLevelStats.str;
	}

	public get con() {
		return this.currentLevelStats.con;
	}

	public get agi() {
		return this.currentLevelStats.agi;
	}

	public get mag() {
		return this.currentLevelStats.mag;
	}

	public get spr() {
		return this.currentLevelStats.spr;
	}

	public override get speed() {
		return this.agi + this.currentLevelStats.spd;
	}

	public override get minDamage() {
		return this.weapon.minDamage;
	}

	public override get maxDamage() {
		return this.weapon.maxDamage;
	}

	public override get damageStat() {
		return this.weapon.damageStat;
	}

	public override get damageScale() {
		return this.weapon.damageScale;
	}

	public get accuracy() {
		return this.currentLevelStats.acc + this.level + Math.floor(this.currentLevelStats.accMod * this.agi);
	}

	public get dodge() {
		return this.currentLevelStats.dodge + this.agi;
	}

	public basicAttack(target: BaseCharacter) {
		const damage = calculateWeaponDamage(
			this,
			this.weapon.minDamage,
			this.weapon.maxDamage,
			this.weapon.damageStat,
			this.weapon.damageScale,
		);
		const resultStr = `${this.displayName} attacked ${target.displayName}, inflicting ${damage} damage!`;
		return {
			damage,
			result: resultStr,
		};
	}

	public constructor(data: CharacterData) {
		super();

		this.name = data.name;
		this.path = data.path;
		this.id = data.id;
		this.level = data.level;
		this.xp = data.xp;
		this.gold = data.gold;
		this.weapon_id = data.weapon_id;
		this.armor_id = data.armor_id;
		this.accessory_id = data.accessory_id;

		this.currHP = this.maxHP;
		this.currMP = this.maxMP;

		this.side = 'player';
	}
}
