import { AbstractControl, FormControl } from '@angular/forms';
import { ItemBM, IItemBM, IItemBMForm } from './ItemBM';
import { Status } from './Status';

export interface IInvoiceDTO {
    id: string | null;
    number: number;
    name: string | null;
    invoiceCustomerId: string;
    invoiceCustomerName: string;
    invoiceCustomerAddress: string;
    items: ItemBM[] | null;
    status: Status;
}

export interface IInvoiceDTOForm {
    id: AbstractControl<string | null>;
    number: AbstractControl<number>;
    name: AbstractControl<string | null>;
    invoiceCustomerId: AbstractControl<string>;
    invoiceCustomerName: AbstractControl<string>;
    invoiceCustomerAddress: AbstractControl<string>;
    items: AbstractControl<ItemBM[] | null>;
    status: AbstractControl<Status>;
}

export class InvoiceDTO  implements IInvoiceDTO {
    id!: string | null;
    number!: number;
    name!: string | null;
    invoiceCustomerId!: string;
    invoiceCustomerName!: string;
    invoiceCustomerAddress!: string;
    items!: ItemBM[] | null;
    status!: Status;
    constructor(model?: IInvoiceDTO) {
        
        if (model) {
            this.id =  model.id;
            this.number =  model.number;
            this.name =  model.name;
            this.invoiceCustomerId =  model.invoiceCustomerId;
            this.invoiceCustomerName =  model.invoiceCustomerName;
            this.invoiceCustomerAddress =  model.invoiceCustomerAddress;
            this.items =  model.items;
            this.status =  model.status;
        }
    }
}

export type InvoiceInputFields = { [key in keyof IInvoiceDTO]?: any };
export type InvoiceFields = keyof IInvoiceDTO;
export const invoiceDTOProperties = ["id", "number", "name", "invoiceCustomerId", "invoiceCustomerName", "invoiceCustomerAddress", "items", "status"];