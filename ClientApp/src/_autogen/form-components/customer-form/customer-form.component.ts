

import { DxDropDownBoxComponent, DxLookupComponent, DxSelectBoxComponent, DxTagBoxComponent } from 'devextreme-angular';
import DataSource from 'devextreme/data/data_source';
import ArrayStore from 'devextreme/data/array_store';
import { Component, OnInit, OnDestroy, Input, EventEmitter, Output, ViewChildren, QueryList } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { CustomerFormService } from '../../forms/CustomerFormService';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { InvoiceService } from '../../services/InvoiceService';
import CustomStore from 'devextreme/data/custom_store';
import { CustomerFields, CustomerInputFields } from '@models/CustomerBM';

@Component({
    selector: 'invoeasy-customer-form',
    templateUrl: 'customer-form.component.html'
})
export class CustomerFormComponent implements OnInit, OnDestroy {

    private _unsubscribeAll = new Subject();

    public enableDebug = false;
    public submitted: boolean = false;
    public formControlKeys: any = [];
    public submitDisabled = false;

    @Input()
    public form: FormGroup;

    @Input()
    public hide: CustomerInputFields = {};

    @Input()
    public disable: CustomerInputFields = {};

    @Input()
    public configuration: CustomerInputFields = {};

    @Input()
    public showSubmitButton = true;

    @Input()
    public showCancelButton = true;

    @Input()
    public showDeleteButton = true;

    @Input()
    public submitButton = 'Buttons.Save';

    @Output()
    public onSubmit: EventEmitter<any> = new EventEmitter(true);

    @Output()
    public onDelete: EventEmitter<any> = new EventEmitter(true);

    @Output()
    public onLoaded: EventEmitter<any> = new EventEmitter(true);

    @Output()
    public onCancel: EventEmitter<any> = new EventEmitter(true);

    @ViewChildren(DxTagBoxComponent)
    public tagboxes!: QueryList<DxTagBoxComponent>;

    @ViewChildren(DxSelectBoxComponent)
    public selectboxes!: QueryList<DxSelectBoxComponent>;

    @ViewChildren(DxLookupComponent)
    public lookupboxes!: QueryList<DxLookupComponent>;

    @ViewChildren(DxDropDownBoxComponent)
    public dropdownboxes!: QueryList<DxDropDownBoxComponent>;

    constructor(private formService: CustomerFormService) {
        this.form = formService.getForm();
        this.formControlKeys = Object.keys(this.form.controls);
    }

    get f() { return this.form.controls; }

    private preventImmediateSubmit() {
        this.submitDisabled = true;
        const submitTimeout = setTimeout(() => {
            this.submitDisabled = false;
            clearTimeout(submitTimeout);
        }, 1000);
    }

    public submit() {
        if (this.form.invalid) return;
        this.preventImmediateSubmit();
        this.onSubmit.emit(this.form.getRawValue());
    }

    public patchValues(model: any) {
        this.formService.patchValues(this.form, model);
    }

    public cancel() {
        if (this.onCancel.observers.length == 0)
        {
            window.history.back()
        } else {
            this.onCancel.emit(true);
        }
    }

    public delete() {
        this.onDelete.emit(true);
    }

    public setControlAsRequired(controlName: CustomerFields) {
        this.f[controlName].addValidators(Validators.required);
        this.f[controlName].updateValueAndValidity();
    }

    public setControlAsOptional(controlName: CustomerFields) {
        this.f[controlName].removeValidators(Validators.required);
        this.f[controlName].updateValueAndValidity();
    }

    public disableControl = (controlName: CustomerFields) => this.f[controlName].disable();

    public enableControl = (controlName: CustomerFields) => this.f[controlName].enable();

    public hideControl = (controlName: CustomerFields) => this.hide[controlName] = true;

    public showControl = (controlName: CustomerFields) => this.hide[controlName] = undefined;

    public disableControls() {
        Object.keys(this.disable).forEach((d: any) => {
            this.disableControl(d);
        });
    }

     public getTagBox(id: InvoiceFields): DxTagBoxComponent | null {
        if (!this.tagboxes) return null;
        const box = this.tagboxes.find(d => d.name == id);
        if (box) return box;
        return null;
    }

    public getSelectBox(id: InvoiceFields): DxSelectBoxComponent | null {
        if (!this.selectboxes) return null;
        const box = this.selectboxes.find(d => d.name == id);
        if (box) return box;
        return null;
    }

    public getDropdownBox(id: InvoiceFields): DxDropDownBoxComponent | null {
        if (!this.dropdownboxes) return null;
        const box = this.dropdownboxes.find(d => d.name == id);
        if (box) return box;
        return null;
    }

    public getLookupBox(id: InvoiceFields) {
        if (!this.lookupboxes) return;
        const box = this.lookupboxes.find(d => d.name == id);
        if (box) return box;
        return null;
    }

    public setTagBoxDataSource(controlName: InvoiceFields, ds: CustomStore | ArrayStore | DataSource | any[]) {
        const box = this.getTagBox(controlName);
        if (!box) return;
        box.dataSource = ds;
        box.instance.getDataSource().reload();
    }

    public setSelectBoxDataSource(controlName: InvoiceFields, ds: CustomStore | ArrayStore | DataSource | any[]) {
        const box = this.getSelectBox(controlName);
        if (!box) return;
        box.dataSource = ds;
        box.instance.getDataSource().reload();
    }

    public setDropwdownBoxDataSource(controlName: InvoiceFields, ds: CustomStore | ArrayStore | DataSource | any[]) {
        const box = this.getDropdownBox(controlName);
        if (!box) return;
        box.dataSource = ds;
        box.items = ds as any;
        box.instance.getDataSource().reload();
    }

    public setLookupBoxDataSource(controlName: InvoiceFields, ds: CustomStore | ArrayStore | DataSource | any[]) {
        const box = this.getLookupBox(controlName);
        if (!box) return;
        box.dataSource = ds;
        box.instance.getDataSource().reload();
    }

    ngOnDestroy() {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    ngOnInit() {
        this.onLoaded.emit(true);
        this.disableControls();
    }

}