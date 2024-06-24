import { Component } from '@angular/core';
import { CardComponent } from '../../components/card/card.component';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { WeaponTypeDialogComponent } from '../../components/weapon-type-dialog/weapon-type-dialog.component';
import { WeaponTypes } from '../../types/weapon-type';
import { MatIconModule } from '@angular/material/icon';
import { WeaponSearchDialogComponent } from '../../components/weapon-search-dialog/weapon-search-dialog.component';
import { WeaponModel } from '../../types/weapon-model';
import { InputComponent } from '../../components/input/input.component';
import { SkillsDialogComponent } from '../../components/skills-dialog/skills-dialog.component';
import { BattleSkills, skillLabels } from '../../types/skills';
import { FoodBuff } from '../../types/buffs';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { WeaponBuffsFormComponent } from './components/weapon-buffs-form/weapon-buffs-form.component';
import { ConditionsFormComponent } from './components/conditions-form/conditions-form.component';
import { ResultsTableComponent } from './components/results-table/results-table.component';

@Component({
    selector: 'mhgu-home',
    standalone: true,
    imports: [
        WeaponBuffsFormComponent,
        ConditionsFormComponent,
        ResultsTableComponent,
    ],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export class HomeComponent {

}
