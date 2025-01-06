import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrenotazioneRoutingModule } from './prenotazione-routing.module';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormPrenotazioneComponent } from './form-prenotazione/form-prenotazione.component';
import { IonHeader, IonicModule, IonItem, IonList, IonNavLink, IonSelect, IonSelectOption } from '@ionic/angular';
import { provideHttpClient } from '@angular/common/http';
import { RiepilogoComponent } from './riepilogo/riepilogo.component';
import { ServiceSectionComponent } from './service-section/service-section.component';
import { DatatimeSectionComponent } from './datatime-section/datatime-section.component';


@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

  declarations: [FormPrenotazioneComponent, ServiceSectionComponent, DatatimeSectionComponent, RiepilogoComponent],
  imports: [
    CommonModule,
    PrenotazioneRoutingModule,
    RxReactiveFormsModule,
    ReactiveFormsModule,
    IonicModule,
  ],
})
export class PrenotazioneModule { }
