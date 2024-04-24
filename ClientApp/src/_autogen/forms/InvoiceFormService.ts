
import { Injectable } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { InvoiceBM, IInvoiceBM } from '../models/InvoiceBM';

@Injectable({ providedIn: 'root' })
export class InvoiceFormService {

    constructor(private _formBuilder: UntypedFormBuilder) {}
    public getForm() {
        const formGroup = this._formBuilder.group({
            number: ['', [Validators.required, ]],
            name: ['', [Validators.maxLength(50),]],
            description: ['', [Validators.maxLength(1000),]],
            totalPrice: ['', []],
            sendEmail: [false, []],
            status: ['', []],
            created: [new Date(), []],
            time: ['', []],
            customerId: ['', []],
            supplierId: ['', []],
            manufacturerId: ['', []],
            selectedItems: ['', []],
            invoiceCustomer: ['', []],
            items: ['', []],
        });
        setTimeout(() => {
            formGroup.markAsPristine();
            formGroup.markAsUntouched();
        }, 1)
        return formGroup;
    }

    public patchValues(form: UntypedFormGroup, model: IInvoiceBM | any, options: { emitEvent: boolean } = { emitEvent: true }) {

        form.patchValue(model, options);
        setTimeout(() => {
            form.markAsPristine();
            form.markAsUntouched();
        }, 1)
    }
}