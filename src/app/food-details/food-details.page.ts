import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-food-details',
  templateUrl: './food-details.page.html',
  styleUrls: ['./food-details.page.scss'],
})
export class FoodDetailsPage implements OnInit {
  hasOrder = false
  constructor(private toastController: ToastController) { }

  ngOnInit() {
  }

  
  placeOrder() {
    this.handleSuccessToast('yes','Monday')
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
      showCloseButton: false
    }).then(toast => {
      this.itemCount = 1
      toast.present();
      toast.onDidDismiss().then(yes =>{
        const navigationExtras: NavigationExtras = {
          state: {
            cartitems: this.itemCount
          }
        };
        this.router.navigate(['openbusiness'], navigationExtras);
      });
    });
  }

}
