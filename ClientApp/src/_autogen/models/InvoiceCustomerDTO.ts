

export interface IInvoiceCustomerDTO {
    customerId?: string | null;
    name?: string | null;
    address?: string | null;
}

export class InvoiceCustomerDTO  implements IInvoiceCustomerDTO {
    customerId?: string | null;
    name?: string | null;
    address?: string | null;
    constructor(model?: IInvoiceCustomerDTO) {
        
        if (model) {
            this.customerId =  model.customerId;
            this.name =  model.name;
            this.address =  model.address;
        }
    }
}

export type InvoiceCustomerInputFields = { [key in keyof IInvoiceCustomerDTO]: any };
export type InvoiceCustomerFields = keyof IInvoiceCustomerDTO;

export const invoiceCustomerDTOFieldsList: InvoiceCustomerInputFields = {
    customerId: 'customerId',
    name: 'name',
    address: 'address',
}