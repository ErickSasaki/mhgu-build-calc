import { CommonModule } from '@angular/common';
import { Component, Input, Optional, Self, ViewChild } from '@angular/core';
import { ControlValueAccessor, DefaultValueAccessor, FormControl, FormGroup, FormGroupDirective, FormsModule, NG_VALUE_ACCESSOR, NgControl, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'mhgu-input',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './input.component.html',
    styleUrl: './input.component.scss',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useClass: DefaultValueAccessor,
        multi: true
    }],
})
export class InputComponent {
    @Input() formControlName!: string;
    @Input() readonly = false;
    @Input() placeholder: string = '';
    @Input() label?: string;

    public formGroup!: FormGroup;

    constructor(@Optional() private formGroupDirective: FormGroupDirective) { }

    ngOnInit() {
        this.formGroup = this.formGroupDirective?.control;
    }
}
