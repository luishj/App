import { AuthService } from './../../services/auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, ToastController, LoadingController } from '@ionic/angular';
import { User } from 'src/app/interface/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  @ViewChild(IonSlides, { static: true }) slides: IonSlides;
  public userLogin: User = {};
  public userRegister: User = {};
  private loading: any;
  constructor(
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private authService: AuthService
  ) { }

  ngOnInit() {
  }
  segmentChanged(event: any) {
    if (event.detail.value === "login") {
      this.slides.slidePrev();

    } else {
      this.slides.slideNext();

    }
  }
  async login() {
    await this.presentLoading();
    try {
      console.log(this.userRegister);
      await this.authService.login(this.userLogin);
    } catch (error) {
      console.error(error);
      this.presentToast(error.message);
    } finally {
      this.loading.dismiss();
    }

  }
  async  register() {
    await this.presentLoading();
    try {
      console.log(this.userRegister);
      await this.authService.register(this.userRegister);
    } catch (error) {
      console.error(error);
      this.presentToast(error.message);
    } finally {
      this.loading.dismiss();
    }
  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({
      message: 'Por favor, aguarde'
    });
    return this.loading.present();
  }
  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000
    });
    toast.present();
  }


}
