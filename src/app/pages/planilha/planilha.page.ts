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
  public planilhadetalhes = new Array<Planilhadetalhe>();
  private planilhadetalhe: Planilhadetalhe = {};
  public planilhadetalhesSubscription: Subscription;
  private loading: any;
  public planilha: Planilha = {};
  private planilhaId: string;
  private vlrbanca:number;
  private porcentagemdia:number;
  private planilhacriada:string;


  constructor(
    private planilhaService: PlanilhaService,    
    private planilhadetalheService: PlanilhadetalheService,    
    private planilhadetalhesService: PlanilhadetalheService,
    private AuthService: AuthService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private activatedRoute: ActivatedRoute) {
      console.log(this.activatedRoute.snapshot.queryParamMap);
    this.planilhaId = this.activatedRoute.snapshot.queryParamMap.get('id');
    this.vlrbanca= this.activatedRoute.snapshot.params['valorbanca'];
    this.porcentagemdia =this.activatedRoute.snapshot.params['porcentagemdia'];
    this.planilhacriada =this.activatedRoute.snapshot.params['criada'];

    this.planilhadetalhesSubscription = this.planilhadetalhesService.getPlanilhadetalhes(this.planilhaId).subscribe(data => { this.planilhadetalhes = data });
    this.criardetalhe(this.planilhaId,this.planilhacriada,this.porcentagemdia, this.vlrbanca);
  }
  ngOnInit() {

  }
  async criardetalhe(id: string,criada:string,porcentagem:number,vlrbanca:number) {

      if(criada === "fdsadaalse"){
     
        await this.presentLoading();
        try {
          for (let i = 1; i <= 30; i++) {
            this.planilhadetalhe.dia = i;
            this.planilhadetalhe.bancainicial = vlrbanca;
            this.planilhadetalhe.planilhaId = id;
            this.planilhadetalhe.porcentagemdia= porcentagem;
            this.planilhadetalhe.ganho = 0;
            await this.planilhadetalheService.addPlanilhadetalhe(this.planilhadetalhe);            
          }
          await this.loading.dismiss();
        } catch (error) {
          console.error(error);
  
          this.presentToast('Erro ao tentar salvar');
          this.loading.dismiss();
        }
  
      }  
  }
  ngOnDestroy() {
    this.planilhadetalhesSubscription.unsubscribe();

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
