
import { Injectable } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ItemBM, IItemBM } from '../models/ItemBM';

@Injectable({ providedIn: 'root' })
export class ItemFormService {

    constructor(private _formBuilder: UntypedFormBuilder) {}
    public getForm() {
        const formGroup = this._formBuilder.group({
            name: ['', []],
            quantity: ['', []],
            price: ['', []],
        });
        setTimeout(() => {
            formGroup.markAsPristine();
            formGroup.markAsUntouched();
        }, 1)
        return formGroup;
    }

    public patchValues(form: UntypedFormGroup, model: IItemBM | any, options: { emitEvent: boolean } = { emitEvent: true }) {

        form.patchValue(model, options);
        setTimeout(() => {
            form.markAsPristine();
            form.markAsUntouched();
        }, 1)
    }
}