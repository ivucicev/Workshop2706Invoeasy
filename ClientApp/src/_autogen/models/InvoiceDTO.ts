
import { ItemDTO, IItemDTO } from '@models/ItemDTO';
import { Status } from '@models/Status';

export interface IInvoiceDTO {
    id?: string | null;
    number?: number;
    name?: string | null;
    invoiceCustomerId?: string;
    invoiceCustomerName?: string;
    invoiceCustomerAddress?: string;
    items?: ItemDTO[] | null;
    status?: Status;
}

export class InvoiceDTO  implements IInvoiceDTO {
    id?: string | null;
    number?: number;
    name?: string | null;
    invoiceCustomerId?: string;
    invoiceCustomerName?: string;
    invoiceCustomerAddress?: string;
    items?: ItemDTO[] | null;
    status?: Status;
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

export type InvoiceInputFields = { [key in keyof IInvoiceDTO]: any };
export type InvoiceFields = keyof IInvoiceDTO;

export const invoiceDTOFieldsList: InvoiceInputFields = {
    id: 'id',
    number: 'number',
    name: 'name',
    invoiceCustomerId: 'invoiceCustomerId',
    invoiceCustomerName: 'invoiceCustomerName',
    invoiceCustomerAddress: 'invoiceCustomerAddress',
    items: 'items',
    status: 'status',
}