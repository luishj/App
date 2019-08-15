import { LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from './../../services/auth.service';
import { PlanilhadetalheService } from './../../services/planilhadetail.service';
import { Planilhadetalhe } from './../../interface/planilhadetalhe';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { async } from 'q';


@Component({
  selector: 'app-planilha',
  templateUrl: './planilha.page.html',
  styleUrls: ['./planilha.page.scss'],
})
export class PlanilhaPage implements OnInit {

 
  private planilhadetalhes = new Array<Planilhadetalhe>();
  private planilhadetalhesSubscription :Subscription;
  private loading: any;

  constructor(private planilhadetalhesService:PlanilhadetalheService,
    private AuthService:AuthService,
    private loadingCtrl:LoadingController,
    private toastCtrl:ToastController) { 
    
    this.planilhadetalhesSubscription = this.planilhadetalhesService.getPlanilhadetalhes().subscribe(data =>{this.planilhadetalhes = data});
    }


  ngOnInit() {
  }
  ngOnDestroy() {
    this.planilhadetalhesSubscription.unsubscribe();
  }
  async logout(){
    try {
      return this.AuthService.logout();  
    } catch (error) {
      console.error(error);
      
    }

    
  }
  async deletePlanilhadetalhe(id:string){
    try {
      await this.planilhadetalhesService.deletePlanilhadetalhe(id);
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
