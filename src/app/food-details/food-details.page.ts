import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { OrdersService } from '../services/orders.service';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-food-details',
  templateUrl: './food-details.page.html',
  styleUrls: ['./food-details.page.scss'],
})
export class FoodDetailsPage implements OnInit {
  hasOrder = false;
  product = {};
  selectProduct = 0;

  constructor(
    private toastController: ToastController,
    private restapi: OrdersService,
    private router: Router,
    private route: ActivatedRoute,
    ) {
      this.route.queryParams.subscribe(params => {
        if (this.router.getCurrentNavigation().extras.state) {
          const result = this.router.getCurrentNavigation().extras.state.product;
          this.selectProduct = result[0];
          console.log(this.selectProduct);
        }
      });
    }

  ngOnInit() {
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
        this.router.navigateByUrl('/');
      });
    });
  }

}
