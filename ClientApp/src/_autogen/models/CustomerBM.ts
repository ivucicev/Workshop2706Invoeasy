import { AbstractControl, FormControl } from '@angular/forms';

export interface ICustomerBM {
    id: string | null;
    name: string;
    address: string | null;
}

export interface ICustomerBMForm {
    id: AbstractControl<string | null>;
    name: AbstractControl<string>;
    address: AbstractControl<string | null>;
}

export class CustomerBM  implements ICustomerBM {
    id!: string | null;
    name!: string;
    address!: string | null;
    constructor(model?: ICustomerBM) {
        
        if (model) {
            this.id =  model.id;
            this.name =  model.name;
            this.address =  model.address;
        }
    }
}

export type CustomerInputFields = { [key in keyof ICustomerBM]?: any };
export type CustomerFields = keyof ICustomerBM;
export const customerBMProperties = ["id", "name", "address"];