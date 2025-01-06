import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormPrenotazioneComponent } from './form-prenotazione/form-prenotazione.component';
import { RiepilogoComponent } from '../riepilogo/riepilogo.component';

const routes: Routes = [
  {
    path: '',
    component: FormPrenotazioneComponent,
  },
  {
    path: 'riepilogo',
    component: RiepilogoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrenotazioneRoutingModule { }
