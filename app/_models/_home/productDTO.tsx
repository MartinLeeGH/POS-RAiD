export class ProductDTO {
    id : number;
    name : string;
    quantity : number;
    price : number;
    isSelected? : boolean = false;

    constructor(id : number, name : string, quantity : number, price : number) {
        this.id = id;
        this.name = name;
        this.quantity = quantity;
        this.price = price;
    }
}