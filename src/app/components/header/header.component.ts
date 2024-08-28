import { Component, inject } from '@angular/core';
import { Category } from '../../types/category';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CustomerService } from '../../services/customer.service';
import { FormsModule } from '@angular/forms';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink,FormsModule,MatButtonModule,MatIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
customerService=inject(CustomerService);
categoryList:Category[]=[];
authService=inject(AuthService)
searchTerm!:string;

ngOnInit(){
  this.customerService.getCategories().subscribe(result =>{
    this.categoryList = result;
    console.log(this.categoryList )
    
  })
}
router=inject(Router)
onSearch(e:any){
 if(e.target.value){
  this.router.navigateByUrl("/products?search="+ e.target.value)
 };
}
searchCategory(_id:string){
  this.searchTerm=""
  this.router.navigateByUrl("/products?categoryId=" + _id)

};
logout(){
  this.authService.logout();
  this.router.navigateByUrl("/login")
}
}
