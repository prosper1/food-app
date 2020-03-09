import { Component } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router'
import { OrdersService } from '../services/orders.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  product: any;
  productId: any;

  constructor(
    private router: Router,
    private restapi: OrdersService,
    private route: ActivatedRoute) {
    this.getFilteredProducts();
    this.getUser();
   }

  getUser() {
    this.restapi.getUser().then(data => {
      localStorage.setItem('user', data[0].id);
    });
  }

  getFilteredProducts() {
    this.restapi.getProduct('monday')
    .then(data => {
      this.product = data;
      console.log(this.product);
    });
  }

  goto(itemId: any) {

    const selectProduct = this.product.filter(item => item.id === itemId);
    const navigationExtras: NavigationExtras = {
      state: {
        product: selectProduct
      }
    };
    this.router.navigate(['food-details'], navigationExtras);
  }
}
