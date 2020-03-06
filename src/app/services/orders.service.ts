import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { resolve } from 'q';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};


@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  apiUrl = 'http://localhost:8000/api'

  constructor(private http: HttpClient) { }

  getProduct(day:any){
    return new Promise(resolve => {
      this.http.get(this.apiUrl + '/food/?format=json&day='+day).subscribe(data => {
        resolve(data);
    }, err => {
      console.log(err)
    });
  });
  }

  getProductDetails(productId:number){
    return new Promise(resolve => {
      this.http.get(this.apiUrl + '/food/' + productId + '/?format=json').subscribe(data => {
        resolve(data);
    }, err => {
      console.log(err)
    });
  });
  }

  addOrder(postData: any){
    return new Promise(resolve => {
      this.http.post(this.apiUrl + '/order/?format=json',postData).subscribe(data =>{
        resolve(data)
      }, err => {
        console.log(err)
      });
    });
  }

  addToCart(patchData: any, cartId: any){
    return new Promise(resolve => {
      this.http.post(this.apiUrl + '/safe-ucart/' + cartId + '/?format=json',patchData,httpOptions).subscribe(data =>{
        resolve(data)
      }, err => {
        console.log(err)
      });
    });
  }

  getUser(){
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'/user/?format=json').subscribe(data => {
        resolve(data);
    }, err => {
      console.log(err)
    });
  });
  }
}
