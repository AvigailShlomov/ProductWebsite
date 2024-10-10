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

export class Freshness{
    public static NEW='New';
    public static SECONED_HAND='Seconed Hand';
    public static REFORBISHED='Reforbished';
}

export class Category{
    public static ELECTRONICS='Electronics';
    public static FOOD='Food';
    public static PICTURES='Pictures';
}

export const API_URL="http://localhost:3000/productList/";