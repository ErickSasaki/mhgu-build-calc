import { Component } from '@angular/core';
import { CardComponent } from '../../components/card/card.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
    MatDialog,
} from '@angular/material/dialog';
import { WeaponTypeDialogComponent } from '../../components/weapon-type-dialog/weapon-type-dialog.component';
import { WeaponTypes } from '../../types/weapon-type';
import {MatIconModule} from '@angular/material/icon';
import { WeaponSearchDialogComponent } from '../../components/weapon-search-dialog/weapon-search-dialog.component';
import { WeaponSearchService } from '../../services/weapon-search.service';

@Component({
    selector: 'mhgu-home',
    standalone: true,
    imports: [CardComponent, ReactiveFormsModule, FormsModule, CommonModule, MatIconModule],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export class HomeComponent {
    public selectWeaponModalIsOpen = false;

    constructor(
        private formBuilder: FormBuilder,
        private weaponSearchService: WeaponSearchService,
        public dialog: MatDialog,
    ) { }

    public form = this.formBuilder.group({
        weapon: this.formBuilder.group({
            weaponType: ['' as WeaponTypes],
            weaponName: [''],
            attack: [0],
            affinity: [0],
            sharpness: [''],
        }),
        buffs: this.formBuilder.group({
            skills: [[]],
            foodBuff: [''],
            powerTalon: [true],
            powerCharm: [true],
            demonDrug: [true],
        }),
    });

    public submit() {
        console.log('value: ', this.form.value);
    }

    public openSelectWeaponType() {
        const dialogRef = this.dialog.open(WeaponTypeDialogComponent, {width: '400px'});

        dialogRef.afterClosed().subscribe((weaponType: WeaponTypes) => {
            this.form.patchValue({ weapon: { weaponType } })
        });
    }

    public openWeaponSearch() {
        const dialogRef = this.dialog.open(WeaponSearchDialogComponent, {width: '400px'});

        this.weaponSearchService.searchWeapon({ type: 'Bow', page: 1 });
    }
}
