import { AbstractControl, FormControl } from '@angular/forms';
import { Status } from './Status';
import { InvoiceCustomerBM, IInvoiceCustomerBM, IInvoiceCustomerBMForm } from './InvoiceCustomerBM';
import { ItemBM, IItemBM, IItemBMForm } from './ItemBM';

export interface IInvoiceBM {
    number: number;
    name: string;
    description: string;
    totalPrice: number;
    sendEmail: boolean;
    status: Status;
    created: Date;
    time: string;
    customerId: string;
    supplierId: string;
    manufacturerId: string;
    selectedItems: string[];
    invoiceCustomer: InvoiceCustomerBM;
    items: ItemBM[];
}

export interface IInvoiceBMForm {
    number: AbstractControl<number>;
    name: AbstractControl<string>;
    description: AbstractControl<string>;
    totalPrice: AbstractControl<number>;
    sendEmail: AbstractControl<boolean>;
    status: AbstractControl<Status>;
    created: AbstractControl<Date>;
    time: AbstractControl<string>;
    customerId: AbstractControl<string>;
    supplierId: AbstractControl<string>;
    manufacturerId: AbstractControl<string>;
    selectedItems: AbstractControl<string[]>;
    invoiceCustomer: AbstractControl<InvoiceCustomerBM>;
    items: AbstractControl<ItemBM[]>;
}

export class InvoiceBM  implements IInvoiceBM {
    number!: number;
    name!: string;
    description!: string;
    totalPrice!: number;
    sendEmail!: boolean;
    status!: Status;
    created!: Date;
    time!: string;
    customerId!: string;
    supplierId!: string;
    manufacturerId!: string;
    selectedItems!: string[];
    invoiceCustomer!: InvoiceCustomerBM;
    items!: ItemBM[];
    constructor(model?: IInvoiceBM) {
        
        if (model) {
            this.number =  model.number;
            this.name =  model.name;
            this.description =  model.description;
            this.totalPrice =  model.totalPrice;
            this.sendEmail =  model.sendEmail;
            this.status =  model.status;
            this.created =  model.created;
            this.time =  model.time;
            this.customerId =  model.customerId;
            this.supplierId =  model.supplierId;
            this.manufacturerId =  model.manufacturerId;
            this.selectedItems =  model.selectedItems;
            this.invoiceCustomer =  model.invoiceCustomer;
            this.items =  model.items;
        }
    }
}

export type InvoiceInputFields = { [key in keyof IInvoiceBM]?: any };
export type InvoiceFields = keyof IInvoiceBM;
export const invoiceBMProperties = ["number", "name", "description", "totalPrice", "sendEmail", "status", "created", "time", "customerId", "supplierId", "manufacturerId", "selectedItems", "invoiceCustomer", "items"];