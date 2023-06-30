

export interface IItemDTO {
    name?: string;
    quantity?: number;
    price?: number;
}

export class ItemDTO  implements IItemDTO {
    name?: string;
    quantity?: number;
    price?: number;
    constructor(model?: IItemDTO) {
        
        if (model) {
            this.name =  model.name;
            this.quantity =  model.quantity;
            this.price =  model.price;
        }
    }
}

export type ItemInputFields = { [key in keyof IItemDTO]: any };
export type ItemFields = keyof IItemDTO;

export const itemDTOFieldsList: ItemInputFields = {
    name: 'name',
    quantity: 'quantity',
    price: 'price',
}