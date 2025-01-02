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
    this.prenotazione.end_date = this.prenotazione.start_date 
  }

  setFullName(){
    this.prenotazione.full_name = this.prenotazione.first_name + " " + this.prenotazione.last_name;
  }
setDate(){
  this.setEndDate();
 this.prenotazione.start_date = this.formatDateToString( new Date(this.prenotazione.start_date));
 this.prenotazione.end_date = this.formatDateToString(new Date (this.prenotazione.end_date))
}
  
  formatDateToString(date: Date): string {
    // Estrai le informazioni dalla data
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // I mesi vanno da 0 a 11
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
  
    // Restituisci la data nel formato "yyyy-MM-dd HH:mm:ss"
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
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
    this.prenotazioneService.createAppointment(this.prenotazione).subscribe()
  }
}

