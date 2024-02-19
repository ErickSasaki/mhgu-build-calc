import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

import { MatListModule, MatSelectionListChange } from '@angular/material/list';
import { WeaponTypes } from '../../types/weapon-type';

@Component({
    selector: 'mhgu-weapon-type-dialog',
    standalone: true,
    imports: [MatDialogModule, MatListModule, CommonModule],
    templateUrl: './weapon-type-dialog.component.html',
    styleUrl: './weapon-type-dialog.component.scss'
})
export class WeaponTypeDialogComponent {
    constructor(private dialogRef: MatDialogRef<WeaponTypeDialogComponent>) {}

    public weaponTypeOptions: WeaponTypes[] = [
        'Great Sword',
        'Long Sword',
        'Sword and Shield',
        'Dual Blades',
        'Hammer',
        'Hunting Horn',
        'Lance',
        'Gunlance',
        'Switch Axe',
        'Charge Blade',
        'Insect Glaive',
        'Light Bowgun',
        'Heavy Bowgun',
        'Bow',
    ];

    public closeDialogWithSelectedValue(value: WeaponTypes) {
        this.dialogRef.close(value);
    }
}
