import { Component } from '@angular/core';
import { CardComponent } from '../../components/card/card.component';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
    MatDialog,
} from '@angular/material/dialog';
import { WeaponTypeDialogComponent } from '../../components/weapon-type-dialog/weapon-type-dialog.component';
import { WeaponTypes } from '../../types/weapon-type';
import { MatIconModule } from '@angular/material/icon';
import { WeaponSearchDialogComponent } from '../../components/weapon-search-dialog/weapon-search-dialog.component';
import { WeaponModel } from '../../types/weapon-model';
import { InputComponent } from '../../components/input/input.component';
import { SkillsDialogComponent } from '../../components/skills-dialog/skills-dialog.component';
import { BattleSkills, skillLabels } from '../../types/skills';

@Component({
    selector: 'mhgu-home',
    standalone: true,
    imports: [
        CardComponent,
        InputComponent,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        MatIconModule,
    ],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export class HomeComponent {
    public selectWeaponModalIsOpen = false;

    public skillLabels = skillLabels;

    constructor(
        private formBuilder: FormBuilder,
        public dialog: MatDialog,
    ) { }

    public form = this.formBuilder.group({
        type: ['' as WeaponTypes, Validators.required],
        name: ['', Validators.required],
        attack: [undefined as number | undefined, Validators.required],
        affinity: [undefined as number | undefined],
        sharpness: [''],
        skills: [[] as BattleSkills[]],
        foodBuff: [''],
        powerTalon: [true],
        powerCharm: [true],
        demonDrug: [true],
    });

    public submit() {
        console.log('value: ', this.form.value);
    }

    private clearWeapon() {
        this.form.patchValue({
                affinity: undefined,
                attack: undefined,
                name: '',
                sharpness: '',
        });
    }

    public openSelectWeaponType() {
        const dialogRef = this.dialog.open(WeaponTypeDialogComponent, { width: '400px' });

        dialogRef.afterClosed().subscribe((weaponType: WeaponTypes) => {
            if (weaponType) {
                this.clearWeapon();
                this.form.patchValue({
                    type: weaponType,
                });
            }
        });
    }

    public openWeaponSearch() {
        const dialogRef = this.dialog.open(WeaponSearchDialogComponent, {
            data: { weaponType: this.form.value.type },
        });

        dialogRef.afterClosed().subscribe((weapon: WeaponModel) => {
            if (weapon) {
                this.form.patchValue({ ...weapon });
            }
        });
    }

    public openSkillsDialog() {
        const dialogRef = this.dialog.open(SkillsDialogComponent, {
            data: this.form.value.skills || [],
        });

        dialogRef.afterClosed().subscribe((skills: BattleSkills[]) => {
            if (skills) {
                this.form.patchValue({
                    skills,
                })
            }
        });
    }
}
