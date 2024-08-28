import { CartItem } from '../types/cartitem'


export interface Order {

    _id?:string;
    items:CartItem[];
    paymentType:String;
    address:any;
    date: Date;
    // total: number;
    status?:string;
    // address1: string;
    // address2: string;
    // pincode: number;
    // city: string;

}