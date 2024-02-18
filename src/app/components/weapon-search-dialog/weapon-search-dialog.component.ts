import { Component } from '@angular/core';
import {MatTableModule} from '@angular/material/table';

@Component({
  selector: 'mhgu-weapon-search-dialog',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './weapon-search-dialog.component.html',
  styleUrl: './weapon-search-dialog.component.scss'
})
export class WeaponSearchDialogComponent {

}
