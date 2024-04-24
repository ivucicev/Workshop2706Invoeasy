
import { Injectable } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { CustomerBM, ICustomerBM } from '../models/CustomerBM';

@Injectable({ providedIn: 'root' })
export class CustomerFormService {

    constructor(private _formBuilder: UntypedFormBuilder) {}
    public getForm() {
        const formGroup = this._formBuilder.group({
            id: ['', []],
            name: ['', []],
            address: ['', []],
        });
        setTimeout(() => {
            formGroup.markAsPristine();
            formGroup.markAsUntouched();
        }, 1)
        return formGroup;
    }

    public patchValues(form: UntypedFormGroup, model: ICustomerBM | any, options: { emitEvent: boolean } = { emitEvent: true }) {

        form.patchValue(model, options);
        setTimeout(() => {
            form.markAsPristine();
            form.markAsUntouched();
        }, 1)
    }
}