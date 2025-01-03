import { DATE_PIPE_DEFAULT_OPTIONS } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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
  constructor(
    private formBuilder: RxFormBuilder,
    private router: Router,
    private prenotazioneService: PrenotazioneService
  ) {
    Object.setPrototypeOf(this.prenotazione, Appointment.prototype);
    this.prenotazioneForm = <RxFormGroup>this.formBuilder.formGroup(this.prenotazione);
  }

  isWeekday = (dateString: string) => {
    const date = new Date(dateString);
    const utcDay = date.getUTCDay();

    /**
     * Date will be enabled if it is
     * from Tuesday (2) to Saturday (6)
     */
    return utcDay >= 2 && utcDay <= 6;
  };

  nextSection: boolean = false;
  prenotazioneForm: RxFormGroup;
  prenotazione = new Appointment();
  

  setEndDate(){
  this.prenotazione.start_date = new Date(this.prenotazione.start_date)
  this.prenotazione.end_date = new Date(this.prenotazione.start_date)
  this.prenotazione.end_date.setUTCMinutes(this.prenotazione.start_date.getUTCMinutes() + 30)
  console.log(this.prenotazione.start_date.toISOString() + " " + this.prenotazione.end_date.toISOString())
  }

  setFullName(){
    this.prenotazione.full_name = this.prenotazione.first_name + " " + this.prenotazione.last_name;
  }
setDate(){
  this.setEndDate();
//  this.prenotazione.start_date = this.formatDateToString( new Date(this.prenotazione.start_date));
//  this.prenotazione.end_date = this.formatDateToString(new Date (this.prenotazione.end_date))
}
  
  ngOnInit() { }

  goBack() {
    if (this.nextSection) {
      this.nextSection = false;
    } else {
      this.router.navigate(["home"])
    }
  }

  showNextSection() {
    this.nextSection = true;

  }

  submitAppointment() {
    console.log(this.prenotazione)
    // this.prenotazioneService.createAppointment(this.prenotazione).subscribe()
  }
}

