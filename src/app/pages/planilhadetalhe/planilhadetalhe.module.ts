import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PlanilhadetalhePage } from './planilhadetalhe.page';

const routes: Routes = [
  {
    path: '',
    component: PlanilhadetalhePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PlanilhadetalhePage]
})
export class PlanilhadetalhePageModule {}
