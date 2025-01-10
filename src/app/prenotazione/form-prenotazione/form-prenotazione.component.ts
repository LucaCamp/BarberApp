import { ChangeDetectorRef, Component, OnChanges, OnInit, } from '@angular/core';
import { Route, Router, RouterLink } from '@angular/router';
import { RxFormBuilder, RxFormGroup } from '@rxweb/reactive-form-validators';
import { Appointment } from 'src/app/model/appointment.model';
import { PrenotazioneService } from '../prenotazione.service';

@Component({
  selector: 'app-form-prenotazione',
  templateUrl: './form-prenotazione.component.html',
  styleUrls: ['./form-prenotazione.component.scss'],
  standalone: false,
})

export class FormPrenotazioneComponent {

  IsSelectedTime(selectedTime: any) {
    this.isRadioTimeValid = !!selectedTime;  // Imposta il flag come true se è selezionato un orario
    this.prenotazioneService.selectedTime = selectedTime;  // Aggiorna il servizio con l'orario selezionato
  }

  isRadioTimeValid = false;
  currentSection: number = 1;
  prenotazioneForm: RxFormGroup;
  timeGrid: any
  loadedTimeGrid: boolean = true;

  constructor(
    private cd: ChangeDetectorRef,
    private formBuilder: RxFormBuilder,
    private router: Router,
    private prenotazioneService: PrenotazioneService,

  ) {
    Object.setPrototypeOf(this.prenotazioneService.prenotazione, Appointment.prototype);
    this.prenotazioneForm = <RxFormGroup>this.formBuilder.formGroup(this.prenotazioneService.prenotazione);
  }
  

  setFullName() {
    this.prenotazioneService.prenotazione.full_name = this.prenotazioneService.prenotazione.first_name + " " + this.prenotazioneService.prenotazione.last_name;
  }

  goBack() {
    if (this.currentSection > 1) {
      this.currentSection -= 1;
    } else if (this.currentSection === 1) {
      this.router.navigate(['home'])
    }
  }

  showNextSection() {
    if (this.currentSection < 4) {
      this.currentSection += 1;
      if(this.prenotazioneService.selectedTime === undefined){
        this.isRadioTimeValid = false;
      }
    }
    if (this.currentSection === 4) {
      this.setFullName()
    }
  }

  isInvalidSection() {
    return !this.validateCurrentSection();
  }

  validateCurrentSection(): boolean {
    let sectionValid = false

    switch (this.currentSection) {
      case 1:
        sectionValid = (this.prenotazioneForm.get('service_id')?.valid && this.prenotazioneForm.get('staff_id')?.valid) ?? false;
        break;
      case 2:
        sectionValid = (this.prenotazioneForm.get('start_date')?.valid && this.isRadioTimeValid ) ?? false;
        break;
      case 3:
        sectionValid = ((this.prenotazioneForm.get('first_name')?.valid && 
        this.prenotazioneForm.get('last_name')?.valid &&
        this.prenotazioneForm.get('email')?.valid &&
        this.prenotazioneForm.get('phone')?.valid )?? false )
        break;
      case 4:
        sectionValid = false
        break;
      default:
        sectionValid = false;
        break;
    }

    if (!sectionValid) {
      this.prenotazioneForm.markAllAsTouched(); // Segna tutti i controlli come toccati per mostrare gli errori
    }

    return sectionValid;
  }
}

