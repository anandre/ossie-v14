import { ChoiceType } from '../data/interfaces/choice.js';
import type { Combat } from '../data/interfaces/combat.js';
import { hitCheck } from './hitCheck.js';

export function doRoundChoices(combat: Combat) {
	const { allFighters, choices } = combat;
	for (const fighter of allFighters) {
		const currChoice = choices.find((choice) => choice.fighter === fighter.id);

		if (!currChoice || fighter.currHP === 0) return;

		const action = currChoice.action;

		if (action === ChoiceType.ATTACK) {
			const target = allFighters.find((fighter) => fighter.id === currChoice.target);

			if (!target) return;

			const toHitCheck = hitCheck(fighter, target);

			if (!toHitCheck) {
				combat.results += `${fighter.displayName} attacked ${target.displayName} and missed!`;

				return;
			}

			const res = fighter.basicAttack(target);
			target.takeDamage(res.damage);
			combat.results += res.result;
		}
	}
}
