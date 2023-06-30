

export interface ICustomerDTO {
    id?: string | null;
    name?: string;
    address?: string | null;
}

export class CustomerDTO  implements ICustomerDTO {
    id?: string | null;
    name?: string;
    address?: string | null;
    constructor(model?: ICustomerDTO) {
        
        if (model) {
            this.id =  model.id;
            this.name =  model.name;
            this.address =  model.address;
        }
    }
}

export type CustomerInputFields = { [key in keyof ICustomerDTO]: any };
export type CustomerFields = keyof ICustomerDTO;

export const customerDTOFieldsList: CustomerInputFields = {
    id: 'id',
    name: 'name',
    address: 'address',
}