import { Product } from "./product";

export interface CartItem{
// SellingPrice( arg1: Product):unknown ;
    product:Product;
    quantity:number;
}