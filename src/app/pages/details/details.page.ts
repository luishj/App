import { PlanilhadetalheService } from './../../services/planilhadetail.service';
import { Planilhadetalhe } from './../../interface/planilhadetalhe';
import { Component, OnInit } from '@angular/core';
import { PlanilhaService } from 'src/app/services/planilha.service';
import { ActivatedRoute } from '@angular/router';
import { Planilha } from 'src/app/interface/planilha';
import { NavController, LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  private planilhadetalgeId:string = null;
  private planilhadetalhe:Planilhadetalhe;
  private planilhadetalheSubscription:Subscription;
  private planilhaId: string = null;
  public planilha: Planilha = {};
  private loading: any;
  private planilhaSubscription: Subscription;

  constructor(
    private planilhadetalheService:PlanilhadetalheService,
    private planilhaService: PlanilhaService,
    private activatedRoute: ActivatedRoute,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private authService: AuthService,
  
    private toastCtrl: ToastController
  ) {
    this.planilhaId = this.activatedRoute.snapshot.params['id'];

    if (this.planilhaId){ this.loadPlanilha();
}
  }

  ngOnInit() { }

  ngOnDestroy() {
    if (this.planilhaSubscription) this.planilhaSubscription.unsubscribe();
  }

  loadPlanilha() {    
    this.planilhaSubscription = this.planilhaService.getPlanilha(this.planilhaId).subscribe(data => {
      this.planilha = data;
    });
  }

  async savePlanilha() {
    await this.presentLoading();

    this.planilha.userId = this.authService.getAuth().currentUser.uid;
   
    if (this.planilhaId) {
      try {
        await this.planilhaService.updatePlanilha(this.planilhaId, this.planilha);
        await this.loading.dismiss();

        this.navCtrl.navigateBack('/home');
      } catch (error) {
        this.presentToast('Erro ao tentar salvar');
        this.loading.dismiss();
      }
    } else {
      this.planilha.createdAt = new Date().getTime();

      try {
        await this.planilhaService.addPlanilha(this.planilha);
        await this.loading.dismiss();

        this.navCtrl.navigateBack('/home');
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