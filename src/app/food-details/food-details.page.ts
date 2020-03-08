import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { OrdersService } from '../services/orders.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-food-details',
  templateUrl: './food-details.page.html',
  styleUrls: ['./food-details.page.scss'],
})
export class FoodDetailsPage implements OnInit {
  hasOrder = false
  product={};

  constructor(
    private toastController: ToastController,
    private restapi: OrdersService,
    private route: Router,
    ) { 
      this.getProductDetail()
    }

  ngOnInit() {
  }


  getProductDetail() {
    this.restapi.getProductDetails(1)
    .then(data => {
      this.product = data;
      console.log(this.product)
    });
  }


  placeOrder(foodId:number) {

      let user = localStorage.getItem('user');
      const userId = parseInt(user)
      console.log(userId)

      console.log(foodId)
      const products = {"food": foodId, "user": userId};
      this.restapi.addOrder(products).then(res => {
        console.log(res);
        this.handleSuccessToast('yes','Monday')
      }, err => {
        this.handleSuccessToast('no','Monday')
      });
  }


  // Handles The Toast to Show placeOrder Status, pass feedback and date.
  handleSuccessToast(feedback: string,orderDate: string ) {
    let toastColor = '';
    let msg = '';
    if (feedback === 'yes') {
      toastColor = 'success';
      msg = orderDate + ' order placed';
    } else {
      toastColor = 'danger';
      msg = 'Oops Something went wrong!';
    }

    // create toast 
    this.toastController.create({
      color: toastColor,
      duration: 2000,
      message: msg,
      position: 'middle',
    }).then(toast => {
      toast.present();
      toast.onDidDismiss().then(yes => {
        this.route.navigateByUrl('/');
      });
    });
  }

}
