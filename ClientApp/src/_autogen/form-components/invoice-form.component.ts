

import { DxDropDownBoxComponent, DxLookupComponent, DxSelectBoxComponent, DxTagBoxComponent } from 'devextreme-angular';
import DataSource from 'devextreme/data/data_source';
import ArrayStore from 'devextreme/data/array_store';
import { Component, OnInit, OnDestroy, Input, EventEmitter, Output, ViewChildren, QueryList } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { InvoiceFormService } from '../forms/InvoiceFormService';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { InvoiceService } from '../services/InvoiceService';
import CustomStore from 'devextreme/data/custom_store';
import { InvoiceFields, InvoiceInputFields } from '@models/InvoiceBM';

@Component({
    selector: 'invoeasy-invoice-form',
    template: `
        <form [formGroup]="form" (ngSubmit)="submit()">
            <div class="row">
                <div *ngIf="!hide?.number" [ngClass]="{ 'col-md-12': !configuration.number, 'col-md-6': configuration.number == 6, 'col-md-3': configuration.number == 3, 'col-md-4': configuration.number == 4 }">
                    <div class="mb-3">
                        <label for="number" translate>BM.Number</label>
                        <input type="number" class="form-control" id="number" formControlName="number" [ngClass]="{ 'is-invalid': (submitted || f.number.touched) && f.number.errors }">
                        <div *ngIf="(submitted || f.number.touched)" class="invalid-feedback">
                            <span *ngIf="f.number.errors && f.number.errors.required" translate>Errors.Required</span>
                            <span *ngIf="f.number.errors && f.number.errors.maxlength" translate>Errors.TooLong</span>
                            <span *ngIf="f.number.errors && f.number.errors.minlength" translate>Errors.TooShort</span>
                        </div>
                    </div>
                </div>
                <div *ngIf="!hide?.name" [ngClass]="{ 'col-md-12': !configuration.name, 'col-md-6': configuration.name == 6, 'col-md-3': configuration.name == 3, 'col-md-4': configuration.name == 4 }">
                    <div class="mb-3">
                        <label for="name" translate>BM.Name</label>
                         <input type="text" class="form-control" id="name" formControlName="name" [ngClass]="{ 'is-invalid': (submitted || f.name.touched) && f.name.errors }">
                        <div *ngIf="(submitted || f.name.touched)" class="invalid-feedback">
                            <span *ngIf="f.name.errors && f.name.errors.required" translate>Errors.Required</span>
                            <span *ngIf="f.name.errors && f.name.errors.maxlength" translate>Errors.TooLong</span>
                            <span *ngIf="f.name.errors && f.name.errors.minlength" translate>Errors.TooShort</span>
                        </div>
                    </div>
                </div>
                <div *ngIf="!hide?.description" [ngClass]="{ 'col-md-12': !configuration.description, 'col-md-6': configuration.description == 6, 'col-md-3': configuration.description == 3, 'col-md-4': configuration.description == 4 }">
                    <div class="mb-3">
                        <label for="description" translate>BM.Description</label>
                         <textarea type="text" class="form-control" id="description" formControlName="description" [ngClass]="{ 'is-invalid': (submitted || f.description.touched) && f.description.errors }"></textarea>
                        <div *ngIf="(submitted || f.description.touched)" class="invalid-feedback">
                            <span *ngIf="f.description.errors && f.description.errors.required" translate>Errors.Required</span>
                            <span *ngIf="f.description.errors && f.description.errors.maxlength" translate>Errors.TooLong</span>
                            <span *ngIf="f.description.errors && f.description.errors.minlength" translate>Errors.TooShort</span>
                        </div>
                    </div>
                </div>
                <div *ngIf="!hide?.totalPrice" [ngClass]="{ 'col-md-12': !configuration.totalPrice, 'col-md-6': configuration.totalPrice == 6, 'col-md-3': configuration.totalPrice == 3, 'col-md-4': configuration.totalPrice == 4 }">
                    <div class="mb-3">
                        <label for="totalPrice" translate>BM.TotalPrice</label>
                        <dx-number-box format="$ #,##0.##" [min]="0" class="form-control" id="totalPrice" formControlName="totalPrice" [ngClass]="{ 'is-invalid': (submitted || f.totalPrice.touched) && f.totalPrice.errors }"
                          [showSpinButtons]="true"
                          [showClearButton]="true"></dx-number-box>
                        <div *ngIf="(submitted || f.totalPrice.touched)" class="invalid-feedback">
                            <span *ngIf="f.totalPrice.errors && f.totalPrice.errors.required" translate>Errors.Required</span>
                            <span *ngIf="f.totalPrice.errors && f.totalPrice.errors.maxlength" translate>Errors.TooLong</span>
                            <span *ngIf="f.totalPrice.errors && f.totalPrice.errors.minlength" translate>Errors.TooShort</span>
                        </div>
                    </div>
                </div>
                <div *ngIf="!hide?.sendEmail" [ngClass]="{ 'col-md-12': !configuration.sendEmail, 'col-md-6': configuration.sendEmail == 6, 'col-md-3': configuration.sendEmail == 3, 'col-md-4': configuration.sendEmail == 4 }">
                    <div class="form-check mb-3">
                        <input class="form-check-input" type="checkbox" formControlName="sendEmail" id="sendEmail">
                        <label class="form-check-label" for="sendEmail" translate>BM.SendEmail</label>
                        <div *ngIf="(submitted || f.sendEmail.touched)" class="invalid-feedback">
                            <span *ngIf="f.sendEmail.errors && f.sendEmail.errors.required" translate>Errors.Required</span>
                            <span *ngIf="f.sendEmail.errors && f.sendEmail.errors.maxlength" translate>Errors.TooLong</span>
                            <span *ngIf="f.sendEmail.errors && f.sendEmail.errors.minlength" translate>Errors.TooShort</span>
                        </div>
                    </div>
                </div>
                <div *ngIf="!hide?.status" [ngClass]="{ 'col-md-12': !configuration.status, 'col-md-6': configuration.status == 6, 'col-md-3': configuration.status == 3, 'col-md-4': configuration.status == 4 }">
                    <div class="mb-3">
                        <label for="status" translate>BM.Status</label>
                        <select name="status" formControlName="status" id="status" class="form-select">
                            <option selected></option>
                            <option [ngValue]="1">NEW</option>
                            <option [ngValue]="2">PROCESSING</option>
                            <option [ngValue]="3">PROCESSED</option>
                            <option [ngValue]="4">DELETED</option>
                        </select>
                        <div *ngIf="(submitted || f.status.touched)" class="invalid-feedback">
                            <span *ngIf="f.status.errors && f.status.errors.required" translate>Errors.Required</span>
                            <span *ngIf="f.status.errors && f.status.errors.maxlength" translate>Errors.TooLong</span>
                            <span *ngIf="f.status.errors && f.status.errors.minlength" translate>Errors.TooShort</span>
                        </div>
                    </div>
                </div>
                <div *ngIf="!hide?.created" [ngClass]="{ 'col-md-12': !configuration.created, 'col-md-6': configuration.created == 6, 'col-md-3': configuration.created == 3, 'col-md-4': configuration.created == 4 }">
                    <div class="mb-3">
                        <label for="created" translate>BM.Created</label>
                        <dx-date-box class="form-control date-box" id="created" formControlName="created" [ngClass]="{ 'is-invalid': (submitted || f.created.touched) && f.created.errors }" type="datetime"> </dx-date-box>
                        <div *ngIf="(submitted || f.created.touched)" class="invalid-feedback">
                            <span *ngIf="f.created.errors && f.created.errors.required" translate>Errors.Required</span>
                            <span *ngIf="f.created.errors && f.created.errors.maxlength" translate>Errors.TooLong</span>
                            <span *ngIf="f.created.errors && f.created.errors.minlength" translate>Errors.TooShort</span>
                        </div>
                    </div>
                </div>
                <div *ngIf="!hide?.time" [ngClass]="{ 'col-md-12': !configuration.time, 'col-md-6': configuration.time == 6, 'col-md-3': configuration.time == 3, 'col-md-4': configuration.time == 4 }">
                    <div class="mb-3">
                        <label for="time" translate>BM.Time</label>
                        <dx-date-box class="form-control date-box" id="time" type="time" formControlName="time" [ngClass]="{ 'is-invalid': (submitted || f.time.touched) && f.time.errors }"> </dx-date-box>
                        <div *ngIf="(submitted || f.time.touched)" class="invalid-feedback">
                            <span *ngIf="f.time.errors && f.time.errors.required" translate>Errors.Required</span>
                            <span *ngIf="f.time.errors && f.time.errors.maxlength" translate>Errors.TooLong</span>
                            <span *ngIf="f.time.errors && f.time.errors.minlength" translate>Errors.TooShort</span>
                        </div>
                    </div>
                </div>
                <div *ngIf="!hide?.customerId" [ngClass]="{ 'col-md-12': !configuration.customerId, 'col-md-6': configuration.customerId == 6, 'col-md-3': configuration.customerId == 3, 'col-md-4': configuration.customerId == 4 }">
                    <div class="mb-3">
                    DropdownBox
                        <label for="customerId" translate>BM.CustomerId</label>
                        <dx-drop-down-box name="customerId" formControlName="customerId" id="customerId" class="form-select"
                          valueExpr="id"
                          displayExpr="name"
                          placeholder="Select a value..."
                          [showClearButton]="true"
                          [dataSource]="[]"
                        >
                        <div *dxTemplate="let data of 'content'">
                              <dx-data-grid
                                [dataSource]="[]"
                                [selection]="{ mode: 'multiple' }"
                                [hoverStateEnabled]="true"
                                [paging]="{ enabled: true, pageSize: 10 }"
                                [filterRow]="{ visible: true }"
                                [scrolling]="{ mode: 'virtual' }"></dx-data-grid>
                        </div>
                        </dx-drop-down-box>
                        <div *ngIf="(submitted || f.customerId.touched)" class="invalid-feedback">
                            <span *ngIf="f.customerId.errors && f.customerId.errors.required" translate>Errors.Required</span>
                            <span *ngIf="f.customerId.errors && f.customerId.errors.maxlength" translate>Errors.TooLong</span>
                            <span *ngIf="f.customerId.errors && f.customerId.errors.minlength" translate>Errors.TooShort</span>
                        </div>
                    </div>
                </div>
                <div *ngIf="!hide?.supplierId" [ngClass]="{ 'col-md-12': !configuration.supplierId, 'col-md-6': configuration.supplierId == 6, 'col-md-3': configuration.supplierId == 3, 'col-md-4': configuration.supplierId == 4 }">
                    <div class="mb-3">
                    LookupBox
                        <label for="supplierId" translate>BM.SupplierId</label>
                        <dx-lookup name="supplierId" formControlName="supplierId" id="supplierId" class="form-select"
                            displayExpr="name"
                            [dataSource]="[]"
                          ></dx-lookup>
                        <div *ngIf="(submitted || f.supplierId.touched)" class="invalid-feedback">
                            <span *ngIf="f.supplierId.errors && f.supplierId.errors.required" translate>Errors.Required</span>
                            <span *ngIf="f.supplierId.errors && f.supplierId.errors.maxlength" translate>Errors.TooLong</span>
                            <span *ngIf="f.supplierId.errors && f.supplierId.errors.minlength" translate>Errors.TooShort</span>
                        </div>
                    </div>
                </div>
                <div *ngIf="!hide?.manufacturerId" [ngClass]="{ 'col-md-12': !configuration.manufacturerId, 'col-md-6': configuration.manufacturerId == 6, 'col-md-3': configuration.manufacturerId == 3, 'col-md-4': configuration.manufacturerId == 4 }">
                    <div class="mb-3">
                    SelectBox
                        <label for="manufacturerId" translate>BM.ManufacturerId</label>
                        <dx-select-box name="manufacturerId" formControlName="manufacturerId" id="manufacturerId" class="form-select"
                            [dataSource]="[]"
                            displayExpr="name"
                            valueExpr="id"
                            [searchMode]="'contains'"
                            [searchExpr]="'name'"
                            [searchTimeout]="750"
                            [minSearchLength]="0"
                            [searchEnabled]="true"
                          ></dx-select-box>
                        <div *ngIf="(submitted || f.manufacturerId.touched)" class="invalid-feedback">
                            <span *ngIf="f.manufacturerId.errors && f.manufacturerId.errors.required" translate>Errors.Required</span>
                            <span *ngIf="f.manufacturerId.errors && f.manufacturerId.errors.maxlength" translate>Errors.TooLong</span>
                            <span *ngIf="f.manufacturerId.errors && f.manufacturerId.errors.minlength" translate>Errors.TooShort</span>
                        </div>
                    </div>
                </div>
                <div *ngIf="!hide?.selectedItems" [ngClass]="{ 'col-md-12': !configuration.selectedItems, 'col-md-6': configuration.selectedItems == 6, 'col-md-3': configuration.selectedItems == 3, 'col-md-4': configuration.selectedItems == 4 }">
                    <div class="mb-3">
                    TagBox
                        <label for="selectedItems" translate>BM.SelectedItems</label>
                        <dx-tag-box name="selectedItems" formControlName="selectedItems" id="selectedItems" class="form-select"
                            [dataSource]="[]"
                            displayExpr="name"
                            valueExpr="id"
                            [searchMode]="'contains'"
                            [searchExpr]="'name'"
                            [searchTimeout]="750"
                            [minSearchLength]="0"
                            [searchEnabled]="true"
                            [hideSelectedItems]="true"
                          ></dx-tag-box>
                        <div *ngIf="(submitted || f.selectedItems.touched)" class="invalid-feedback">
                            <span *ngIf="f.selectedItems.errors && f.selectedItems.errors.required" translate>Errors.Required</span>
                            <span *ngIf="f.selectedItems.errors && f.selectedItems.errors.maxlength" translate>Errors.TooLong</span>
                            <span *ngIf="f.selectedItems.errors && f.selectedItems.errors.minlength" translate>Errors.TooShort</span>
                        </div>
                    </div>
                </div>
                <div *ngIf="!hide?.invoiceCustomer" [ngClass]="{ 'col-md-12': !configuration.invoiceCustomer, 'col-md-6': configuration.invoiceCustomer == 6, 'col-md-3': configuration.invoiceCustomer == 3, 'col-md-4': configuration.invoiceCustomer == 4 }">
                    <div class="mb-3">
                        <div *ngIf="(submitted || f.invoiceCustomer.touched)" class="invalid-feedback">
                            <span *ngIf="f.invoiceCustomer.errors && f.invoiceCustomer.errors.required" translate>Errors.Required</span>
                            <span *ngIf="f.invoiceCustomer.errors && f.invoiceCustomer.errors.maxlength" translate>Errors.TooLong</span>
                            <span *ngIf="f.invoiceCustomer.errors && f.invoiceCustomer.errors.minlength" translate>Errors.TooShort</span>
                        </div>
                    </div>
                </div>
                <div *ngIf="!hide?.items" [ngClass]="{ 'col-md-12': !configuration.items, 'col-md-6': configuration.items == 6, 'col-md-3': configuration.items == 3, 'col-md-4': configuration.items == 4 }">
                    <div class="mb-3">
                        <div *ngIf="(submitted || f.items.touched)" class="invalid-feedback">
                            <span *ngIf="f.items.errors && f.items.errors.required" translate>Errors.Required</span>
                            <span *ngIf="f.items.errors && f.items.errors.maxlength" translate>Errors.TooLong</span>
                            <span *ngIf="f.items.errors && f.items.errors.minlength" translate>Errors.TooShort</span>
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
export class InvoiceFormComponent implements OnInit, OnDestroy {

    private _unsubscribeAll = new Subject();

    public enableDebug = false;
    public submitted: boolean = false;
    public formControlKeys: any = [];
    public submitDisabled = false;

    @Input()
    public form: FormGroup;

    @Input()
    public hide: InvoiceInputFields = {};

    @Input()
    public disable: InvoiceInputFields = {};

    @Input()
    public configuration: InvoiceInputFields = {};

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

    constructor(private formService: InvoiceFormService) {
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

    public setControlAsRequired(controlName: InvoiceFields) {
        this.f[controlName].addValidators(Validators.required);
        this.f[controlName].updateValueAndValidity();
    }

    public setControlAsOptional(controlName: InvoiceFields) {
        this.f[controlName].removeValidators(Validators.required);
        this.f[controlName].updateValueAndValidity();
    }

    public disableControl = (controlName: InvoiceFields) => this.f[controlName].disable();

    public enableControl = (controlName: InvoiceFields) => this.f[controlName].enable();

    public hideControl = (controlName: InvoiceFields) => this.hide[controlName] = true;

    public showControl = (controlName: InvoiceFields) => this.hide[controlName] = undefined;

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