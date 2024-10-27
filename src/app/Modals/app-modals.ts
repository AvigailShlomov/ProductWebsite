export interface DropDownStruct {
    value: string;
    viewValue: string;
  }

export interface Product {
    id: number,
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

export const PRODUCT_HEADLINE = {
    PRODUCT_NAME: "productName",
    CATEGORY: "category",
    FRESHNESS: "freshness",
    PRICE: "price",
    DATE: "date",
    COMMENT: "comment",
    ACTIONS: "actions",
  };
  
  export const GUI_MESSAGES = {
    SUCCESS: "Success !!",
    DATA_SAVED_SUCCESS: "Data has been successfully saved!",
    DATA_DELETED_SUCCESS: "Product deleted Sucsesfuly",
   
    DATA_DELETED_FAIL: "Error while deleting product. Please try again later.",
    DATA_RECEIVED_FAIL: "Error while fetching products. Please try again later.",
    NOT_FOUND: "Resource not found.",
    SERVER_ERROR: "Server Error !!",
  };