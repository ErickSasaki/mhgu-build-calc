import { Component } from '@angular/core';
import { CardComponent } from '../../components/card/card.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
    MatDialog,
} from '@angular/material/dialog';
import { WeaponTypeDialogComponent } from '../../components/weapon-type-dialog/weapon-type-dialog.component';
import { WeaponTypes } from '../../types/weapon-type';

@Component({
    selector: 'mhgu-home',
    standalone: true,
    imports: [CardComponent, ReactiveFormsModule, FormsModule, CommonModule],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export class HomeComponent {
    public selectWeaponModalIsOpen = false;

    constructor(
        private formBuilder: FormBuilder,
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

    public openSelectWeapon() {
        const dialogRef = this.dialog.open(WeaponTypeDialogComponent, {width: '400px'});

        dialogRef.afterClosed().subscribe((weaponType: WeaponTypes) => {
            this.form.patchValue({ weapon: { weaponType } })
        });
    }
}
