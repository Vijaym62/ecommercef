import { Component, Inject, inject } from '@angular/core';
import { Order } from '../../types/order';
import { OrderService } from '../../services/order.service';
import { Product } from '../../types/product';
import { DatePipe } from '@angular/common';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-customer-orders',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './customer-orders.component.html',
  styleUrl: './customer-orders.component.scss'
})
export class CustomerOrdersComponent {
orders:Order[]=[]
orderService=inject(OrderService)
  // http=Inject(HttpClient);


// addOrder(order:Order){
//   return this.http.post(environment.apiUrl +'/customer/order',order)
// }



ngOnInit(){
  this.orderService.getCustomerOrders().subscribe((result)=>{
    this.orders=result
    console.log(this.orders)
  })
}

SellingPrice(product:Product){
  var SellingPrice = parseInt(product.price.toString()) -
   (parseInt(product.price.toString()) * (parseInt(product.discount.toString())/ 100) )
    return  Math.round(SellingPrice);
  }



}
