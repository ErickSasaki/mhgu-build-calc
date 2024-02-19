import { Injectable } from '@angular/core';
import { WeaponTypes } from '../types/weapon-type';
import { WeaponModel } from '../types/weapon-model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface SearchParams {
    type: WeaponTypes;
    name?: string;
    final?: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class WeaponSearchService {
    constructor(private httpClient: HttpClient) { }

    private getWeaponsJson(weaponType: WeaponTypes): string {
        const weaponTypeToJson: Record<WeaponTypes, string> = {
            'Bow': 'bow',
            'Charge Blade': 'charge-blade',
            'Dual Blades': 'dual-blades',
            'Great Sword': 'great-sword',
            'Heavy Bowgun': 'heavy-bowgun',
            'Hunting Horn': 'hunting-horn',
            'Insect Glaive': 'insect-glaive',
            'Light Bowgun': 'light-bowgun',
            'Long Sword': 'longsword',
            'Switch Axe': 'switch-axe',
            'Sword and Shield': 'sword-and-shield',
            Gunlance: 'gunlance',
            Hammer: 'hammer',
            Lance: 'lance',
        }

        return weaponTypeToJson[weaponType];
    }

    public searchWeapon(searchParams: SearchParams) {
        return this.httpClient.get(`/assets/data/${this.getWeaponsJson(searchParams.type)}.json`);
    }
}
