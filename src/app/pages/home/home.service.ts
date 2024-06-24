import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { WeaponAndBuffsData } from './components/weapon-buffs-form/weapon-and-buffs-data';
import { ConditionsData } from './components/conditions-form/conditions-form.component';

@Injectable({
    providedIn: 'root'
})
export class HomeService {
    private weaponAndBuffs: BehaviorSubject<WeaponAndBuffsData | null> = new BehaviorSubject<WeaponAndBuffsData | null>(null);
    private conditions: BehaviorSubject<ConditionsData | null> = new BehaviorSubject<ConditionsData | null>(null);

    constructor() { }

    public weaponAndBuffsObservable(): Observable<WeaponAndBuffsData | null> {
        return this.weaponAndBuffs.asObservable();
    }

    public setWeaponAndBuffs(data: WeaponAndBuffsData | null): void {
        this.weaponAndBuffs.next(data);
    }

    public conditionsObservable(): Observable<ConditionsData | null> {
        return this.conditions.asObservable();
    }

    public setConditions(data: ConditionsData | null): void {
        this.conditions.next(data);
    }
}
