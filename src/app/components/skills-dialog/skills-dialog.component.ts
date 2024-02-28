import { Component, Inject } from '@angular/core';
import { BattleSkills, skillLabels } from '../../types/skills';
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

    public skills = Object.entries(skillLabels)
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
