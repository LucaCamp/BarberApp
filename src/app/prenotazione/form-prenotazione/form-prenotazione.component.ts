import { DATE_PIPE_DEFAULT_OPTIONS } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Route, Router, RouterLink } from '@angular/router';
import { RxFormBuilder, RxFormGroup } from '@rxweb/reactive-form-validators';
import { Appointment } from 'src/app/model/appointment.model';
import { PrenotazioneService } from '../prenotazione.service';

// interfaccia per mock dati radiopoint dinamici 
interface Food {
  id: number;
  name: string;
  type: string;
}

@Component({
  selector: 'app-form-prenotazione',
  templateUrl: './form-prenotazione.component.html',
  styleUrls: ['./form-prenotazione.component.scss'],
  standalone: false,
})



export class FormPrenotazioneComponent implements OnInit {
  currentSection: number = 1;
  prenotazioneForm: RxFormGroup;
  prenotazione = new Appointment();

  constructor(
    private cd: ChangeDetectorRef,
    private formBuilder: RxFormBuilder,
    private router: Router,
    private prenotazioneService: PrenotazioneService
  ) {
    Object.setPrototypeOf(this.prenotazione, Appointment.prototype);
    this.prenotazioneForm = <RxFormGroup>this.formBuilder.formGroup(this.prenotazione);
  }

  // mock dati per la gestione degli orari in maniera dinamica
  foods: Food[] = [
    {
      id: 1,
      name: '9:00',
      type: 'fruit',
    },
    {
      id: 2,
      name: '9:30',
      type: 'vegetable',
    },
    {
      id: 3,
      name: '10:00',
      type: 'desst',
    },
    {
      id: 4,
      name: '10:30',
      type: 'dsert',
    },
    {
      id: 5,
      name: '11:00',
      type: 'dsert',
    },
  ];

  compareWith(o1: Food, o2: Food): boolean {
    return o1.id === o2.id;
  }

  handleChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    console.log('Current value:', JSON.stringify(target.value));
  }

  //
  isWeekday = (dateString: string) => {
    const date = new Date(dateString);
    const utcDay = date.getUTCDay();

    /**
     * Date will be enabled if it is
     * from Tuesday (2) to Saturday (6)
     */
    return utcDay >= 2 && utcDay <= 6;
  };


  setEndDate() {
    this.prenotazione.start_date = new Date(this.prenotazione.start_date)
    this.prenotazione.end_date = new Date(this.prenotazione.start_date)
    this.prenotazione.end_date.setUTCMinutes(this.prenotazione.start_date.getUTCMinutes() + 30)
    console.log(this.prenotazione.start_date.toISOString() + " " + this.prenotazione.end_date.toISOString())
  }

  setFullName() {
    this.prenotazione.full_name = this.prenotazione.first_name + " " + this.prenotazione.last_name;
  }
  setDate() {
    this.setEndDate();
    //  this.prenotazione.start_date = this.formatDateToString( new Date(this.prenotazione.start_date));
    //  this.prenotazione.end_date = this.formatDateToString(new Date (this.prenotazione.end_date))
  }

  ngOnInit() { }

  goBack() {
    if (this.currentSection > 1) {
      this.currentSection -= 1
    } else if (this.currentSection === 1) {
      this.router.navigate(['home'])
    }
  }

  showNextSection() {
    if (this.currentSection < 4) { }
    this.currentSection += 1;
  }

  submitAppointment() {
    console.log(this.prenotazione)
    // this.prenotazioneService.createAppointment(this.prenotazione).subscribe()
  }
}

