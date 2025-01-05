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
  timeGrid: any
  selectedTime: any
  formattedSelectedDate: any
  constructor(
    private cd: ChangeDetectorRef,
    private formBuilder: RxFormBuilder,
    private router: Router,
    private prenotazioneService: PrenotazioneService
  ) {
    Object.setPrototypeOf(this.prenotazione, Appointment.prototype);
    this.prenotazioneForm = <RxFormGroup>this.formBuilder.formGroup(this.prenotazione);
  }
  ngOnInit() { }


  handleChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.selectedTime = target.value
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
    // this.prenotazione.start_date = new Date(this.prenotazione.start_date)
    // this.prenotazione.end_date = new Date(this.prenotazione.start_date)
    // this.prenotazione.end_date.setUTCMinutes(this.prenotazione.start_date.getUTCMinutes() + 30)
    // console.log(this.prenotazione.start_date.toISOString() + " " + this.prenotazione.end_date.toISOString())
  }

  setFullName() {
    this.prenotazione.full_name = this.prenotazione.first_name + " " + this.prenotazione.last_name;
  }
  onDateChange(event: any) {
    const isoDate = event.detail.value;  // Ottieni il valore ISO 8601
    this.formattedSelectedDate = this.convertToYYYYMMDD(isoDate);  // Formatta la data come 'YYYY-MM-DD'
    this.prenotazione.start_date = this.formattedSelectedDate
    this.getTimeGrid()
    // this.setEndDate();
    //  this.prenotazione.start_date = this.formatDateToString( new Date(this.prenotazione.start_date));
    //  this.prenotazione.end_date = this.formatDateToString(new Date (this.prenotazione.end_date))
  }

  convertToYYYYMMDD(isoString: string): string {
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');  // Mese con due cifre
    const day = String(date.getDate()).padStart(2, '0');  // Giorno con due cifre
    return `${year}-${month}-${day}`;
  }

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
    if (this.currentSection == 4) {
      this.setFullName()
      this.prenotazione.start_date = this.formattedSelectedDate + " " + this.selectedTime
    }
  }

  getTimeGrid() {
    this.prenotazioneService.getTimeGrid(this.prenotazione.service_id, this.prenotazione.staff_id, this.prenotazione.start_date).subscribe(
      data => {
        this.timeGrid = data
        this.timeGrid = this.timeGrid.data
        console.log(this.timeGrid)
      })

  }
  submitAppointment() {
    console.log(this.prenotazione)
    // this.prenotazioneService.createAppointment(this.prenotazione).subscribe()
  }


}

