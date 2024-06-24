import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { CardComponent } from '../../../../components/card/card.component';
import { InputComponent } from '../../../../components/input/input.component';
import { SkillsDialogComponent } from '../../../../components/skills-dialog/skills-dialog.component';
import { WeaponSearchDialogComponent } from '../../../../components/weapon-search-dialog/weapon-search-dialog.component';
import { WeaponTypeDialogComponent } from '../../../../components/weapon-type-dialog/weapon-type-dialog.component';
import { FoodBuff } from '../../../../types/buffs';
import { skillLabels, BattleSkills } from '../../../../types/skills';
import { WeaponModel } from '../../../../types/weapon-model';
import { WeaponTypes } from '../../../../types/weapon-type';
import { HomeService } from '../../home.service';
import { WeaponAndBuffsData } from './weapon-and-buffs-data';

@Component({
    selector: 'mhgu-weapon-buffs-form',
    standalone: true,
    imports: [
        CardComponent,
        InputComponent,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        MatIconModule,
        MatCheckboxModule,
        MatRadioModule,
    ],
    templateUrl: './weapon-buffs-form.component.html',
    styleUrl: './weapon-buffs-form.component.scss'
})
export class WeaponBuffsFormComponent {
    public selectWeaponModalIsOpen = false;

    public skillLabels = skillLabels;

    public foodBuffs: { label: string, value: FoodBuff }[] = [
        { label: 'Attack Up S', value: 'attack-1' },
        { label: 'Attack Up M', value: 'attack-2' },
        { label: 'Attack Up L', value: 'attack-3' },
    ];

    constructor(
        private formBuilder: FormBuilder,
        private homeService: HomeService,
        public dialog: MatDialog,
    ) { }

    public form = this.formBuilder.group({
        type: ['' as WeaponTypes, Validators.required],
        name: ['', Validators.required],
        attack: [undefined as number | undefined, Validators.required],
        affinity: [undefined as number | undefined],
        sharpness: [''],
        skills: [[] as BattleSkills[]],
        foodBuff: ['attack-3' as FoodBuff],
        powerTalon: [true],
        powerCharm: [true],
        demonDrug: [true],
    });

    public submit() {
        this.homeService.setWeaponAndBuffs(this.form.value as WeaponAndBuffsData);
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
