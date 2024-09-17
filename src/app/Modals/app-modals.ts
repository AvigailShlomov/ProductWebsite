
export enum Category {
    Electronics,
    Food,
    Pictures
}

export enum Freshness {
    New,
    Seconed_Hand,
    Reforbished
}
export interface DropDownStruct {
    value: string;
    viewValue: string;
  }

export interface Product {
    id: string,
    productName: string
    category: string,
    freshness: string,
    price: number,
    date: string,
    comment: string,
}