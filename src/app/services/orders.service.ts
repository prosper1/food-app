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

  getProduct(){
    return new Promise(resolve => {
      this.http.get(this.apiUrl + '/food/?format=json').subscribe(data => {
        resolve(data);
    }, err => {
      console.log(err)
    });
  });
  }
}
