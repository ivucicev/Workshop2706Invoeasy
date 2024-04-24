import { AbstractControl, FormControl } from '@angular/forms';

export interface IInvoiceCustomerBM {
    customerId: string | null;
    name: string | null;
    address: string | null;
}

export interface IInvoiceCustomerBMForm {
    customerId: AbstractControl<string | null>;
    name: AbstractControl<string | null>;
    address: AbstractControl<string | null>;
}

export class InvoiceCustomerBM  implements IInvoiceCustomerBM {
    customerId!: string | null;
    name!: string | null;
    address!: string | null;
    constructor(model?: IInvoiceCustomerBM) {
        
        if (model) {
            this.customerId =  model.customerId;
            this.name =  model.name;
            this.address =  model.address;
        }
    }
}

export type InvoiceCustomerInputFields = { [key in keyof IInvoiceCustomerBM]?: any };
export type InvoiceCustomerFields = keyof IInvoiceCustomerBM;
export const invoiceCustomerBMProperties = ["customerId", "name", "address"];