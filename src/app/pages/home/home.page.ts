import { LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from './../../services/auth.service';
import { PlanilhaService } from './../../services/planilha.service';
import { Planilha } from './../../interface/planilha';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { async } from 'q';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  private planilhas = new Array<Planilha>();
  private planilhasSubscription :Subscription;
  private loading: any;

  constructor(private planilhasService:PlanilhaService,
    private AuthService:AuthService,
    private loadingCtrl:LoadingController,
    private toastCtrl:ToastController) { 
    this.planilhasSubscription = this.planilhasService.getPlanilhas().subscribe(data =>{this.planilhas = data});
    }


  ngOnInit() {
  }
  ngOnDestroy() {
    this.planilhasSubscription.unsubscribe();
  }
  async logout(){
    try {
      return this.AuthService.logout();  
    } catch (error) {
      console.error(error);
      
    }

    
  }
  async deletePlanilha(id:string){
    try {
      await this.planilhasService.deletePlanilha(id);
    } catch (error) {
      this.presentToast('Erro ao tentar salvar');
      
    }

  }
  async presentLoading() {
    this.loading = await this.loadingCtrl.create({ message: 'Aguarde...' });
    return this.loading.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 2000 });
    toast.present();
  }

}
