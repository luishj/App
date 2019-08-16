import { Planilha } from './../../interface/planilha';
import { Component, OnInit } from '@angular/core';
import { PlanilhadetalheService } from 'src/app/services/planilhadetail.service';
import { ActivatedRoute } from '@angular/router';
import { Planilhadetalhe } from 'src/app/interface/planilhadetalhe';
import { NavController, LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-planilhadetalhe',
  templateUrl: './planilhadetalhe.page.html',
  styleUrls: ['./planilhadetalhe.page.scss'],
})
export class PlanilhadetalhePage implements OnInit {
  private planilhadetalheId: string = null;
  public planilhadetalhe: Planilhadetalhe = {};
  private loading: any;
  private planilhaId:string;
  private planilhadetalheSubscription: Subscription;

  constructor(
    private planilhadetalheService: PlanilhadetalheService,
    private activatedRoute: ActivatedRoute,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private authService: AuthService,
    private toastCtrl: ToastController
  ) {
    this.planilhadetalheId = this.activatedRoute.snapshot.params['id'];
    this.planilhaId = this.activatedRoute.snapshot.params['planilhaId'];
    if (this.planilhadetalheId) this.loadPlanilhadetalhe();
  }

  ngOnInit() { }

  ngOnDestroy() {
    if (this.planilhadetalheSubscription) this.planilhadetalheSubscription.unsubscribe();
  }

  loadPlanilhadetalhe() {
    this.planilhadetalheSubscription = this.planilhadetalheService.getPlanilhadetalhe(this.planilhadetalheId).subscribe(data => {
      this.planilhadetalhe = data;
    });
  }

  async savePlanilhadetalhe() {
    await this.presentLoading();

    this.planilhadetalhe.planilhaId = this.planilhaId;

    if (this.planilhadetalheId) {
      try {
       

        await this.planilhadetalheService.updatePlanilhadetalhe(this.planilhadetalheId, this.planilhadetalhe);
        await this.loading.dismiss();

        this.navCtrl.navigateForward('/planilha/'+this.planilhaId);
      } catch (error) {
        console.error(error);
        this.presentToast('Erro ao tentar salvar');
        this.loading.dismiss();
      }
    } else {
    

      try {
   
        await this.planilhadetalheService.addPlanilhadetalhe(this.planilhadetalhe);
        await this.loading.dismiss();

        this.navCtrl.navigateForward('/home');
      } catch (error) {

        this.presentToast('Erro ao tentar salvar');
        this.loading.dismiss();
      }
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