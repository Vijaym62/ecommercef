import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Product } from '../types/product';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  constructor() { }
http=inject(HttpClient)

wishlists:Product[]=[];
init(){
  return this.getWishlists().subscribe((result)=>{
this.wishlists=result;
     })
}
  getWishlists(){
    return this.http.get<Product[]>(environment.apiUrl +'/customer/wishlists' )
  }
  
  addInWishlist(productId:string){
    return this.http.post(environment.apiUrl +'/customer/wishlists/' +productId,{ } )
  }
  
  removefromtWishlists(productId:string){
    return this.http.delete<Product[]>(environment.apiUrl +'/customer/wishlists/'+productId )
  }
  
}
