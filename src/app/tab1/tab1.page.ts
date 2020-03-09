import { Component } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { OrdersService } from '../services/orders.service';
import { PickerController } from '@ionic/angular';

const defaultColumnOptions = [
  [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday'
  ]
];


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  product: any;
  productId: any;
  selectDate = 'Monday';



  constructor(
    private router: Router,
    private restapi: OrdersService,
    private route: ActivatedRoute,
    private pickerController: PickerController,
    ) {
    this.myDate();
    this.getFilteredProducts();
    this.getUser();
   }

  getUser() {
    this.restapi.getUser().then(data => {
      localStorage.setItem('user', data[0].id);
    });
  }

  getFilteredProducts() {
    this.restapi.getProduct(this.selectDate)
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

  // Get Specific Day
  myDate() {
    const a = new Date();
    const weekdays = new Array(7);
    weekdays[0] = 'Sunday';
    weekdays[1] = 'Monday';
    weekdays[2] = 'Tuesday';
    weekdays[3] = 'Wednesday';
    weekdays[4] = 'Thursday';
    weekdays[5] = 'Friday';
    weekdays[6] = 'Saturday';
    var r = weekdays[a.getDay()];
    this.selectDate = r;
    console.log(this.selectDate);
}


  // Open Day Picker
  async openPicker(numColumns = 1, numOptions = 5, columnOptions = defaultColumnOptions){
    const picker = await this.pickerController.create({
      columns: this.getColumns(numColumns, numOptions, columnOptions),
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Confirm',
          handler: (value) => {
            console.log(`Got Value ${value}`);
            this.selectDate = value['col-0']['text'];
            this.getFilteredProducts();
          }
        }
      ]
    });

    await picker.present();
  }

  getColumns(numColumns, numOptions, columnOptions) {
    let columns = [];
    for (let i = 0; i < numColumns; i++) {
      columns.push({
        name: `col-${i}`,
        options: this.getColumnOptions(i, numOptions, columnOptions)
      });
    }

    return columns;
  }

  getColumnOptions(columnIndex, numOptions, columnOptions) {
    let options = [];
    for (let i = 0; i < numOptions; i++) {
      options.push({
        text: columnOptions[columnIndex][i % numOptions],
        value: i
      })
    }

    return options;
  }
}
