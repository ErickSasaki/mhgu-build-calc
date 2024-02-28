import { Component, Inject } from '@angular/core';
import { BattleSkills } from '../../types/skills';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'mhgu-skills-dialog',
  standalone: true,
  imports: [MatDialogModule, MatListModule, MatCheckboxModule, CommonModule],
  templateUrl: './skills-dialog.component.html',
  styleUrl: './skills-dialog.component.scss'
})
export class SkillsDialogComponent {
    constructor(
        private dialogRef: MatDialogRef<SkillsDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: BattleSkills[]
    ) {}

    ngOnInit() {
        this.selectedSkills = [...this.data];
    }

    public skillLabels: Record<BattleSkills, string> = {
        "attack-1": 'Attack Up S',
        "attack-2": 'Attack Up M',
        "attack-3": 'Attack Up L',
        "polar-hunter": 'Polar Hunter',
        "tropic-hunter": 'Tropic Hunter',
        "element": 'Element Atk Up',
        "fire-attack-1": 'Fire Atk +1',
        "fire-attack-2": 'Fire Atk +2',
        "ice-attack-1": 'Ice Atk +1',
        "ice-attack-2": 'Ice Atk +2',
        "thunder-attack-1": 'Thunder Atk +1',
        "thunder-attack-2": 'Thunder Atk +2',
        "dragon-attack-1": 'Dragon Atk +1',
        "dragon-attack-2": 'Dragon Atk +2',
        "water-attack-1": 'Water Atk +1',
        "water-attack-2": 'Water Atk +2',
        "status-1": 'Status Atk +1',
        "status-2": 'Status Atk +2',
        "sharp-1": 'Sharpness +1',
        "sharp-2": 'Sharpness +2',
        "razor-sharp": 'Razor Sharp',
        "bludgeoner": 'Bludgeoner',
        "crit-draw": 'Crit Draw',
        "load-up": 'Load Up',
        "affinity-1": 'Critical Eye +1',
        "affinity-2": 'Critical Eye +2',
        "affinity-3": 'Critical Eye +3',
        "weakness-exploit": 'Weakness Exploit',
        "repeat-offender": 'Repeat Offender',
        "status-crit": 'Status Crit',
        "elemental-crit": 'Elemental Crit',
        "crit-boost": 'Critical Boost',
        "bitter-affinity": 'Bitter Affinity',
        "artillery-1": 'Artillery Novice',
        "artillery-2": 'Artillery Expert',
        "latent-power-1": 'Latent Power +1',
        "latent-power-2": 'Latent Power +2',
        "challenger-1": 'Challenger +1',
        "challenger-2": 'Challenger +2',
        "peak-performance": 'Peak Performance',
        "trump-card": 'Trump Card',
        "dragonheart": 'Dragonheart',
        "adrenaline-2": 'Adrenaline +2',
        "fortify": 'Fortify',
        "resentment": 'Resentment',
        "resuscitate": 'Resuscitate',
        "airborne": 'Airborne',
    };

    public skills = Object.entries(this.skillLabels)
        .map(([key, value]) => ({ key: key as BattleSkills, label: value }));

    public selectedSkills: BattleSkills[] = [];

    public handleCheckboxChange({ skill, checked }: { skill: BattleSkills; checked: boolean }) {
        if (checked) {
            this.removeConflictedSkill(skill);
            this.selectedSkills.push(skill);
        } else {
            this.removeSkill(skill);
        }
    }

    public confirm() {
        this.dialogRef.close(this.selectedSkills);
    }

    public cancel() {
        this.dialogRef.close();
    }

    private removeConflictedSkill(selectedSkill: BattleSkills) {
        const skillsToBeRemoved = this.selectedSkills.filter((skill: BattleSkills) => {
            return this.isSameSkill(skill, selectedSkill);
        });

        skillsToBeRemoved.forEach((skill: BattleSkills) => {
            this.removeSkill(skill);
        });
    }

    private isSameSkill(skill: BattleSkills, selectedSkill: BattleSkills): boolean {
        return this.removeNumbersFromString(skill) === this.removeNumbersFromString(selectedSkill);
    }

    private removeSkill(skill: BattleSkills) {
        const index = this.selectedSkills.indexOf(skill);
        this.selectedSkills.splice(index, 1);
    }

    private removeNumbersFromString(str: string): string {
        return str.replace(/\d+/, '');
    }
}
