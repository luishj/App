import { Planilhadetalhe } from './../../interface/planilhadetalhe';
import { LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from './../../services/auth.service';
import { PlanilhaService } from './../../services/planilha.service';
import { Planilha } from './../../interface/planilha';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  private planilhas = new Array<Planilha>();
  public planilhadetalhe: Planilhadetalhe = {};
  private planilhasSubscription: Subscription;
  private loading: any;
  constructor(private planilhasService: PlanilhaService,
    private AuthService: AuthService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) {
    this.planilhasSubscription = this.planilhasService.getPlanilhas().subscribe(data => { this.planilhas = data });
  }
  ngOnInit() {
  }
  /*async  chamardetalhe(planilha: Planilha) {
    this.idplanilha = planilha.id;
    if (!planilha.criada) {
      await this.presentLoading();
      try {
        for (let i = 1; i <= 30; i++) {
            this.planilhadetalhe.dia = i;
          this.planilhadetalhe.bancainicial = planilha.valorBanca;
          this.planilhadetalhe.planilhaId = this.idplanilha;
          this.planilhadetalhe.ganho = 0;
          await this.planilhadetalheService.addPlanilhadetalhe(this.planilhadetalhe);
          planilha.criada = true;
          await this.planilhaService.updatePlanilha(this.idplanilha, planilha);
          await this.navCtrl.navigateForward('/planilha/:id?id=' + this.idplanilha);
        }
        await this.loading.dismiss();
      } catch (error) {
        console.error(error);

        this.presentToast('Erro ao tentar salvar');
        this.loading.dismiss();
      }
    } else {
      this.router.navigate(['planilha/:id'], { queryParams: { id: planilha.id } });
    }
  }*/

  ngOnDestroy() {
    this.planilhasSubscription.unsubscribe();
  }
  async logout() {
    try {
      return this.AuthService.logout();
    } catch (error) {
      console.error(error);

    }


  }
  async deletePlanilha(id: string) {
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
