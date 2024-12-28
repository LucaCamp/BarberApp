import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrenotazioneRoutingModule } from './prenotazione-routing.module';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { ReactiveFormsModule } from '@angular/forms';
import { FormPrenotazioneComponent } from './form-prenotazione/form-prenotazione.component';
import { IonicModule } from '@ionic/angular';


@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

  declarations: [FormPrenotazioneComponent],
  imports: [
    CommonModule,
    PrenotazioneRoutingModule,
    RxReactiveFormsModule,
    ReactiveFormsModule,
    IonicModule

  ]
})
export class PrenotazioneModule { }
