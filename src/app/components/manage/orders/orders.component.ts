import { Component, inject, Pipe } from '@angular/core';
import { OrderService } from '../../../services/order.service';
import { Order } from '../../../types/order';
import { DatePipe } from '@angular/common';
import { Product } from '../../../types/product';
import { MatButtonModule } from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle'

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [DatePipe,MatButtonModule,MatButtonToggleModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent {

  orderService=inject(OrderService);
  orders:Order[]=[];
  ngOnInit(){

    this.orderService.getAdminOrder().subscribe((result)=>{
      this.orders = result;
    })
  }

  // SellingPrice(product:Product){
  //   var SellingPrice = parseInt(product.price.toString()) -
  //    (parseInt(product.price.toString()) * (parseInt(product.discount.toString())/ 100) )
  //     return  Math.round(SellingPrice);
  //   }

  SellingPrice(product: Product): number {
    if (!product || product.price == null || product.discount == null) {
      return 0; // Return a default value if product, price, or discount is invalid
    }
    const price = parseInt(product.price.toString());
    const discount = parseInt(product.discount.toString());
    const sellingPrice = price - (price * (discount / 100));
    return Math.round(sellingPrice);
  }

    statusChanged(button:any,order:Order){
      console.log(button.value)
      this.orderService.updateOrderStatus(order._id!,button.value).subscribe((result)=>{
        alert("Order Status Updated");
      })
    }
}
