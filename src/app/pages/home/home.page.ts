import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { AuthService } from '../loginauth/auth.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  Username: any;
  Email: any;
  Password: any;
  selectedImage: any;
  constructor(public navCtrl: NavController,
    public router: Router, private loadingController: LoadingController,
    private authService: AuthService, private alertController: AlertController,) { }

  ngOnInit() {

  }
  gotonext() {
    // this.router.navigate(['homeresult', this.Username , this.Email , this.Password , this.selectedImage])
    let dataobj = {
      getname: this.Username,
      getemail: this.Email,
      getpassword: this.Password,
      getimage: this.selectedImage
    };
    let datastr = JSON.stringify(dataobj);
    this.router.navigate(['homeresult', datastr])
  }
  onImageSelected(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.selectedImage = reader.result;
    };
    reader.readAsDataURL(file);
  }

  async logout() {
    const loading = await this.loadingController.create();
    await loading.present();

    try {
      // Call the logout method from the AuthService
      await this.authService.logout();

      // Dismiss the loading controller after successful logout
      await loading.dismiss();
    } catch (error) {
      // Dismiss the loading controller if an error occurs
      await loading.dismiss();
      try {
        // Call the logout method from the AuthService
        await this.authService.logout();

        // Dismiss the loading controller after successful logout
        await loading.dismiss();

        // Redirect the user to the login page after successful logout
        this.router.navigateByUrl('/login', { replaceUrl: true });
      } catch (error) {
        // Dismiss the loading controller if an error occurs
        await loading.dismiss();

        this.showAlert('Error', 'An error occurred during logout. Please try again!');
      }
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
