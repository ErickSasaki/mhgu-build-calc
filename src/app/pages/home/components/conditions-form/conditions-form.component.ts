import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../home.service';
import { WeaponAndBuffsData } from '../weapon-buffs-form/weapon-and-buffs-data';
import { BattleSkills } from '../../../../types/skills';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { CardComponent } from '../../../../components/card/card.component';
import { skillLabels } from '../../../../types/skills';

interface CheckboxConfig {
    type: 'checkbox';
    label: string;
}

interface RadioConfig {
    type: 'radio';
    options: string[];
}

type ConditionsConfig = CheckboxConfig | RadioConfig;

export type ConditionsData = Partial<Record<BattleSkills, boolean | string>>;

@Component({
  selector: 'mhgu-conditions-form',
  standalone: true,
  imports: [
    CardComponent,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatCheckboxModule,
    MatRadioModule,
  ],
  templateUrl: './conditions-form.component.html',
  styleUrl: './conditions-form.component.scss'
})
export class ConditionsFormComponent implements OnInit {
    public form!: FormGroup;
    public conditions: Array<{ skillName: BattleSkills } & ConditionsConfig> = [];
    public readonly skillLabels = skillLabels;

    constructor(
        private homeService: HomeService,
        private formBuilder: FormBuilder,
    ) {
        this.initializeForm();
    }

    ngOnInit(): void {
        this.setConditionsWhenDataChanges();
    };

    public submit() {
        this.homeService.setConditions(this.conditions as ConditionsData);
    }

    private initializeForm() {
        this.formBuilder.group({});
    }

    private setConditionsWhenDataChanges() {
        this.homeService.weaponAndBuffsObservable().subscribe((data) => {
            this.createConditionsForm(data?.skills || []);
        });
    }

    private createConditionsForm(skills: BattleSkills[]) {
        this.resetConditionsForm();

        skills.forEach((skill) => {
            if (this.conditionsConfig[skill]) {
                this.form.addControl(skill, this.formBuilder.control(false));

                this.conditions.push({
                    skillName: skill,
                    ...this.conditionsConfig[skill]!
                });
            }
        });
    }

    private resetConditionsForm() {
        this.conditions = [];
        this.form = this.formBuilder.group({});
    }

    private readonly conditionsConfig: Partial<Record<BattleSkills, ConditionsConfig>> = {
        'adrenaline-2': {
            type: 'checkbox',
            label: 'Below 40% health?'
        },
        "challenger-1": {
            type: 'checkbox',
            label: 'Monster enraged?'
        },
        "challenger-2": {
            type: 'checkbox',
            label: 'Monster enraged?'
        },
        "crit-draw": {
            type: 'checkbox',
            label: 'Draw attack?',
        },
        "latent-power-1": {
            type: 'checkbox',
            label: 'Latent Power active?'
        },
        "latent-power-2": {
            type: 'checkbox',
            label: 'Latent Power active?'
        },
        "peak-performance": {
            type: 'checkbox',
            label: 'Full health?',
        },
        "polar-hunter": {
            type: 'radio',
            options: [
                'Cold Weather',
                'Cold Drink',
                'Both',
                'None',
            ],
        },
        "tropic-hunter": {
            type: 'radio',
            options: [
                'Hot Weather',
                'Hot Drink',
                'Both',
                'None',
            ],
        },
        "repeat-offender": {
            type: 'radio',
            options: [
                '0 hits',
                'after 1 hit',
                'after 5 hits'
            ],
        },
        "trump-card": {
            type: 'checkbox',
            label: 'Trump card and Hunter art hit?'
        },
        "weakness-exploit": {
            type: 'checkbox',
            label: 'Hitting weak spot?',
        },
        airborne: {
            type: 'checkbox',
            label: 'Aerial attack?',
        },
        dragonheart: {
            type: 'checkbox',
            label: 'Below 66% hp?',
        },
        fortify: {
            type: 'radio',
            options: [
                '0 carts',
                '1 cart',
                '2 carts',
            ],
        },
        resentment: {
            type: 'checkbox',
            label: 'Has red health?'
        },
        resuscitate: {
            type: 'checkbox',
            label: 'Has a negative effect?',
        },
    };
}
