import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  userLoginData = {"email": "","password":""}

  constructor(
    private restapi: AuthService,
    private router: Router,
    public toastController: ToastController,

  ) { }

  ngOnInit() {
  }

  doLogin() {
    const logins = this.userLoginData;
    console.log(logins)
    this.restapi.login(logins)
    .subscribe(res => {
      console.log(res.key)
      localStorage.setItem('token', res.key);
      this.router.navigate(['tabs']);
    }, err => {
      console.log(err);
      
    });
  }


}
