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

export class FormPrenotazioneComponent implements OnInit {
  currentSection: number = 1;
  prenotazioneForm: RxFormGroup;
  timeGrid: any
  formattedSelectedDate: any
  endTime: string = '';
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

  ngOnInit() {
  }

  setEndDate() {
    this.prenotazioneService.prenotazione.end_date = this.prenotazioneService.prenotazione.start_date + ' ' + this.endTime
  }

  setFullName() {
    this.prenotazioneService.prenotazione.full_name = this.prenotazioneService.prenotazione.first_name + " " + this.prenotazioneService.prenotazione.last_name;
  }

  goBack() {
    if (this.currentSection > 1) {
      this.currentSection -= 1
    } else if (this.currentSection === 1) {
      this.router.navigate(['home'])
    }
  }

  showNextSection() {
    if (this.currentSection < 3) {
      this.currentSection += 1;
      console.log(this.prenotazioneService.prenotazione.service_id)
      return;
    }
    if (this.currentSection === 3) {
      this.setFullName()
      this.setEndDate()

      console.log(this.prenotazioneService.prenotazione.start_date + ' ' + this.prenotazioneService.prenotazione.end_date)
      this.prenotazioneService.prenotazione = this.prenotazioneService.prenotazione
      this.router.navigate(['prenota/riepilogo'])
    }
  }



}

