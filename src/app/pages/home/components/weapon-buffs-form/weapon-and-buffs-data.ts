import { FoodBuff } from "../../../../types/buffs";
import { BattleSkills } from "../../../../types/skills";
import { WeaponTypes } from "../../../../types/weapon-type";

export interface WeaponAndBuffsData {
    type: WeaponTypes,
    name: string,
    attack: number,
    affinity: number,
    sharpness: string,
    skills: BattleSkills[],
    foodBuff: FoodBuff,
    powerTalon: boolean,
    powerCharm: boolean,
    demonDrug: boolean,
}
