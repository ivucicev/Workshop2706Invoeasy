
import { InvoiceCustomerDTO?, IInvoiceCustomerDTO? } from '@models/InvoiceCustomerDTO?';
import { ItemDTO, IItemDTO } from '@models/ItemDTO';

export interface IInvoiceBM {
    number?: number;
    name?: string | null;
    invoiceCustomer?: InvoiceCustomerDTO | null;
    items?: ItemDTO[] | null;
}

export class InvoiceBM  implements IInvoiceBM {
    number?: number;
    name?: string | null;
    invoiceCustomer?: InvoiceCustomerDTO | null;
    items?: ItemDTO[] | null;
    constructor(model?: IInvoiceBM) {
        
        if (model) {
            this.number =  model.number;
            this.name =  model.name;
            this.invoiceCustomer =  model.invoiceCustomer;
            this.items =  model.items;
        }
    }
}

export type InvoiceInputFields = { [key in keyof IInvoiceBM]: any };
export type InvoiceFields = keyof IInvoiceBM;

export const invoiceBMFieldsList: InvoiceInputFields = {
    number: 'number',
    name: 'name',
    invoiceCustomer: 'invoiceCustomer',
    items: 'items',
}