import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OrdersService } from '../services/orders.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  product: any
  productId: any

  constructor(private route: Router, private restapi: OrdersService){
    this.getFilteredProducts()
    this.getUser()
   }

  
   

  getUser(){
    this.restapi.getUser().then(data => {
      localStorage.setItem('user', data[0].id);
     
    })
  }

  getFilteredProducts() {
    this.restapi.getProduct('monday')
    .then(data => {
      this.product = data;
      console.log(this.product)
    });
  }

  goto(){
    this.route.navigateByUrl('/food-details')
  }
}
