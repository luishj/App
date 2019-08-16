import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { PlanilhaService } from './../../services/planilha.service';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from './../../services/auth.service';
import { PlanilhadetalheService } from './../../services/planilhadetail.service';
import { Planilhadetalhe } from './../../interface/planilhadetalhe';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { async } from 'q';
import { Planilha } from 'src/app/interface/planilha';


@Component({
  selector: 'app-planilha',
  templateUrl: './planilha.page.html',
  styleUrls: ['./planilha.page.scss'],
})
export class PlanilhaPage implements OnInit {


  private planilhaa = new Array<Planilha>();
  private planilhadetalhes = new Array<Planilhadetalhe>();
  private planilhaSubscription: Subscription;
  private planilhasCollection: AngularFirestoreCollection<Planilha>;  
  private planilhadetalhesSubscription: Subscription;
  private loading: any;
  public planilha: Planilha = {};
  private planilhaId: string;

  constructor(
    private planilhaService: PlanilhaService,
    private planilhadetalhesService: PlanilhadetalheService,
    private AuthService: AuthService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private activatedRoute: ActivatedRoute) {
    this.planilhaId = this.activatedRoute.snapshot.params['id'];
    this.planilhadetalhesSubscription = this.planilhadetalhesService.getPlanilhadetalhes(this.planilhaId).subscribe(data => { this.planilhadetalhes = data });
    this.criardetalhe(this.planilhaId);
  }
  ngOnInit() {

  }
  async criardetalhe(id: string) {
    return this.planilhasCollection.doc<Planilha>(id).valueChanges();
  }
  ngOnDestroy() {
    this.planilhadetalhesSubscription.unsubscribe();
    this.planilhaSubscription.unsubscribe();
  }
  async logout() {
    try {
      return this.AuthService.logout();
    } catch (error) {
      console.error(error);
    }
  }
  async deletePlanilhadetalhe(id: string) {
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
