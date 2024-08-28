import {  Component, inject, Input } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Product } from '../../types/product';
import { CartItem } from '../../types/cartitem';
import { HttpClient } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import { OrderService } from '../../services/order.service';
import { Order } from '../../types/order';
import { Router } from '@angular/router';


@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [MatButtonModule,ReactiveFormsModule,FormsModule,MatInputModule,MatRadioModule],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.scss'
})
export class ShoppingCartComponent {
cartService=inject(CartService)
// http=inject(HttpClient)
router=inject(Router)
items: CartItem[]=[];
product:Product[]=[];
// @Input() product?:Product;
orderService=inject(OrderService)


images:string[]=[]
// @Input() productId!:Product;
fixedshippingprice= 70;
   
ngOnInit(){
this.cartService.init();
}
get cartItems(){
  return this.cartService.items
}

SellingPrice(product: Product): number {
  if (!product || product.price == null || product.discount == null) {
    return 0; // Return a default value if product, price, or discount is invalid
  }
  const price = parseInt(product.price.toString());
  const discount = parseInt(product.discount.toString());
  const sellingPrice = price - (price * (discount / 100));
  return Math.round(sellingPrice);
}

// addToCart(productId: string | undefined, quantity: number) {
//   if (!productId) {
//     console.error("Invalid product ID");
//     return;
//   }
//   this.cartService.addToCart(productId, quantity).subscribe(() => {
//     this.cartService.init();  // Refresh cart items
//   });
// }

addToCart(productId:string,quantity:number){
  this.cartService.addToCart(productId,quantity).subscribe((result)=>{
    this.cartService.init()
  })
}

getSubtotal(): number {
  let subtotal = 0;
  for (const item of this.cartItems) {
    if (item.product) {
      subtotal += this.SellingPrice(item.product) * item.quantity;
    }
  }
  return subtotal;
}

removeFromCart(productId: string | undefined, quantity: number) {
  if (!productId) {
    console.error("Invalid product ID");
    return;
  }
  this.cartService.addToCart(productId, quantity).subscribe(() => {
    this.cartService.init();  // Refresh cart items
  });
}



taxRate: number = 0.18; // Example tax rate of 8%

// Method to calculate tax based on the subtotal
calculateTax(): number {
  const subtotal = this.getSubtotal();
  return Math.round(subtotal * this.taxRate);
}


 orderStep:number=0
 formbuilder=inject(FormBuilder);
 paymentType='cash'
 addressForm=this.formbuilder.group({
address1:[''],
address2:[''],
city:[''],
pincode:['']
 })
checkout(){
  
  this.orderStep=1
  console.log( this.orderStep)
}

addAddress(){
  this.orderStep=2
}
completeOrder(){
  let order:Order= {
    items:this.cartItems,
    paymentType:this.paymentType,
    address:this.addressForm.value,
    date:new Date(),
    // total: this.getSubtotal() + this.fixedshippingprice + this.calculateTax(),
  }

   this.orderService.addOrder(order).subscribe((result)=>{
    alert("Your Order is Comlpeted")
    this.cartService.init();
    this.orderStep=0;
    this.router.navigateByUrl("/orders")
  })
  console.log(order);
}

}








// getSubtotal(){
  //   let amount=0;
  //   for(let index = 0; index < this.cartItems.length;index++){
  //     const element = this.cartItems[index];
  //     amount+=this.SellingPrice(element.product)*element.quantity
  //   }
  //      return amount
  // }



  // getSubtotal(): number {
//   let subtotal = 0;
//   for (const item of this.cartItems) {
//     subtotal= this.SellingPrice(item.product) * item.quantity;
//   }
//   return subtotal;
// }




// addToCart(productId:string,quantity:number){
//   this.cartService.addToCart(productId,quantity).subscribe(()=>{
//     this.cartService.init();
   
//   })
// }
// removeFromCart(productId:string,quantity:number){
//   this.cartService.addToCart(productId,quantity).subscribe(()=>{
//     this.cartService.init();
   
//   });
// }

// SellingPrice(product:Product){
//   var SellingPrice = parseInt(product.price.toString()) -
//    (parseInt(product.price.toString()) * (parseInt(product.discount.toString())/ 100) )
//     return  Math.round(SellingPrice);
//   }


