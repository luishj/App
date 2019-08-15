import { AuthService } from 'src/app/services/auth.service';
import { Planilha } from './../interface/planilha';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class PlanilhaService {
  private planilhasCollection: AngularFirestoreCollection<Planilha>;  
  constructor(private afs: AngularFirestore,   private AuthService: AuthService,) {
  
    this.planilhasCollection = this.afs.collection<Planilha>('Planilhas',ref=> ref.where('userId','==',this.AuthService.getAuth().currentUser.uid));
  
  }
  getPlanilhas() {
        return this.planilhasCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    )
  }
  addPlanilha(planilha: Planilha) {

    return this.planilhasCollection.add(planilha);
  }
  getPlanilha(id: string) {
    return this.planilhasCollection.doc<Planilha>(id).valueChanges();
  }
  updatePlanilha(id: string, planilha: Planilha) {
    return this.planilhasCollection.doc<Planilha>(id).update(planilha);
  }
  deletePlanilha(id: string) { return this.planilhasCollection.doc(id).delete() }
} 
