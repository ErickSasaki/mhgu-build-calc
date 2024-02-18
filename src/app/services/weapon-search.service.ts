import { Injectable } from '@angular/core';
import { WeaponTypes } from '../types/weapon-type';
import { WeaponModel } from '../types/weapon-model';
import { HttpClient } from '@angular/common/http';

interface SearchParams {
    type: WeaponTypes;
    page: number;
    name?: string;
    final?: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class WeaponSearchService {
    constructor(private httpClient: HttpClient) { }

    private getWeaponData(type: WeaponTypes) {
        console.log('type: ', type);

        this.httpClient.get('/assets/data/bow.json')
            .subscribe((response) => {
                console.log('response: ', response);
            })
    }

    public searchWeapon(searchParams: SearchParams) {
        return this.getWeaponData(searchParams.type);
    }
}
