import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormPrenotazioneComponent } from './form-prenotazione/form-prenotazione.component';

const routes: Routes = [
  {
    path: '',
    component: FormPrenotazioneComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrenotazioneRoutingModule { }
