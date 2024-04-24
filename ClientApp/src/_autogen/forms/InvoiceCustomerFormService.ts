
import { Injectable } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { InvoiceCustomerBM, IInvoiceCustomerBM } from '../models/InvoiceCustomerBM';

@Injectable({ providedIn: 'root' })
export class InvoiceCustomerFormService {

    constructor(private _formBuilder: UntypedFormBuilder) {}
    public getForm() {
        const formGroup = this._formBuilder.group({
            customerId: ['', []],
            name: ['', []],
            address: ['', []],
        });
        setTimeout(() => {
            formGroup.markAsPristine();
            formGroup.markAsUntouched();
        }, 1)
        return formGroup;
    }

    public patchValues(form: UntypedFormGroup, model: IInvoiceCustomerBM | any, options: { emitEvent: boolean } = { emitEvent: true }) {

        form.patchValue(model, options);
        setTimeout(() => {
            form.markAsPristine();
            form.markAsUntouched();
        }, 1)
    }
}