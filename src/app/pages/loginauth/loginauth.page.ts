import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-loginauth',
  templateUrl: './loginauth.page.html',
  styleUrls: ['./loginauth.page.scss'],
})
export class LoginauthPage implements OnInit {

  email2: any;
  pass2: any;

  constructor(
    private fb: FormBuilder,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private authService: AuthService,
    private router: Router
  ) { }

   // Easy access for form fields
  //  get email() {
  //   return this.credentials.get('email');
  // }
  // get password() {
  //   return this.credentials.get('password');
  // }

  ngOnInit() {
    // this.credentials = this.fb.group({
    //   email: ['', [Validators.required, Validators.email]],
    //   password: ['', [Validators.required, Validators.minLength(6)]]
    // });
  }

  async register() {
    const loading = await this.loadingController.create();
    await loading.present();

    try {
      const user = await this.authService.register(
        this.email2,
        this.pass2
      );
      await loading.dismiss();

      if (user) {
        this.router.navigateByUrl('/home', { replaceUrl: true });
      } else {
        this.showAlert('Registration failed', 'Please try again!');
      }
    } catch (error) {
      await loading.dismiss();
      this.showAlert(
        'Error',
        'An error occurred during registration. Please try again!'
      );
    }
  }

  async login() {
    const loading = await this.loadingController.create();
    await loading.present();

    try {
      const user = await this.authService.login(
        this.email2,
        this.pass2
      );
      await loading.dismiss();

      if (user) {
        this.router.navigateByUrl('/home', { replaceUrl: true });
      } else {
        this.showAlert('Login failed', 'Please try again!');
      }
    } catch (error) {
      await loading.dismiss();
      this.showAlert(
        'Error',
        'An error occurred during login. Please try again!'
      );
    }
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }


}