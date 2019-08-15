import { Planilha } from 'src/app/interface/planilha';
import { AuthService } from 'src/app/services/auth.service';
import { Planilhadetalhe } from './../interface/planilhadetalhe';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class PlanilhadetalheService {
  private planilhadetalhesCollection: AngularFirestoreCollection<Planilhadetalhe>;  
  constructor(private afs: AngularFirestore,   private AuthService: AuthService) {
    

  }
  getPlanilhadetalhes() {

    this.planilhadetalhesCollection = this.afs.collection<Planilhadetalhe>('Planilhadetalhes',ref=> ref.where('planilhaId','==','DjdMiaZxRpwsTOxRdB2o'));
        return this.planilhadetalhesCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    )
  }
  addPlanilhadetalhe(planilhadetalhe: Planilhadetalhe) {
    this.planilhadetalhesCollection = this.afs.collection<Planilhadetalhe>('Planilhadetalhes');
    return this.planilhadetalhesCollection.add(planilhadetalhe);
  }
  getPlanilhadetalhe(id: string) {
    this.planilhadetalhesCollection = this.afs.collection<Planilhadetalhe>('Planilhadetalhes');
    return this.planilhadetalhesCollection.doc<Planilhadetalhe>(id).valueChanges();
  }
  updatePlanilhadetalhe(id: string, planilhadetalhe: Planilhadetalhe) {
    this.planilhadetalhesCollection = this.afs.collection<Planilhadetalhe>('Planilhadetalhes');
    return this.planilhadetalhesCollection.doc<Planilhadetalhe>(id).update(planilhadetalhe);
  }
  deletePlanilhadetalhe(id: string) { return this.planilhadetalhesCollection.doc(id).delete() }
} 
