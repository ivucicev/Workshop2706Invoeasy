

import { DxDropDownBoxComponent, DxLookupComponent, DxSelectBoxComponent, DxTagBoxComponent } from 'devextreme-angular';
import DataSource from 'devextreme/data/data_source';
import ArrayStore from 'devextreme/data/array_store';
import { Component, OnInit, OnDestroy, Input, EventEmitter, Output, ViewChildren, QueryList } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { InvoiceCustomerFormService } from '../forms/InvoiceCustomerFormService';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { InvoiceService } from '../services/InvoiceService';
import CustomStore from 'devextreme/data/custom_store';
import { InvoiceCustomerFields, InvoiceCustomerInputFields } from '@models/InvoiceCustomerBM';

@Component({
    selector: 'invoeasy-invoicecustomer-form',
    template: `
        <form [formGroup]="form" (ngSubmit)="submit()">
            <div class="row">
                <div *ngIf="!hide?.customerId" [ngClass]="{ 'col-md-12': !configuration.customerId, 'col-md-6': configuration.customerId == 6, 'col-md-3': configuration.customerId == 3, 'col-md-4': configuration.customerId == 4 }">
                </div>
                <div *ngIf="!hide?.name" [ngClass]="{ 'col-md-12': !configuration.name, 'col-md-6': configuration.name == 6, 'col-md-3': configuration.name == 3, 'col-md-4': configuration.name == 4 }">
                    <div class="mb-3">
                        <div *ngIf="(submitted || f.name.touched)" class="invalid-feedback">
                            <span *ngIf="f.name.errors && f.name.errors.required" translate>Errors.Required</span>
                            <span *ngIf="f.name.errors && f.name.errors.maxlength" translate>Errors.TooLong</span>
                            <span *ngIf="f.name.errors && f.name.errors.minlength" translate>Errors.TooShort</span>
                        </div>
                    </div>
                </div>
                <div *ngIf="!hide?.address" [ngClass]="{ 'col-md-12': !configuration.address, 'col-md-6': configuration.address == 6, 'col-md-3': configuration.address == 3, 'col-md-4': configuration.address == 4 }">
                    <div class="mb-3">
                        <div *ngIf="(submitted || f.address.touched)" class="invalid-feedback">
                            <span *ngIf="f.address.errors && f.address.errors.required" translate>Errors.Required</span>
                            <span *ngIf="f.address.errors && f.address.errors.maxlength" translate>Errors.TooLong</span>
                            <span *ngIf="f.address.errors && f.address.errors.minlength" translate>Errors.TooShort</span>
                        </div>
                    </div>
                </div>
                <div class="d-grid gap-2 d-md-flex justify-content-md-end" *ngIf="showSubmitButton">
                    <button class="btn btn-danger" type="button" (click)="enableDebug = !enableDebug"><i class="bx bx-bug"></i>Debug Form</button>
                    <button *ngIf="showCancelButton" (click)="cancel()" class="btn btn-secondary" type="button">{{ 'Buttons.Cancel' | translate }}</button>
                    <button *ngIf="showDeleteButton" (click)="delete()" class="btn btn-danger" type="button">{{ 'Buttons.Delete' | translate }}</button>
                    <button class="btn btn-primary" type="submit" [disabled]="form.invalid || submitDisabled">{{ submitButton | translate }}</button>
                </div>
            </div>
        </form>
        <ng-container *ngIf="enableDebug">
            <pre>
                {{ this.form.value | json }}
            </pre>
            <h6>
            Form invalid: {{this.form.invalid}}, Form pristine: {{this.form.pristine}}, Form touched: {{this.form.touched}}
            </h6>
            <ng-container *ngIf="this.form.invalid">
                <h6>Form Errors:</h6>
                <span *ngFor="let control of formControlKeys">
                    {{control}}: {{ this.form.controls[control].errors | json }} <br/>
                </span>
            </ng-container>
        </ng-container>
    `
})
export class InvoiceCustomerFormComponent implements OnInit, OnDestroy {

    private _unsubscribeAll = new Subject();

    public enableDebug = false;
    public submitted: boolean = false;
    public formControlKeys: any = [];
    public submitDisabled = false;

    @Input()
    public form: FormGroup;

    @Input()
    public hide: InvoiceCustomerInputFields = {};

    @Input()
    public disable: InvoiceCustomerInputFields = {};

    @Input()
    public configuration: InvoiceCustomerInputFields = {};

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

    constructor(private formService: InvoiceCustomerFormService) {
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

    public setControlAsRequired(controlName: InvoiceCustomerFields) {
        this.f[controlName].addValidators(Validators.required);
        this.f[controlName].updateValueAndValidity();
    }

    public setControlAsOptional(controlName: InvoiceCustomerFields) {
        this.f[controlName].removeValidators(Validators.required);
        this.f[controlName].updateValueAndValidity();
    }

    public disableControl = (controlName: InvoiceCustomerFields) => this.f[controlName].disable();

    public enableControl = (controlName: InvoiceCustomerFields) => this.f[controlName].enable();

    public hideControl = (controlName: InvoiceCustomerFields) => this.hide[controlName] = true;

    public showControl = (controlName: InvoiceCustomerFields) => this.hide[controlName] = undefined;

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