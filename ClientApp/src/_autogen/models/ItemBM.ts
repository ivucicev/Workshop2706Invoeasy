import { AbstractControl, FormControl } from '@angular/forms';

export interface IItemBM {
    name: string;
    quantity: number;
    price: number;
}

export interface IItemBMForm {
    name: AbstractControl<string>;
    quantity: AbstractControl<number>;
    price: AbstractControl<number>;
}

export class ItemBM  implements IItemBM {
    name!: string;
    quantity!: number;
    price!: number;
    constructor(model?: IItemBM) {
        
        if (model) {
            this.name =  model.name;
            this.quantity =  model.quantity;
            this.price =  model.price;
        }
    }
}

export type ItemInputFields = { [key in keyof IItemBM]?: any };
export type ItemFields = keyof IItemBM;
export const itemBMProperties = ["name", "quantity", "price"];