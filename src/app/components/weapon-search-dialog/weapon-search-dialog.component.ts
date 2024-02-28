import { Component, Output, EventEmitter, Inject, ElementRef, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { WeaponSearchService } from '../../services/weapon-search.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WeaponModel } from '../../types/weapon-model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { WeaponTypes } from '../../types/weapon-type';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { debounceTime, fromEvent } from 'rxjs';

interface Filters {
    searchName?: string;
    final?: boolean;
}

@Component({
    selector: 'mhgu-weapon-search-dialog',
    standalone: true,
    imports: [MatTableModule, CommonModule, FormsModule, MatProgressSpinnerModule, MatCheckboxModule],
    templateUrl: './weapon-search-dialog.component.html',
    styleUrl: './weapon-search-dialog.component.scss'
})
export class WeaponSearchDialogComponent implements OnInit, AfterViewInit {
    public tableColumns = ['id', 'name', 'type', 'attack', 'affinity'];
    public displayWeapons: WeaponModel[] = [];
    public loading = true;

    private weapons: WeaponModel[] = [];
    private filters: Filters = { final: true };

    @ViewChild('searchNameInput') private searchNameInput: ElementRef<HTMLInputElement> | undefined;

    constructor(
        private weaponSearchService: WeaponSearchService,
        private dialogRef: MatDialogRef<WeaponSearchDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { weaponType: WeaponTypes }
    ) { }

    ngOnInit() {
        this.getWeaponList();
    }

    ngAfterViewInit() {
        this.setInputEvent();
    }

    public handleRowClick(event: WeaponModel) {
        this.dialogRef.close(event);
    }

    public handleSearchNameInputChange(event: Event) {
        const value = (event?.target as HTMLInputElement)?.value || '';
        this.updateSearchNameFilter(value);
    }

    public updateIsFinalFilter(checked: boolean) {
        this.filters.final = checked;
        this.updateFilters();
    }

    private getWeaponList() {
        this.weaponSearchService.searchWeapon({ type: this.data.weaponType })
            .subscribe((response) => {
                this.weapons = response as WeaponModel[];
                this.updateFilters();
                this.loading = false;
            });
    }

    private setInputEvent() {
        const element = this.searchNameInput?.nativeElement;
        const time = 500;

        if (element) {
            fromEvent(element, 'input')
                .pipe(debounceTime(time))
                .subscribe(this.handleSearchNameInputChange.bind(this));
        }
    }

    private updateSearchNameFilter(searchName: string) {
        this.filters.searchName = searchName;
        this.updateFilters();
    }

    private updateFilters() {
        const hasFilters = this.filters.searchName || this.filters.final;

        this.displayWeapons = hasFilters ?
            this.weapons.filter((weapon) => this.weaponMatchFilters(weapon, this.filters)) :
            this.weapons;
    }

    private weaponMatchFilters(weapon: WeaponModel, filters: Filters): boolean {
        const { searchName, final } = filters;
        const lowerCaseWeaponName = weapon.name.toLocaleLowerCase();

        const searchNameFilter = searchName ? lowerCaseWeaponName.includes(searchName) : true;
        const isFinalFilter = final ? weapon.final === true : true;

        return searchNameFilter && isFinalFilter;
    }

}
