import { Component, Output, EventEmitter, Inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { WeaponSearchService } from '../../services/weapon-search.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WeaponModel } from '../../types/weapon-model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { WeaponTypes } from '../../types/weapon-type';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatCheckboxModule} from '@angular/material/checkbox';

interface FilterParams {
    searchName: string;
    final?: boolean;
}

@Component({
    selector: 'mhgu-weapon-search-dialog',
    standalone: true,
    imports: [MatTableModule, CommonModule, FormsModule, MatProgressSpinnerModule, MatCheckboxModule],
    templateUrl: './weapon-search-dialog.component.html',
    styleUrl: './weapon-search-dialog.component.scss'
})
export class WeaponSearchDialogComponent {
    public tableColumns = ['id', 'name', 'type', 'attack', 'affinity'];
    public displayWeapons: WeaponModel[] = [];
    public loading = true;

    private weapons: WeaponModel[] = [];

    constructor(
        private weaponSearchService: WeaponSearchService,
        private dialogRef: MatDialogRef<WeaponSearchDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { weaponType: WeaponTypes }
    ) { }

    ngOnInit() {
        this.weaponSearchService.searchWeapon({ type: this.data.weaponType })
            .subscribe((response) => {
                this.weapons = response as WeaponModel[];
                this.displayWeapons = this.weapons;
                this.loading = false;
            });
    }

    public handleRowClick(event: WeaponModel) {
        this.dialogRef.close(event);
    }

    public handleInputChange(event: Event) {
        const value = (event?.target as HTMLInputElement)?.value || '';

        this.filter({ searchName: value })
    }

    private filter(filterParams: FilterParams) {
        this.displayWeapons = filterParams.searchName ?
            this.weapons.filter((weapon) => weapon.name.toLowerCase().includes(filterParams.searchName)) :
            this.weapons;
    }
}
