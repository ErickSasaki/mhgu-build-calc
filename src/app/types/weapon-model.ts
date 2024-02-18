import { WeaponSpecialAttacks } from "./weapon-speacial-attack";
import { WeaponTypes } from "./weapon-type";

export interface WeaponModel {
    id: number;
    name: string;
    type: WeaponTypes;
    attack: number;
    element: WeaponSpecialAttacks;
    element_attack: number;
    element_2: WeaponSpecialAttacks;
    element_2_attack: number;
    defense: number;
    sharpness: string;
    affinity: number;
    num_slots: number;
    final: boolean;
}
