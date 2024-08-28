export interface Product{
   _id?:string,
    name: string,
    shortdiscription: string,
    discription: string,
    price: Number,
    discount: Number,
    images:string[],
    categoryId: string,
    isFeatured:boolean,
    isNew:boolean
 
}